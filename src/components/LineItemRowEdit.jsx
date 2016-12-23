import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import CurrencyBox from './CurrencyBox'
import * as accounting from 'accounting'

// React Component to edit a lineItem
// props:
//  index: the index in the list of lineItems being displayed
//  lineItem: the line item being edited
//  Events:
//    onCancel(lineItem):
//      fired when the user exits editing without saving
//      lineItem: the original, unedited, lineItem
//    onCommit(lineItem, updateObj):
//      fired when the user commits his changes
//      lineItem: the original, unedited, lineItem
//      updateObj:  an object with the edited fields.  Field names match the lineItem's fields
class LineItemRowEdit extends Component {
  constructor(props){
    super(props);

    // we need to track changes to the price as they happen
    // but we don't want to apply formatting in the ui until
    // the user is done typing
    // to do this we keep the real price out of state
    // and keep a formatted price in state.
    this.price = this.props.lineItem.item.cost.price;

    this.state = {
      description: this.props.lineItem.item.description,
      ASIN: this.props.lineItem.item.ASIN,
      formattedPrice: accounting.toFixed(this.price, 2),
      quantity: this.props.lineItem.quantity,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleCommit = this.handleCommit.bind(this);

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleASINChange = this.handleASINChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleCostBlur = this.handleCostBlur.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleKeyPress(e){
    switch(e.key){
      case 'Enter':
        this.handleCommit();
        e.preventDefault();
        break;
      case 'Escape':
        this.handleCancel();
        e.preventDefault();
        break;
      default:
        break;
    }
  }

  handleCancel(){
    this.props.onCancel(this.props.lineItem);
  }
  handleCommit(){
    this.props.onCommit(this.props.lineItem, {
      description: this.state.description,
      ASIN: this.state.ASIN,
      price: this.price,
      quantity: this.state.quantity,
    });
  }

  handleDescriptionChange(e){
    this.setState({description: e.target.value});
  }
  handleASINChange(e){
    this.setState({ASIN: e.target.value});
  }
  handleCostChange(e){
    // every time somebody changes the price
    // we update the real price
    // This lets us know what the person was typing
    //  even if they commit before leaving the textbox
    // In addition, the currency box manages its own state
    //  so it will re-render itself as the user types
    this.price = e.target.value;
  }
  handleCostBlur(e){
    // If the user has updated the field, then moved to another
    // we want to format the price for correct display
    this.setState({formattedPrice: accounting.toFixed(this.price, 2)});
  }
  handleQuantityChange(e){
    this.setState({quantity: e.target.value});
  }

  render(){
    const index = this.props.index;
    const description = this.state.description;
    const ASIN = this.state.ASIN;
    // for the price to display we use the formatted price
    //  if the user is typing a new price the CurrencyBox will update itself
    const price = this.state.formattedPrice;
    const quantity= this.state.quantity;

    return(
       <tr className="danger" tabIndex={index} onKeyDown={this.handleKeyPress}>
          <td><Button bsStyle="danger" onClick={this.handleCancel}><Glyphicon glyph="arrow-left"/></Button></td>
          <td><FormControl type="text" value={description} onChange={this.handleDescriptionChange} autoFocus/></td>
          <td><FormControl type="text" value={ASIN} onChange={this.handleASINChange} /></td>
          <td><CurrencyBox value={price} onBlur={this.handleCostBlur} onChange={this.handleCostChange} /></td>
          <td></td>
          <td></td>
          <td><FormControl type="text" value={quantity} onChange={this.handleQuantityChange} /></td>
          <td></td>
          <td><Button onClick={this.handleCommit} bsStyle="success"><Glyphicon glyph="ok-circle"/></Button></td>
       </tr>
    );
  }
}

export default LineItemRowEdit;