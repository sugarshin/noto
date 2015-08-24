import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import assign from 'object-assign';
import strftime from 'strftime';

import NoteListLink from './note-list-link';
import NoteItem from './note-item';
import { noteListActions } from '../context';
import { DEFAULT } from '../constants/constants';

export default class NoteItemList extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
        trashed: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.string)
      })),
      refineTag: PropTypes.arrayOf(PropTypes.string)
    };
  }

  constructor(props) {
    super(props);

    this.handleClickTrashChecked = this.handleClickTrashChecked.bind(this);
  }

  render() {
    const { notes, refineTag } = this.props;
    const noteItems = notes.filter(note => {
      return (note.trashed === false &&
              this._includesRefineTag(note, refineTag));
    }).map(note => {
      return <NoteItem note={note} key={note.id} />;
    });

    const options = this._getSelectOptions(notes);

    return (
      <div className="note-list-container">
        <div className="note-list-header">
          <div className="note-list-controller">
            <button className="button-base"
                    onClick={this.handleClickAddButton}>
              <span className="octicon octicon-file-text"></span>
              <span>New</span>
            </button>
          </div>

          <div className="note-list-controller">
            <button className="button-base"
                    onClick={this.handleClickToggleCheckAll}>
              <span className="octicon octicon-check"></span>
              <span>Check</span>
            </button>

            <button className="button-base"
                    onClick={this.handleClickTrashChecked}>
              <span className="octicon octicon-trashcan"></span>
              <span>Trash</span>
            </button>
          </div>

          <Select className="note-list-select"
                  options={options}
                  value={refineTag.join(',')}
                  multi={true}
                  placeholder="Filter tag..."
                  noResultsText="No result"
                  onChange={this.handleChangeRefineTags}></Select>
        </div>

        <div className="note-list">
          <div className="note-list-inner">{noteItems}</div>
        </div>

        <NoteListLink />
      </div>
    );
  }

  handleChangeRefineTags(value) {
    noteListActions.updateRefineTag(value.split(','));
  }

  handleClickAddButton() {
    noteListActions.createNote(assign({}, DEFAULT.note, {
      createdAt: strftime('%Y-%m-%d %H:%M')
    }));
  }

  handleClickToggleCheckAll() {
    noteListActions.toggleCheckNoteAll();
  }

  handleClickTrashChecked() {
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

  /**
   * ノートリストの絞込表示用
   * Select options
   * @params {array} notes
   * @return {array} [{value: tag, label: tag},]
   */
  _getSelectOptions(notes) {
    return notes.filter(note => note.trashed === false)
      .map(note => note.tags)
      // flatten
      .reduce((a, b) => {
        return a.concat(b);
      }, [])
      // 重複削除
      .filter((tag, i, tags) => tags.indexOf(tag) === i)
      .map(tag => {
        return {value: tag, label: tag};
      });
  }

}
