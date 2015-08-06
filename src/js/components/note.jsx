import React, { Component, PropTypes } from 'react';
import TagsInput from 'react-tagsinput';

import NoteTitle from './note-title';
import NoteTextarea from './note-textarea';
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
      }),
      setting: PropTypes.shape({
        color: PropTypes.string,
        size: PropTypes.number,
        backgroundColor: PropTypes.string
      })
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { note, setting } = this.props;

    return (
      <div className="note-container">
        <NoteTitle note={{id: note.id, title: note.title}} />
        <div className="note-created-at">{note.createdAt}</div>
        <TagsInput value={note.tags}
                   ref="tags"
                   placeholder="Add a tag..."
                   classNames={{div: 'react-tagsinput note-tags'}}
                   onChange={this._handleChangeTags.bind(this)} />
        <NoteTextarea note={note} setting={setting} />
        <CopyButton note={{body: note.body}} />
      </div>
    );
  }

  _handleChangeTags(tags) {
    noteActions.updateTag(this.props.note.id, tags);
  }

}
