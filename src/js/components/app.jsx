import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import {
  noteListActions,
  settingActions,
  noteStore,
  settingStore,
  refineTagStore } from '../context';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: noteStore.getNotes(),
      setting: settingStore.getSettings(),
      refineTag: refineTagStore.getTags()
    };

    this._boundChangeNoteStore = this._changeNoteStore.bind(this);
    this._boundChangeSettingStore = this._changeSettingStore.bind(this);
    this._boundChangeRefineTagStore = this._changeRefineTagStore.bind(this);
  }

  componentWillMount() {
    noteListActions.fetch();
    settingActions.fetch();
  }

  componentDidMount() {
    noteStore.addChangeListener(this._boundChangeNoteStore);
    settingStore.addChangeListener(this._boundChangeSettingStore);
    refineTagStore.addChangeListener(this._boundChangeRefineTagStore);
  }

  componentWillUnmount() {
    noteStore.removeChangeListener(this._boundChangeNoteStore);
    settingStore.removeChangeListener(this._boundChangeSettingStore);
    refineTagStore.removeChangeListener(this._boundChangeRefineTagStore);
  }

  render() {
    const { notes, setting, refineTag } = this.state;
    return (
      <div className="app">
        <header className="header"><a href="./">noto</a></header>
        <RouteHandler notes={notes} setting={setting} refineTag={refineTag} />
        <footer>
          <p><small>© noto | github.com/sugarshin</small></p>
        </footer>
      </div>
    );
  }

  _changeNoteStore() {
    this.setState({
      notes: noteStore.getNotes()
    });
  }

  _changeSettingStore() {
    this.setState({
      setting: settingStore.getSettings()
    });
  }

  _changeRefineTagStore() {
    this.setState({
      refineTag: refineTagStore.getTags()
    });
  }

}
