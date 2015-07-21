import React, { Component, PropTypes, findDOMNode } from 'react';
import Select from 'react-select';
import throttle from 'lodash.throttle';
import assign from 'object-assign';

import { noteActions } from '../context';

export default class Note extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.array
    };
  }

  // static get defaultProps() { return {}; }

  constructor(props) {
    const { notes, params } = props;
    super(props);

    this.state = this._findWhereNote(notes, params.id);

    this._throttledHandleChangeTag = throttle(this._handleChangeTag, 400);
  }

  componentWillReceiveProps(nextProps) {
    const { notes, params } = nextProps;
    const note = this._findWhereNote(notes, params.id) ;
    this.setState(note);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      findDOMNode(this.refs.textarea).value = this.state.body;
    }
  }

  render() {
    const { title, body, createdAt, tags } = this.state;

    return (
      <div className="note-container" style={{float: 'left', width: '50%'}}>
        <div className="note-title">{title}</div>
        <div className="note-created-at">{createdAt}</div>
        <Select value={tags.join(',')}
                multi={true}
                allowCreate={true}
                placeholder="Add tag..."
                onChange={this._throttledHandleChangeTag.bind(this)}></Select>
        <textarea ref="textarea"
                  defaultValue={body}
                  onChange={this._handleChangeText.bind(this)}
                  style={{width: '100%', height: '600px'}}></textarea>
      </div>
    );
  }

  _handleChangeTag(value) {
    noteActions.updateTag(this.state.id, value.split(','));
  }

  _handleChangeText(ev) {
    noteActions.inputText(this.state.id, ev.currentTarget.value);
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

}
