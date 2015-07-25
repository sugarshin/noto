import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import { noteStore, refineTagStore } from '../context';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: noteStore.getNotes(),
      refineTag: refineTagStore.getTags()
    };

    this._boundChangeNoteStore = this._changeNoteStore.bind(this);
    this._boundChangeRefineTagStore = this._changeRefineTagStore.bind(this);
  }

  componentDidMount() {
    noteStore.addChangeListener(this._boundChangeNoteStore);
    refineTagStore.addChangeListener(this._boundChangeRefineTagStore);
  }

  componentWillUnmount() {
    noteStore.removeChangeListener(this._boundChangeNoteStore);
    refineTagStore.removeChangeListener(this._boundChangeRefineTagStore);
  }

  render() {
    const { notes, refineTag } = this.state;
    return (
      <div className="app">
        <header><a href="./">noto</a></header>
        <RouteHandler notes={notes} refineTag={refineTag} />
      </div>
    );
  }

  _changeNoteStore() {
    this.setState({
      notes: noteStore.getNotes()
    });
  }

  _changeRefineTagStore() {
    this.setState({
      refineTag: refineTagStore.getTags()
    });
  }

}
