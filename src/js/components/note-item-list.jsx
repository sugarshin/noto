import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import assign from 'object-assign';

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
        visible: PropTypes.bool,
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
                onClick={this._handleClickAddButton.bind(this)}>add</button>
        <div className="note-list">
          {this.props.notes.map(note => {
            if (note.trashed === false &&
                this._includesRefineTag(note, refineTag)) {
              return <NoteItem note={note} key={note.id} />
            }
          })}
        </div>
        <footer><Link to="trashed-notes">ゴミ箱</Link></footer>
      </div>
    );
  }

  _handleClickAddButton() {
    noteListActions.createNote(assign({}, DEFAULT_NOTE, {
      createdAt: `${new Date()}`
    }));
  }

  _includesRefineTag(note, tags) {
    if (tags.length === 1 && tags[0] === '') {
      return true;
    }
    for (let i = 0, l = note.tags.length; i < l; i++) {
      if (tags.indexOf(note.tags[i]) > -1) {
        return true;
      }
    }
    return false;
  }

}
