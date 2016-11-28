let request = require('request');
let holidays = [];

request('http://localhost:3000/holidays', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    holidays = JSON.parse(body);
    console.log(holidays)
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

  static CallAddHoliday(holiday){
    return new Promise((resolve, reject) => {
      let options = {
        url: "http://localhost:3000/holidays/",
        method: 'POST',
        json: holiday
      };
      console.log(">>> " + options)
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let new_item = Object.assign({}, {id: body.id, name: body.name, date: body.date});
          resolve(new_item);
        }
      });
    });
  }
}
export default HolidaysApi;
