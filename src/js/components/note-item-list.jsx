import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import assign from 'object-assign';
import strftime from 'strftime';

import NoteItem from './note-item';
import { noteListActions } from '../context';
import { DEFAULT_NOTE } from '../constants/constants';

export default class NoteItemList extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.string,
        trashed: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.string)
      })),
      refineTag: PropTypes.arrayOf(PropTypes.string)
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { refineTag } = this.props;
    return (
      <div className="note-list-container" style={{float: 'left', width: '50%'}}>
        <button type="button"
                onClick={this._handleClickAddButton.bind(this)}>
          <span className="octicon octicon-plus"></span>
        </button>
        <div className="note-list">
          {this.props.notes.map(note => {
            if (note.trashed === false &&
            this._includesRefineTag(note, refineTag)) {
              return <NoteItem note={note} key={note.id} />
            }
          })}
        </div>
      </div>
    );
  }

  _handleClickAddButton() {
    noteListActions.createNote(assign({}, DEFAULT_NOTE, {
      createdAt: strftime('%Y-%m-%d %H:%M:%S')
    }));
  }

  _includesRefineTag(note, refineTag) {
    if (refineTag.length === 1 && refineTag[0] === '') {
      return true;
    }
    const { tags } = note;
    return refineTag.every(el => tags.indexOf(el) > -1);
  }

}
