import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as HolidaysActions from './../actions/HolidaysActions';

class HolidayBox extends React.Component {
  constructor(props,context){
    super(props,context);
    this.deleteHoliday = this.deleteHoliday.bind(this);
  }

  deleteHoliday(){
    this.props.actions.deleteHoliday(this.props.data.id);
  }

  render() {
    return(
      <div className="col m4">
        <div className="holiday-box">
          <h5>{this.props.data.name}</h5>
          <div className="date">{this.props.data.date}</div>
          <div className="action">
            <a href="#editholiday" className="btn-flat blue waves-effect waves-light"><span className="fa fa-pencil"></span></a>
            <a href="#" onClick={this.deleteHoliday} className="btn-flat red waves-effect waves-light"><span className="fa fa-trash"></span></a>
          </div>
        </div>
      </div>
    )
  }
}

HolidayBox.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  return {
      holidays: state.holidays
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(HolidaysActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HolidayBox);
