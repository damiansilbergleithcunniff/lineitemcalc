import React, { Component } from 'react';
import {FormGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import * as accounting from 'accounting'

//  React-Bootstrap component which renders a text input with a "$" decoration
//    also automatically formats to 2 decimal places when focus is lost
//  Events:
//    onChange(e):  Raised when the value is updated.
//    onBlur(e):    Raised when the input loses focus
//  props:
//    controlId: A unique ID to add to the Bootstrap FormGroup
//    label: the Label to show with the textbox (optional)
//    placeholder: the grey text to appear in the input
//    value: the value of the textbox, will be used to update the value displayed
//    readOnly: if truthy the input will be disabled
class CurrencyBox extends Component{
  constructor(props){
    super(props);

    this.state = {value: accounting.toFixed(this.props.value,2)};

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps){
      this.setState({value: accounting.toFixed(newProps.value,2)});
  }

  handleChange(e){
    this.setState({value: e.target.value});
    if (this.props.onChange){
      this.props.onChange(e)
    }
  }

  render(){
    return(
      <FormGroup controlId={this.props.controlId}>
        {this.props.label ?
          <ControlLabel>{this.props.label}</ControlLabel>
          : ''
        }
        <InputGroup>
          <InputGroup.Addon>$</InputGroup.Addon>
          <FormControl type="text"
                       placeholder={this.props.placeholder}
                       value={this.state.value}
                       disabled={this.props.readOnly}
                       onBlur={this.props.onBlur}
                       onChange={this.handleChange} />
        </InputGroup>
      </FormGroup>
    );
  }
}

export default CurrencyBox;
