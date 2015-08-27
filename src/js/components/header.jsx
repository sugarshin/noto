import React, { Component, PropTypes } from 'react';

import Setting from './setting';

export default class Header extends Component {

  static get propTypes() {
    return {
      setting: PropTypes.object
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
