import React, { Component, PropTypes, findDOMNode } from 'react';
import classnames from 'classnames';

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
  }

  render() {
    const classes = classnames('note-title-wrapper', {
      editing: this.state.isEditingTitle
    });

    return (
      <div className={classes}>
        <div className="note-title"
             onClick={this._handleClickTitle.bind(this)}>
           {this.props.note.title}
           <span className="octicon octicon-pencil"></span>
        </div>
        <input ref="title-editor"
               type="text"
               className="note-title-editor"
               onChange={this._handleChangeTitle.bind(this)}
               onBlur={this._handleBlurTitleEditor.bind(this)} />
      </div>
    );
  }

  _handleChangeTitle(ev) {
    noteActions.updateTitle(this.props.note.id, ev.currentTarget.value);
  }

  _handleClickTitle() {
    this._toggleTitleEditingMode(true);
    findDOMNode(this.refs['title-editor']).value = this.props.note.title;
  }

  _handleBlurTitleEditor() {
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
