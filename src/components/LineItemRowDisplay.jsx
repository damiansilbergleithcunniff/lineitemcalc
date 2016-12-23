import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import accounting from 'accounting';

// props:
//  index
//  lineItem
class LineItemRowDisplay extends Component {
  constructor(props){
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
    console.log('edit button pressed');
    if (this.props.onEditClick){
      this.props.onEditClick(this.props.index);
    }
  }

  handleRemove(e){
    console.log('remove button pressed');
    this.props.onRemoveClick(this.props.lineItem);
  }


  render(){
    const index = this.props.index;
    const lineItem = this.props.lineItem;
    return(
       <tr tabIndex={index} onKeyDown={this.handleKeyPress}>
          <td>{index}</td>
          <td>{lineItem.description}</td>
          <td>{lineItem.ASIN}</td>
          <td>{accounting.formatMoney(lineItem.item.cost.price)}</td>
          <td>{accounting.formatMoney(lineItem.item.cost.tax)}</td>
          <td>{accounting.formatMoney(lineItem.item.cost.shipping)}</td>
          <td>{lineItem.quantity}</td>
          <td><Button onClick={this.handleEdit}><Glyphicon glyph="edit"/></Button></td>
          <td><Button onClick={this.handleRemove} bsStyle="danger"><Glyphicon glyph="remove"/></Button></td>
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