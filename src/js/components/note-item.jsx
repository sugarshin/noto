import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { noteListActions } from '../context';

export default class NoteItem extends Component {

  static get propTypes() {
    return {
      data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string)
      })
    };
  }

  // static get defaultProps() { return {}; }

  constructor(props) {
    super(props);
  }

  render() {
    const { id, title, body, createdAt } = this.props.data;
    return (
      <div className="note-item-container">
        <Link to="notes" params={{ id }}>
          <div>{title}</div>
          <div>{`${body.slice(0, 16)}...`}</div>
          <div>{createdAt}</div>
        </Link>
      </div>
    );
  }

}
