import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import accounting from 'accounting';

// props:
//  index
//  name
//  id
//  cost
//  tax
//  shipping
//  quantity
class LineItemRowDisplay extends Component {
  constructor(props){
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleEditClick(e){
    console.log('edit button pressed');
  }

  handleRemoveClick(e){
    console.log('remove button pressed');
  }


  render(){
    return(
       <tr>
          <td>{this.props.index}</td>
          <td>{this.props.name}</td>
          <td>{this.props.id}</td>
          <td>{accounting.formatMoney(this.props.cost)}</td>
          <td>{accounting.formatMoney(this.props.tax)}</td>
          <td>{accounting.formatMoney(this.props.shipping)}</td>
          <td>{this.props.quantity}</td>
          <td><Button onClick={this.handleEditClick}><Glyphicon glyph="edit"/></Button></td>
          <td><Button onClick={this.handleRemoveClick} bsStyle="danger"><Glyphicon glyph="remove"/></Button></td>
       </tr>
      /*

       <tr class="danger">
       <td><span><a class="btn btn-sm btn-danger glyphicon glyphicon-arrow-left"></a></span></td>
       <td><span><input class="description focused form-control" type="text" value="Roasted Chestnut &amp; Cherries 3-Wick Candle"></span></td>
       <td><span><input class="ASIN form-control" type="text" value="111625166"></span></td>
       <td><span><input class="price form-control" type="text" value="8.50"></span></td>
       <td><span></span></td>
       <td><span></span></td>
       <td><span><input class="quantity form-control" type="text" value="2"></span></td>
       <td></td>
       <td><span><a class="btn btn-sm btn-success glyphicon glyphicon-ok-circle"></a></span></td>
       </tr>
       */
    );
  }
}

export default LineItemRowDisplay;