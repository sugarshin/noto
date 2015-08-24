import React, { Component, PropTypes, findDOMNode } from 'react';
import classnames from 'classnames';
import throttle from 'lodash.throttle';

import { noteActions } from '../context';

export default class NoteTitle extends Component {

  static get propTypes() {
    return {
      note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string
      })
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditingTitle: false
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleClickTitle = this.handleClickTitle.bind(this);
    this.handleBlurTitleEditor = this.handleBlurTitleEditor.bind(this);

    this._throttledUpdateTitle = throttle(noteActions.updateTitle, 400).bind(noteActions);
  }

  render() {
    const classes = classnames('note-title-wrapper', {
      editing: this.state.isEditingTitle
    });

    return (
      <div className={classes}>
        <div className="note-title" onClick={this.handleClickTitle}>
           <span>{this.props.note.title}</span>
           <span className="octicon octicon-pencil"></span>
        </div>
        <input ref="title-editor"
               type="text"
               className="note-title-editor"
               onChange={this.handleChangeTitle}
               onBlur={this.handleBlurTitleEditor} />
      </div>
    );
  }

  handleChangeTitle(ev) {
    this._throttledUpdateTitle(this.props.note.id, ev.currentTarget.value);
  }

  handleClickTitle() {
    this._toggleTitleEditingMode(true);
    findDOMNode(this.refs['title-editor']).value = this.props.note.title;
  }

  handleBlurTitleEditor() {
    this._toggleTitleEditingMode();
  }

  _toggleTitleEditingMode(isFocus) {
    this.setState(previousState => {
      return {isEditingTitle: !previousState.isEditingTitle};
    }, () => {
      if (isFocus === true) {
        findDOMNode(this.refs['title-editor']).focus();
      }
    });
  }

}
