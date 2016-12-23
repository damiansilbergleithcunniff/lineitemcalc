import React, { Component } from 'react';
import {FormGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import * as accounting from 'accounting'


// props:
//    controlId
//    label (optional)
//    placeholder
//    value
//    onChange(newValue)
class CurrencyBox extends Component{
  constructor(props){
    super(props);

    this.state = {value: accounting.toFixed(this.props.value,2)};

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillReceiveProps(newProps){
    if (this.props.value !== newProps.value){
      this.setState({value: accounting.toFixed(newProps.value,2)});
    }
  }

  // updates state internally but adds a typing delay to call props.onChange
  handleChange(e){
    this.setState({value: e.target.value});
  }

  handleBlur(e){
    if (this.props.onChange){
      this.props.onChange(this.state.value)
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
                       onChange={this.handleChange} onBlur={this.handleBlur} />
        </InputGroup>
      </FormGroup>
    );
  }
}

export default CurrencyBox;
