import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NoteListLink extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="note-list-link">
        <ul>
          <li>
            <Link to="index">
              <span className="octicon octicon-repo"></span>
            </Link>
          </li>
          <li>
            <Link to="trashed-notes">
              <span className="octicon octicon-trashcan"></span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }

}
