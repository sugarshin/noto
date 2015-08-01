import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Select from 'react-select';
import assign from 'object-assign';

import Setting from './setting';
import NoteItemList from './note-item-list';
import Note from './note';
import { noteListActions } from '../context';
import { DEFAULT_NOTE } from '../constants/constants';
import { baseTitle } from '../config/settings';

export default class Notes extends Component {

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
      setting: PropTypes.shape({
        color: PropTypes.string,
        size: PropTypes.number,
        backgroundColor: PropTypes.string
      }),
      refineTag: PropTypes.arrayOf(PropTypes.string)
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { notes, setting, refineTag, params } = this.props;
    const note = this._findWhereNote(notes, params.id) || DEFAULT_NOTE;
    const options = this._getSelectOptions(notes);

    return (
      <DocumentTitle title={`${note.title} | Notes | ${baseTitle}`}>
        <div className="notes-container">
          <Setting setting={setting} />
          <Select options={options}
                  value={refineTag.join(',')}
                  multi={true}
                  onChange={this._handleChangeRefineTags.bind(this)}></Select>
          <NoteItemList notes={notes} refineTag={refineTag} />
          <Note note={note} setting={setting} />
          <footer><Link to="trashed-notes">ゴミ箱</Link></footer>
        </div>
      </DocumentTitle>
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

  _findWhereNote(notes, id) {
    for (let i = 0, l = notes.length; i < l; i++) {
      const note = notes[i];
      if (note.id === id) {
        return note;
      }
    }
    return null;
  }

  _handleChangeRefineTags(value) {
    noteListActions.updateRefineTag(value.split(','));
  }

}
