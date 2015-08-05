import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
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
    const { notes, refineTag } = this.props;
    const noteItems = notes.map(note => {
      if (note.trashed === false &&
      this._includesRefineTag(note, refineTag)) {
        return <NoteItem note={note} key={note.id} />;
      }
    });

    const options = this._getSelectOptions(notes);

    return (
      <div className="note-list-container">
        <div className="note-list-header">
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

          <Select className="note-list-select"
                  options={options}
                  value={refineTag.join(',')}
                  multi={true}
                  noResultsText="No result"
                  onChange={this._handleChangeRefineTags.bind(this)}></Select>

          <div className="note-list-controller">
            <button className="button-base"
                    onClick={this._handleClickAddButton.bind(this)}>
              <span className="octicon octicon-file-text"></span>
              <span>New</span>
            </button>
          </div>

          <div className="note-list-controller">
            <button className="button-base"
                    onClick={this._handleClickToggleCheckAll}>
              <span className="octicon octicon-check"></span>
              <span>Check</span>
            </button>

            <button className="button-base"
                    onClick={this._handleClickTrashCheckedButton.bind(this)}>
              <span className="octicon octicon-trashcan"></span>
              <span>Trash</span>
            </button>
          </div>
        </div>

        <div className="note-list">
          <div className="note-list-inner">{noteItems}</div>
        </div>
      </div>
    );
  }

  _getSelectOptions(notes) {
    return notes.map(note => {
      if (note.trashed === false) {
        return note.tags;
      }
    }).reduce((a, b) => {
      return a.concat(b);
    }, []).filter((el, i, array) => {
      return array.indexOf(el) === i;
    }).map(tag => {
      return {value: tag, label: tag};
    });
  }

  _handleChangeRefineTags(value) {
    noteListActions.updateRefineTag(value.split(','));
  }

  _handleClickAddButton() {
    noteListActions.createNote(assign({}, DEFAULT_NOTE, {
      createdAt: strftime('%Y-%m-%d %H:%M')
    }));
  }

  _handleClickToggleCheckAll() {
    noteListActions.toggleCheckNoteAll();
  }

  _handleClickTrashCheckedButton() {
    const { notes } = this.props;
    const checkedNodeIDs = notes.filter(note => note.checked === true)
      .map(note => note.id);

    noteListActions.trashCheckedNote(checkedNodeIDs);
  }

  _includesRefineTag(note, refineTag) {
    if (refineTag.length === 1 && refineTag[0] === '') {
      return true;
    }
    const { tags } = note;
    return refineTag.every(el => tags.indexOf(el) > -1);
  }

}
