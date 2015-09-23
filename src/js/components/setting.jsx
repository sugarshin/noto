import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import ColorPicker from 'react-color-picker';

import { settingActions } from '../context';
import {
  DEFAULT,
  INITIAL_STORE,
  FONT_SIZE_VARIATION,
  APP_ELEMENT_ID,
  SETTINGS_NOTE_CONFIG } from '../constants/constants';

const modalStyles = {
  content: {
    top: '6.25%',
    left: '6.25%',
    right: '6.25%',
    bottom: '6.25%',
    background: 'rgba(50, 59, 67, .9)',
    padding: '4%'
  }
};

Modal.setAppElement(document.getElementById(APP_ELEMENT_ID));

export default class Setting extends Component {

  static get propTypes() {
    return {
      setting: PropTypes.shape({
        styles: PropTypes.shape({
          color: PropTypes.string,
          size: PropTypes.number,
          backgroundColor: PropTypes.string
        }),
        isOpenSetting: PropTypes.bool
      })
    };
  }

  constructor(props) {
    super(props);

    this.handleClickOpenModal = this.handleClickOpenModal.bind(this);
  }

  render() {
    const { styles, isOpenSetting } = this.props.setting;
    const selectOptions = FONT_SIZE_VARIATION.map(size => {
      return {value: size, label: `${size}px`};
    });

    return (
      <div className="setting-container">
        <button className="setting-open-button"
                onClick={this.handleClickOpenModal}>
          <span className="octicon octicon-gear"></span>
        </button>
        <Modal isOpen={isOpenSetting}
               onRequestClose={this.handleCloseModal}
               style={modalStyles}>
          <div className="setting-body">
            <button className="close-modal-button"
                    onClick={this.handleCloseModal}>
              <span className="octicon octicon-x"></span>
            </button>

            <div className="setting-item setting-fontsize-container">
              <span className="setting-item-title">Font size</span>
              <Select clearable={false}
                      value={`${styles.size}px`}
                      searchable={false}
                      options={selectOptions}
                      className="setting-size-selector"
                      onChange={this.handleChangeFontSize}></Select>
            </div>

            <div className="setting-item setting-color-container">
              <span className="setting-item-title">Font color</span>
              <ColorPicker value={styles.color}
                           onDrag={this.handleDragColor}
                           saturationWidth={128}
                           saturationHeight={128}
                           hueWidth={24} />
            </div>

            <div className="setting-item setting-backgroundcolor-container">
              <span className="setting-item-title">Background color</span>
              <ColorPicker value={styles.backgroundColor}
                           onDrag={this.handleDragBackgroundColor}
                           saturationWidth={128}
                           saturationHeight={128}
                           hueWidth={24} />
            </div>

            <div className="setting-item setting-reset-container">
              <button className="button-base text-light"
                      onClick={this.handleClickResetButton}>
                <span className="octicon octicon-primitive-square"></span>
                <span>Reset</span>
              </button>
            </div>

          </div>
        </Modal>
      </div>
    );
  }

  handleClickOpenModal() {
    const { isOpenSetting } = this.props.setting;
    settingActions.changeIsOpenSetting(!isOpenSetting);
  }

  handleCloseModal() {
    settingActions.changeIsOpenSetting(false);
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

  handleClickResetButton() {
    settingActions.reset(DEFAULT[SETTINGS_NOTE_CONFIG]);
  }

}
