import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import assign from 'object-assign';

import TrashedNoteItemList from './trashed-note-item-list';

export default class TrashedNotes extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.string,
        trashed: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.string)
      }))
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { notes } = this.props;

    return (
      <div className="notes-container">
        <TrashedNoteItemList notes={notes} />
        <footer><Link to="notes-index">ノート</Link></footer>
      </div>
    );
  }

}
