import React, { PropTypes } from 'react';
import HolidayBox from './HolidayBox'
export default class Holidays extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.prepare_holiday = this.prepare_holiday.bind(this);
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
    let data = [
      {id: 1, name: 'abc', date: '11/12/2017'},
      {id: 2, name: 'def', date: '1/12/2017'}
    ]
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
              { data.map(holiday => this.prepare_holiday(holiday))}
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
      				<input type="date" name="holidayDate" className="datepicker" placeholder="Select Date" />
      			</div>
      			<div className="input-field">
      				<textarea id="textarea1" className="materialize-textarea"></textarea>
      				<label htmlFor="textarea1">Description</label>
      			</div>
      			<button className="btn-flat blue white-text" type="submit">
      				Add Holiday
      			</button>
      		</div>
      	</form>
      </div>
    </div>
    );
  }}
