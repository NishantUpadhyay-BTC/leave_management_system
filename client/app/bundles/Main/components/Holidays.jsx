import React, { PropTypes } from 'react';
import HolidayBox from './HolidayBox'
import Header from './Header';
export default class Holidays extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.prepare_holiday = this.prepare_holiday.bind(this);
      this.addHoliday = this.addHoliday.bind(this);
      this.getHolidays = this.getHolidays.bind(this);
  }

  getHolidays(e){
    e.preventDefault();
    return $.ajax({
      url: "/holidays",
      dataType: 'json',
      method: "get",
      data: {access_token: '17c60fdf5981794bb31f246849ae398e'},
    success: function(data){
      console.log(data)
      }.bind(this)
    });
  }

  addHoliday(e){
    e.preventDefault();
    return $.ajax({
      url: "/holidays",
      dataType: 'json',
      method: "post",
      data: {access_token: '17c60fdf5981794bb31f246849ae398e', holiday: { date: "26/11/1992", name: "diwali holiday"}},
    success: function(data){
      console.log(data)
    }.bind(this)
  });
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
      			<button className="btn-flat blue white-text" type="submit" onClick={this.addHoliday}>
      				Add Holiday
      			</button>
            <button className="btn-flat blue white-text" type="submit" onClick={this.getHolidays}>
      				Get Holiday List
      			</button>
      		</div>
      	</form>
      </div>
    </div>
    );
  }}
