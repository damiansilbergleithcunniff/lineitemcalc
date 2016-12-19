import React, { Component } from 'react';
import {LineItemRowEdit} from './LineItemRowEdit';
import {LineItemRowDisplay} from './LineItemRowDisplay';

//props:
//  edit: true if the row is being edited
class LineItemRow extends Component{
  constructor(props){
    super(props);
  }

  render() {
    if (this.props.edit){
      return <LineItemRowDisplay />;
    } else {
      return <LineItemRowEdit />;
    }
  }
}