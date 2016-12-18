import React, { Component } from 'react';
import {FormGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';

class CurrencyBox extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <FormGroup controlId={this.props.controlId}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <InputGroup>
          <InputGroup.Addon>$</InputGroup.Addon>
          <FormControl type="text"
                       placeholder={this.props.placeholder}
                       value={this.props.value}
                       onChange={this.props.onChange} />
        </InputGroup>
      </FormGroup>
    );
  }
}

export default CurrencyBox;
