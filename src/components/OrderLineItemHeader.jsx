import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class OrderLineItemHeader extends Component{
  render(){
    return(
      <Grid fluid>
        <Row>
          <Col md={10}>Order Line Items</Col>
          <Col md={2}><Button bsStyle="success" bsSize="xsmall" onClick={this.props.onAddClick}>Add Line Item</Button></Col>
        </Row>
      </Grid>
    );
  }
}

export default OrderLineItemHeader