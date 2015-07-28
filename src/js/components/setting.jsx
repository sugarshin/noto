import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import ColorPicker from 'react-color-picker';

import { settingActions } from '../context';
import {
  INITIAL_STORE,
  FONT_SIZE_VARIATION,
  APP_ELEMENT_ID } from '../constants/constants';

Modal.setAppElement(document.getElementById(APP_ELEMENT_ID));

export default class Setting extends Component {

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
    this.state = {
      modalIsOpen: false
    };
  }

  render() {
    const { color, size, backgroundColor } = this.props.setting;
    const options = FONT_SIZE_VARIATION.map(size => {
      return {value: size, label: `${size}px`};
    });

    return (
      <div className="setting-container">
        <button onClick={this._openModal.bind(this)}>
          <span className="octicon octicon-gear"></span>
        </button>
        <Modal isOpen={this.state.modalIsOpen}
               onRequestClose={this._closeModal.bind(this)}>
          <Select clearable={false}
                  value={`${size}px`}
                  searchable={false}
                  options={options}
                  className="setting-size-selector"
                  onChange={this._handleChangeFontSize.bind(this)}></Select>

          <ColorPicker value={color}
                       onDrag={this._handleDragColor.bind(this)}
                       saturationWidth={128}
                       saturationHeight={128}
                       hueWidth={24} />
          <ColorPicker value={backgroundColor}
                       onDrag={this._handleDragBackgroundColor.bind(this)}
                       saturationWidth={128}
                       saturationHeight={128}
                       hueWidth={24} />
        </Modal>
      </div>
    );
  }

  _openModal() {
    this.setState({modalIsOpen: true});
  }

  _closeModal() {
    this.setState({modalIsOpen: false});
  }

  _handleChangeFontSize(value) {
    settingActions.changeTextSize(+value); // value is string
  }

  _handleDragColor(color, c) {
    settingActions.changeTextColor(color);
  }

  _handleDragBackgroundColor(color, c) {
    settingActions.changeBackgroundColor(color);
  }

}
