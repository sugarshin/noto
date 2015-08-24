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

    this.handleClickOpenModal = this.handleClickOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  render() {
    const { color, size, backgroundColor } = this.props.setting;
    const selectOptions = FONT_SIZE_VARIATION.map(size => {
      return {value: size, label: `${size}px`};
    });

    return (
      <div className="setting-container">
        <button className="setting-open-button"
                onClick={this.handleClickOpenModal}>
          <span className="octicon octicon-gear"></span>
        </button>
        <Modal isOpen={this.state.modalIsOpen}
               onRequestClose={this.handleCloseModal}>
          <div className="setting-body">
            <button className="close-modal-button"
                    onClick={this.handleCloseModal}>
              <span className="octicon octicon-x"></span>
            </button>

            <div className="setting-item setting-fontsize-container">
              <span className="setting-item-title">Font size</span>
              <Select clearable={false}
                      value={`${size}px`}
                      searchable={false}
                      options={selectOptions}
                      className="setting-size-selector"
                      onChange={this.handleChangeFontSize}></Select>
            </div>

            <div className="setting-item setting-color-container">
              <span className="setting-item-title">Font color</span>
              <ColorPicker value={color}
                           onDrag={this.handleDragColor}
                           saturationWidth={128}
                           saturationHeight={128}
                           hueWidth={24} />
            </div>

            <div className="setting-item setting-backgroundcolor-container">
              <span className="setting-item-title">Background color</span>
              <ColorPicker value={backgroundColor}
                           onDrag={this.handleDragBackgroundColor}
                           saturationWidth={128}
                           saturationHeight={128}
                           hueWidth={24} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  handleClickOpenModal() {
    this.setState({modalIsOpen: true});
  }

  handleCloseModal() {
    this.setState({modalIsOpen: false});
  }

  handleChangeFontSize(value) {
    settingActions.changeTextSize(+value); // value is string
  }

  handleDragColor(color, c) {
    settingActions.changeTextColor(color);
  }

  handleDragBackgroundColor(color, c) {
    settingActions.changeBackgroundColor(color);
  }

}
