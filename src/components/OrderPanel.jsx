import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import CurrencyBox from './CurrencyBox'

// props:
//  order: the order to display
class OrderPanel extends Component{
  constructor(props){
    super(props);

    this.handleShippingChange = this.handleShippingChange.bind(this);
    this.handleSubtotalChange = this.handleSubtotalChange.bind(this);
    this.handleTaxChange = this.handleTaxChange.bind(this);
    this.handleTotalChange = this.handleTotalChange.bind(this);
  }

  handleSubtotalChange(e){
    console.log('subtotal change');
  }
  handleShippingChange(e){
    console.log('shipping change');
  }
  handleTaxChange(e){
    console.log('tax change');
  }
  handleTotalChange(e){
    console.log('total change');
  }


  render(){
    return(
      <Panel header="Order Totals" bsStyle={this.props.bsStyle}>
        <Grid fluid> 
          <Row>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Subtotal"
                           label="Order Subtotal:"
                           value={this.props.order.subtotal}
                           placeholder="Subtotal"
                           onChange={this.props.onSubtotalChange}/>
            </Col>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Shipping"
                           label="Order Shipping:"
                           value={this.props.order.shipping}
                           placeholder="Shipping"
                           onChange={this.props.onShippingChange}/>
            </Col>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Tax"
                           label="Order Tax:"
                           value={this.props.order.tax}
                           placeholder="Tax" onChange={this.props.onTaxChange}/>
            </Col>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Total"
                           label="Order Total:"
                           value={this.props.order.total()}
                           placeholder="Total" onChange={this.handleTotalChange}/>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
}

export default OrderPanel;