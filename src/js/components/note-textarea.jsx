import React, { Component, PropTypes, findDOMNode } from 'react';
import throttle from 'lodash.throttle';

import { noteActions } from '../context';

export default class NoteTextarea extends Component {

  static get propTypes() {
    return {
      note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        body: PropTypes.string
      }),
      setting: PropTypes.shape({
        styles: PropTypes.shape({
          color: PropTypes.string,
          size: PropTypes.number,
          backgroundColor: PropTypes.string
        })
      })
    };
  }

  constructor(props) {
    super(props);

    this._throttledInputText = throttle(noteActions.inputText, 400).bind(noteActions);
    this.handleChangeText = this.handleChangeText.bind(this);
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
      color: setting.styles.color,
      backgroundColor: setting.styles.backgroundColor,
      fontSize: setting.styles.size
    };

    return (
      <div className="note-textarea-container">
        <textarea ref="textarea"
                  className="note-textarea"
                  defaultValue={note.body}
                  onChange={this.handleChangeText}
                  style={styles}></textarea>
      </div>
    );
  }

  handleChangeText(ev) {
    this._throttledInputText(this.props.note.id, ev.currentTarget.value);
  }

}
