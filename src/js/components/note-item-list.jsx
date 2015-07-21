import React, { Component, PropTypes } from 'react';

import NoteItem from './note-item';

import { noteListActions } from '../context';

export default class NoteItemList extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.array
    };
  }

  // static get defaultProps() { return {}; }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="note-list-container" style={{float: 'left', width: '50%'}}>
        <button type="button" onClick={this._handleClickAddButton.bind(this)}>add</button>
        <div className="note-list">
          {this.props.notes.map(note => {
            return <NoteItem data={note} key={note.id} />
          })}
        </div>
      </div>
    );
  }

  _handleClickAddButton() {
    noteListActions.createNote({
      title: 'UNTITLED',
      body: '',
      createdAt: `${new Date()}`,
      tags: []
    });
  }

}
