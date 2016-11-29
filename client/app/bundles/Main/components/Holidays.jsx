import React, { PropTypes } from 'react';
import HolidayBox from './HolidayBox'
import {bindActionCreators} from 'redux';
import Header from './Header';
import { connect } from 'react-redux'
import * as HolidaysActions from './../actions/HolidaysActions';

class Holidays extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.prepare_holiday = this.prepare_holiday.bind(this);
      this.addHoliday = this.addHoliday.bind(this);
  }

  addHoliday(e){
    e.preventDefault();
    let date = this.refs.holidayDate.value
    let name = this.refs.holidayName.value
    this.props.actions.addHoliday({ name: name, date: date});
    $('.modal').modal('close');
  }

  prepare_holiday(holiday, index){
    return <HolidayBox key={holiday.id} data = {holiday} />
  }

  componentDidMount() {
    $('.modal').modal();
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15,
			container: 'body'
		});
  }

  render(){
    return(
      <div>
      <div className="content">
        <div className="container">
          <div className="whitebg z-depth-2">
            <div className="row">
              <div className="col s12 right-align">
                <a href="#addnewholiday" className="btn-floating red center-align"><span className="fa fa-calendar-plus-o"></span></a>
              </div>
            </div>
            <div className="holiday-list">
              <div className="row">
                { this.props.holidays.map(holiday => this.prepare_holiday(holiday))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="addnewholiday" className="modal holiday-form">
      	<form action="javascript:void(0);">
      		<div className="modal-content">
      			<h5>Add New Holiday</h5>
      			<div className="input-field">
      				<input type="date" name="holidayDate" className="datepicker" placeholder="Select Date" ref="holidayDate"/>
      			</div>
      			<div className="input-field">
      				<textarea id="textarea1" className="materialize-textarea" ref="holidayName"></textarea>
      				<label htmlFor="textarea1">Description</label>
      			</div>
      			<button className="btn-flat blue white-text" type="submit" onClick={this.addHoliday}>
      				Add Holiday
      			</button>
      		</div>
      	</form>
      </div>
    </div>
    );
  }
}

Holidays.propTypes = {
  holidays: PropTypes.array.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(Holidays);
