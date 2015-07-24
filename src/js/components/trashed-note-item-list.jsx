import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import TrashedNoteItem from './trashed-note-item';

import { noteListActions } from '../context';

export default class TrashedNoteItemList extends Component {

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
      }))
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="note-list-container" style={{float: 'left', width: '50%'}}>
        <div className="note-list">
          {this.props.notes.map(note => {
            if (note.trashed === true) {
              return <TrashedNoteItem note={note} key={note.id} />
            }
          })}
        </div>
        <footer><Link to="notes-index">ノート</Link></footer>
      </div>
    );
  }

}
