require("../style/talk-input.scss");

import React from "react";
import PropTypes from "prop-types";

const isBlank = require("is-blank");

class TalkInput extends React.Component {

  static propTypes = {
    onSendMessage: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    placeHolder: "Send a message",
    disabled: false
  }

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      disabled: props.disabled
    };
  }

  onEnterPress = () => {
    if (!isBlank(this.state.message)) {
      this.props.onSendMessage(this.state.message);
      this.setState({ message: "" });
    }
  }

  handleOnChange = (e) => {
    this.setState({ message: e.target.value });
  }

  catchReturn = (e) => {
    if (!(e.ctrlKey || e.shiftKey) && e.key === "Enter") {
      this.onEnterPress();
      e.preventDefault();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled != nextProps.disabled) {
      this.setState({ disabled: nextProps.disabled });
    }
  }

  render() {
    return(
      <div className="talk-input-wrapper">
        <textarea cols="60" rows="3"
          className="talk-input-raw" onChange={ this.handleOnChange }
          value={ this.state.message } onKeyPress={ this.catchReturn }
          disabled={ (this.state.disabled) ? "disabled" : "" }
          placeholder={ this.props.placeHolder }/>
      </div>
    );
  }
}

export default TalkInput;
