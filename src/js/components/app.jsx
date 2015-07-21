import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import NoteItemList from './note-item-list';

import { noteStore } from '../context';

export default class App extends Component {

  // static get propTypes() { return {}; }

  // static get defaultProps() { return {}; }

  constructor(props) {
    super(props);

    this.state = {
      notes: noteStore.getNotes()
    }

    this._boundChangeStore = this._changeStore.bind(this);
  }

  componentDidMount() {
    noteStore.addChangeListener(this._boundChangeStore);
  }

  componentWillUnmount() {
    noteStore.removeChangeListener(this._boundChangeStore);
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="app">
        <header>header</header>
        <NoteItemList notes={notes} />
        <RouteHandler notes={notes} />
      </div>
    );
  }

  _changeStore() {
    this.setState({
      notes: noteStore.getNotes()
    });
  }

}
