import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import ColorPicker from 'react-color-picker';

import { settingActions } from '../context';
import { INITIAL_STORE, FONT_SIZE_VARIATION } from '../constants/constants';

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
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { color, size, backgroundColor } = this.props.setting;
    const options = FONT_SIZE_VARIATION.map(size => {
      return {value: size, label: `${size}px`};
    });

    return (
      <div className="setting-container">
        <Select clearable={false} value={`${size}px`} searchable={false}
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
      </div>
    );
  }

  _handleChangeFontSize(value) {
    console.log(value);
    settingActions.changeTextSize(+value);
  }

  _handleDragColor(color, c) {
    settingActions.changeTextColor(color);
  }

  _handleDragBackgroundColor(color, c) {
    settingActions.changeBackgroundColor(color);
  }

}
