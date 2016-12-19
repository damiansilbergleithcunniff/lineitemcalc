import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import CurrencyBox from './CurrencyBox'
import accounting from 'accounting';

// props:
//  index
//  lineItem
class LineItemRowEdit extends Component {
  constructor(props){
    super(props);

    this.state = {
      description: this.props.lineItem.description,
      ASIN: this.props.lineItem.ASIN,
      price: this.props.lineItem.cost.price(),
      quantity: this.props.lineItem.quantity,
    };

    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleCommit = this.handleCommit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleCancelClick(e){
    console.log('cancel button clicked');
    this.props.onCancelClick();
  }

  handleCommit(e){
    console.log('commit button pressed');
    this.props.onCommitClick(this.props.lineItem.ASIN, {
      description: this.state.description,
      ASIN: this.state.ASIN,
      price: this.state.price,
      quantity: this.state.quantity,
    });
  }

  handleNameChange(e){
    console.log('name changed');
    this.setState({description: e.target.value})
  }
  handleIdChange(e){
    console.log('id changed');
    this.setState({ASIN: e.target.value})
  }
  handleCostChange(e){
    console.log('cost changed');
    this.setState({price: e.target.value})
  }
  handleQuantityChange(e){
    console.log('quantity changed');
    this.setState({quantity: e.target.value})
  }

  render(){
    const index = this.props.index;
    const description = this.state.description;
    const ASIN = this.state.ASIN;
    const price = this.state.price;
    const quantity= this.state.quantity;
    return(
       <tr className="danger">
          <td><Button bsStyle="danger" onClick={this.handleCancelClick}><Glyphicon glyph="arrow-left"/></Button></td>
          <td><FormControl type="text" value={description} onChange={this.handleNameChange} /></td>
          <td><FormControl type="text" value={ASIN} onChange={this.handleIdChange} /></td>
          <td><CurrencyBox value={price} onChange={this.handleCostChange} /></td>
          <td></td>
          <td></td>
          <td><FormControl type="text" value={quantity} onChange={this.handleQuantityChange} /></td>
          <td></td>
          <td><Button onClick={this.handleCommit} bsStyle="success"><Glyphicon glyph="ok-circle"/></Button></td>
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

export default LineItemRowEdit;