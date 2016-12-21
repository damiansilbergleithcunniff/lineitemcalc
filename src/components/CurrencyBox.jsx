import React, { Component } from 'react';
import {FormGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';


// props:
//    controlId
//    label (optional)
//    placeholder
//    value
//    onChange
class CurrencyBox extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    if (this.props.onChange){
      this.props.onChange(e);
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
                       value={this.props.value}
                       onChange={this.handleChange} />
        </InputGroup>
      </FormGroup>
    );
  }
}

export default CurrencyBox;
