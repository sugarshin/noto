import React, { Component, PropTypes, findDOMNode } from 'react';
import Select from 'react-select';
import ZeroClipboard from 'react-zeroclipboard';
import throttle from 'lodash.throttle';
import assign from 'object-assign';
import classnames from 'classnames';

import { noteActions } from '../context';

export default class Note extends Component {

  static get propTypes() {
    return {
      note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.string,
        trashed: PropTypes.bool,
        visible: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.string)
      })
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      editingTitle: false
    };

    this._throttledHandleChangeTag = throttle(this._handleChangeTag, 400);
  }

  componentDidUpdate(prevProps, prevState) {
    const { id, body } = this.props.note;
    if (prevProps.note.id !== id) {
      findDOMNode(this.refs.textarea).value = body;
    }
  }

  render() {
    const { title, body, createdAt, tags } = this.props.note;

    return (
      <div className="note-container" style={{float: 'left', width: '50%'}}>
        <div className={classnames('note-title-wrapper', {
          editing: this.state.editingTitle
        })}>
          <div className="note-title"
               onClick={this._handleClickTitle.bind(this)}>
             {title}
             <span className="octicon octicon-pencil"></span>
          </div>
          <input ref="title-editor" type="text" className="note-title-editor" onChange={this._handleChangeTitle.bind(this)}
            onBlur={this._handleBlurTitleEditor.bind(this)}/>
        </div>
        <div className="note-created-at">{createdAt}</div>
        <Select value={tags.join(',')}
                multi={true}
                allowCreate={true}
                placeholder="Add tag..."
                noResultsText=""
                onChange={this._throttledHandleChangeTag.bind(this)}></Select>
        <textarea ref="textarea"
                  defaultValue={body}
                  onChange={this._handleChangeText.bind(this)}
                  style={{width: '100%', height: '600px'}}></textarea>
        <ZeroClipboard text={body}>
          <button type="button">Copy to clipboard</button>
        </ZeroClipboard>
      </div>
    );
  }

  _handleBlurTitleEditor() {
    this._toggleTitleEditingMode()
  }

  _handleChangeTitle(ev) {
    noteActions.updateTitle(this.props.note.id, ev.currentTarget.value);
  }

  _handleClickTitle() {
    this._toggleTitleEditingMode();

    findDOMNode(this.refs['title-editor']).value = this.props.note.title;
  }

  _handleChangeTag(value) {
    noteActions.updateTag(this.props.note.id, value.split(','));
  }

  _handleChangeText(ev) {
    noteActions.inputText(this.props.note.id, ev.currentTarget.value);
  }

  _toggleTitleEditingMode() {
    this.setState({
      editingTitle: !this.state.editingTitle
    });
  }

}
