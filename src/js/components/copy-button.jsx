import React, { Component, PropTypes } from 'react';
import ZeroClipboard from 'react-zeroclipboard';
import classnames from 'classnames';

export default class CopyButton extends Component {

  static get propTypes() {
    return {
      note: PropTypes.shape({
        body: PropTypes.string
      })
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      isCopied: false
    };

  }

  render() {
    const successClasses = classnames('success-copy-wrapper', {
      'success-copy-visible': this.state.isCopied
    });

    return (
      <div className="note-copy-button">
        <ZeroClipboard text={this.props.note.body} onAfterCopy={this._handleAfterCopy.bind(this)}>
          <button className="button-base" type="button">
            <span className="octicon octicon-clippy"></span>
            <span>Copy to clipboard</span>
          </button>
        </ZeroClipboard>
        <span className={successClasses}>
          <span className="octicon octicon-check"></span>
          <span>Copied!</span>
        </span>
      </div>
    );
  }

  _handleAfterCopy() {
    this.setState({
      isCopied: true
    });
    // TODO
    setTimeout(() => {
      this.setState({
        isCopied: false
      });
    }, 3000);
  }

}
