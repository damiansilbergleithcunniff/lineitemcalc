import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import CurrencyBox from './CurrencyBox'

class OrderPanel extends Component{
  constructor(props){
    super(props);

    this.handleShippingChange = this.handleShippingChange.bind(this);
    this.handleSubtotalChange = this.handleSubtotalChange.bind(this);
    this.handleTaxChange = this.handleTaxChange.bind(this);
    this.handleTotalChange = this.handleTotalChange.bind(this);
  }

  handleSubtotalChange(e){

  }
  handleShippingChange(e){

  }
  handleTaxChange(e){

  }
  handleTotalChange(e){

  }


  render(){
    return(
      <Panel header="Order Totals" bsStyle={this.props.bsStyle}>
        <Grid>
          <Row>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Subtotal"
                           label="Order Subtotal:"
                           value="123"
                           placeholder="Subtotal"
                           onChange={this.handleSubtotalChange}/>
            </Col>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Shipping"
                           label="Order Shipping:"
                           value="123"
                           placeholder="Shipping"
                           onChange={this.handleShippingChange}/>
            </Col>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Tax"
                           label="Order Tax:"
                           value="123"
                           placeholder="Tax" onChange={this.handleTaxChange}/>
            </Col>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Total"
                           label="Order Total:"
                           value="123"
                           placeholder="Total" onChange={this.handleTotalChange}/>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
}

export default OrderPanel;