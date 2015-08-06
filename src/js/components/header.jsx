import React, { Component, PropTypes } from 'react';

import Setting from './setting';

export default class Header extends Component {

  static get propTypes() {
    return {
      setting: PropTypes.shape({
        color: PropTypes.string,
        size: PropTypes.number,
        backgroundColor: PropTypes.string
      })
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { setting } = this.props;

    return (
      <header className="header">
        <a href="./">noto</a>
        <Setting setting={setting} />
      </header>
    );
  }

}
