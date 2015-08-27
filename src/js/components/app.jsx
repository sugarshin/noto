import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import Header from './header';

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

    this.changeNoteStore = this.changeNoteStore.bind(this);
    this.changeSettingStore = this.changeSettingStore.bind(this);
    this.changeRefineTagStore = this.changeRefineTagStore.bind(this);
  }

  componentDidMount() {
    noteStore.addChangeListener(this.changeNoteStore);
    settingStore.addChangeListener(this.changeSettingStore);
    refineTagStore.addChangeListener(this.changeRefineTagStore);

    noteListActions.fetch();
    settingActions.fetch();
  }

  componentWillUnmount() {
    noteStore.removeChangeListener(this.changeNoteStore);
    settingStore.removeChangeListener(this.changeSettingStore);
    refineTagStore.removeChangeListener(this.changeRefineTagStore);
  }

  render() {
    const { notes, setting, refineTag } = this.state;
    return (
      <div className="app">
        <Header setting={setting} />
        <RouteHandler notes={notes} setting={setting} refineTag={refineTag} />
      </div>
    );
  }

  changeNoteStore() {
    this._setState('notes', noteStore.getNotes());
  }

  changeSettingStore() {
    this._setState('setting', settingStore.getSettings());
  }

  changeRefineTagStore() {
    this._setState('refineTag', refineTagStore.getTags());
  }

  _setState(key, store) {
    this.setState({
      [key]: store
    });
  }

}
