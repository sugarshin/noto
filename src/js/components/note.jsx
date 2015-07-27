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
        tags: PropTypes.arrayOf(PropTypes.string)
      })
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditingTitle: false,
      isCopied: false
    };

    this._throttledInputText = throttle(noteActions.inputText, 400).bind(noteActions);
  }

  componentDidUpdate(prevProps, prevState) {
    const { id, body } = this.props.note;
    if (prevProps.note.id !== id) {
      findDOMNode(this.refs.textarea).value = body;
    }
  }

  render() {
    const { note, setting } = this.props;

    return (
      <div className="note-container" style={{float: 'left', width: '50%'}}>
        <div className={classnames('note-title-wrapper', {
          editing: this.state.isEditingTitle
        })}>
          <div className="note-title"
               onClick={this._handleClickTitle.bind(this)}>
             {note.title}
             <span className="octicon octicon-pencil"></span>
          </div>
          <input ref="title-editor"
                 type="text"
                 className="note-title-editor"
                 onChange={this._handleChangeTitle.bind(this)}
                 onBlur={this._handleBlurTitleEditor.bind(this)} />
        </div>
        <div className="note-created-at">{note.createdAt}</div>
        <Select value={note.tags.join(',')}
                multi={true}
                allowCreate={true}
                placeholder="Add tag..."
                noResultsText=""
                onChange={this._handleChangeTag.bind(this)}></Select>
        <textarea ref="textarea"
                  className="note-textarea"
                  defaultValue={note.body}
                  onChange={this._handleChangeText.bind(this)}
                  style={{
                    color: setting.color,
                    backgroundColor: setting.backgroundColor,
                    fontSize: setting.size
                  }}></textarea>
        <ZeroClipboard text={note.body} onAfterCopy={this._handleAfterCopy.bind(this)}>
          <button className="button-base" type="button">
            <span className="octicon octicon-clippy"></span>
            <span>Copy to clipboard</span>
          </button>
        </ZeroClipboard>
        <span className={classnames('success-copy-wrapper', {
          'success-copy-visible': this.state.isCopied
        })}>
          <span className="octicon octicon-check"></span>
          <span>Copied!</span>
        </span>
      </div>
    );
  }

  _handleChangeTitle(ev) {
    noteActions.updateTitle(this.props.note.id, ev.currentTarget.value);
  }

  _handleClickTitle() {
    this._toggleTitleEditingMode(true);
    findDOMNode(this.refs['title-editor']).value = this.props.note.title;
  }

  _handleBlurTitleEditor() {
    this._toggleTitleEditingMode();
  }

  _handleChangeTag(value) {
    noteActions.updateTag(this.props.note.id, value.split(','));
  }

  _handleChangeText(ev) {
    this._throttledInputText(this.props.note.id, ev.currentTarget.value);
  }

  _handleAfterCopy() {
    this.setState({
      isCopied: true
    });
    // TODO
    setTimeout(() => {
      this.setState({
        isCopied: false
      });
    }, 3000);
  }

  _toggleTitleEditingMode(isFocus) {
    this.setState(previousState => {
      return {isEditingTitle: !previousState.isEditingTitle};
    }, () => {
      if (isFocus === true) {
        findDOMNode(this.refs['title-editor']).focus();
      }
    });
  }

}
