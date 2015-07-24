import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import assign from 'object-assign';

import NoteItemList from './note-item-list';
import { noteListActions } from '../context';

export default class NotesIndex extends Component {

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
    const { notes, refineTag } = this.props;

    const options = this._getSelectOptions(notes);

    return (
      <div className="notes-container">
        <Select options={options}
                value={refineTag.join(',')}
                multi={true}
                onChange={this._handleChangeRefineTags.bind(this)}></Select>
        <NoteItemList notes={notes} refineTag={refineTag} />
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

}
