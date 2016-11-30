let request = require('request');
let holidays = [];

request('http://localhost:3000/current_year_holidays', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    holidays = JSON.parse(body);
    holidays = holidays.holidays
  }
});

class HolidaysApi {
  static getAllHolidays() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], holidays));
      }, 1000);
    });
  }

  static callAddHoliday(holiday){
    return new Promise((resolve, reject) => {
      let options = {
        url: "http://localhost:3000/add_holiday/",
        method: 'POST',
        json: holiday
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let new_item = Object.assign({}, {id: body.holiday.id, name: body.holiday.name, date: body.holiday.date});
          resolve(new_item);
        }
      });
    });
  }

  static callDeleteHoliday(holiday_id){
    return new Promise((resolve, reject) => {
      let options = {
        url: "http://localhost:3000/delete_holiday/" + holiday_id,
        method: 'DELETE',
        type: 'json'
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let holiday_id = JSON.parse(body).holiday_id
          resolve(holiday_id);
        }
      });
    });
  }
}
export default HolidaysApi;
