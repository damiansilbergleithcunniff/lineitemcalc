import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import accounting from 'accounting';

// React Component to display a lineItem
// Events:
//  onEditRequest(index):
//      Raised when a request is made to edit this row.
//      index: The index of the row is passed to the callback
//  onRemoveRequest(lineItem)
//      Raised when a request is made to remove this row.
//      lineItem: The lineItem to remove from the set
// props:
//  index: the index of the lineItem being displayed
//  lineItem: the lineItem being displayed
//  canRemove: true if the lineItem can be removed
//  canEdit: true if the lineItem can be edited
class LineItemRowDisplay extends Component {
  constructor(props){
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleKeyPress(e){
    switch(e.key){
      case 'Enter':
        this.handleEdit(null);
        e.preventDefault();
        break;
      case 'x':
        if (e.ctrlKey || e.metaKey || e.altKey){
          this.handleRemove(null);
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  }

  handleEdit(e){
    if (this.props.onEditRequest){
      this.props.onEditRequest(this.props.index);
    }
  }
  handleRemove(e){
    if (this.props.onEditRequest) {
      this.props.onRemoveRequest(this.props.lineItem);
    }
  }

  render(){
    const index = this.props.index;
    const lineItem = this.props.lineItem;
    const price = accounting.formatMoney(lineItem.item.cost.price);
    const tax = accounting.formatMoney(lineItem.item.cost.tax);
    const shipping = accounting.formatMoney(lineItem.item.cost.shipping);
    const quantity = lineItem.quantity;
    return(
       <tr tabIndex={index} onKeyDown={this.handleKeyPress}>
         <td>{index}</td>
         <td>{lineItem.description}</td>
         <td>{lineItem.ASIN}</td>
         <td>{price}</td>
         <td>{shipping}</td>
         <td>{tax}</td>
         <td>{quantity}</td>
         <td><Button onClick={this.handleEdit} disabled={!this.props.canEdit}><Glyphicon glyph="edit"/></Button></td>
         <td><Button onClick={this.handleRemove} disabled={!this.props.canRemove} bsStyle="danger"><Glyphicon glyph="remove"/></Button></td>
       </tr>
    );
  }
}

export default LineItemRowDisplay;