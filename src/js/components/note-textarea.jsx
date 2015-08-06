import React, { Component, PropTypes, findDOMNode } from 'react';
import throttle from 'lodash.throttle';

import { noteActions } from '../context';

export default class NoteTextarea extends Component {

  static get propTypes() {
    return {
      note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.string,
        trashed: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.string)
      }),
      setting: PropTypes.shape({
        color: PropTypes.string,
        size: PropTypes.number,
        backgroundColor: PropTypes.string
      })
    };
  }

  constructor(props) {
    super(props);

    this._throttledInputText = throttle(noteActions.inputText, 400).bind(noteActions);
  }

  componentDidUpdate(prevProps, prevState) {
    const { id, body } = this.props.note;
    if (prevProps.note.id !== id) {
      findDOMNode(this.refs.textarea).value = body;
    }
  }

  render() {
    const { note, setting } = this.props;
    const styles = {
      color: setting.color,
      backgroundColor: setting.backgroundColor,
      fontSize: setting.size
    };

    return (
      <div className="note-textarea-container">
        <textarea ref="textarea"
                  className="note-textarea"
                  defaultValue={note.body}
                  onChange={this._handleChangeText.bind(this)}
                  style={styles}></textarea>
      </div>
    );
  }

  _handleChangeText(ev) {
    this._throttledInputText(this.props.note.id, ev.currentTarget.value);
  }

}
