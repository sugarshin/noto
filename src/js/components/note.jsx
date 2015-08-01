import React, { Component, PropTypes, findDOMNode } from 'react';
import Select from 'react-select';
import throttle from 'lodash.throttle';

import NoteTitle from './note-title';
import CopyButton from './copy-button';
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
      <div className="note-container">
        <NoteTitle note={{id: note.id, title: note.title}} />
        <div className="note-created-at">{note.createdAt}</div>
        <Select className="note-tags"
                value={note.tags.join(',')}
                multi={true}
                allowCreate={true}
                placeholder="Add tag..."
                noResultsText=""
                onChange={this._handleChangeTag.bind(this)} />
        <textarea ref="textarea"
                  className="note-textarea"
                  defaultValue={note.body}
                  onChange={this._handleChangeText.bind(this)}
                  style={{
                    color: setting.color,
                    backgroundColor: setting.backgroundColor,
                    fontSize: setting.size
                  }}></textarea>
        <CopyButton note={{body: note.body}} />
      </div>
    );
  }

  _handleChangeTag(value) {
    noteActions.updateTag(this.props.note.id, value.split(','));
  }

  _handleChangeText(ev) {
    this._throttledInputText(this.props.note.id, ev.currentTarget.value);
  }

}
