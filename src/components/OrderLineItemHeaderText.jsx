/**
 * Created by damian on 12/26/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {Overlay} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';
import * as accounting from 'accounting';

// props:
//  text: the text to display
//  difference: the +/- amount to show over/under for
//  lineItemSubTotal: the sum subtotals of the lineItems
class OrderLineItemHeaderText extends Component {

  constructor(props){
    super(props);
    this.state = this.makeState(this.props.difference);
  }

  // builds the object to track difference in state, you must save to state on your own
  makeState(difference){
    const absDifference = Math.abs(difference);
    const showTooltip = absDifference > .009;
    return {
      difference: difference,
      absDifference: absDifference,
      showTooltip: showTooltip
    };
  }

  // When the props are updated we need to update state
  componentWillReceiveProps(nextProps){
    this.setState(this.makeState(nextProps.difference));
  }

  // On the first mount, we need to locate the target and tooltipcontainer and store them to state
  //  this forces an rerender
  // We have to do this because the dom elements we intend to target don't exist
  // before this component is mounted.  This means we get nulls for the target/container
  // and the tooltip appears in space
  componentDidMount(){
    const target = ReactDOM.findDOMNode(this.refs.tooltipTarget);
    const toolTipContainer = ReactDOM.findDOMNode(this.refs.tooltipContainer);
    this.setState({
      target: target,
      container: toolTipContainer
    })
  }

  renderTooltipOverlay(){
    const difference = this.state.difference;
    const absDifference = this.state.absDifference;
    const show = this.state.showTooltip;
    const container = this.state.container;
    const target = this.state.target;
    return <Overlay placement="right" show={show}
                    container={container}
                    target={target}>
      {this.renderTooltip(difference, absDifference)}
    </Overlay>
  }

  renderTooltip(difference, absDifference){
    const formattedAbsDifference = accounting.formatMoney(absDifference);
    const formattedLineItemSubtotal = accounting.formatMoney(this.props.lineItemSubtotal);
    if(difference < 0) {
      return <Tooltip id="tooltip">Over by: {formattedAbsDifference} (Total: {formattedLineItemSubtotal})</Tooltip>;
    }
    return <Tooltip id="tooltip">Short by: {formattedAbsDifference} (Total: {formattedLineItemSubtotal})</Tooltip>;
  }

  render(){
    return(
      <div ref="tooltipContainer">
        <span ref="tooltipTarget" style={{paddingRight: 20}}>{this.props.text}</span>
        {this.renderTooltipOverlay()}
      </div>
    )
  }
}

export default OrderLineItemHeaderText