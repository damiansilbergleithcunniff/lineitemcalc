import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import CurrencyBox from './CurrencyBox'

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

    this.handleCancel = this.handleCancel.bind(this);
    this.handleCommit = this.handleCommit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e){
    switch(e.key){
      case 'Enter':
        this.handleCommit(null);
        e.preventDefault();
        break;
      case 'Escape':
        this.handleCancel(null);
        e.preventDefault();
        break;
      default:
        break;
    }
  }

  handleCancel(e){
    console.log('cancel edit');
    this.props.onCancelClick();
  }

  handleCommit(e){
    console.log('commit edit');
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
       <tr className="danger" tabIndex={index} onKeyDown={this.handleKeyPress}>
          <td><Button bsStyle="danger" onClick={this.handleCancel}><Glyphicon glyph="arrow-left"/></Button></td>
          <td><FormControl type="text" value={description} onChange={this.handleNameChange} autoFocus/></td>
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