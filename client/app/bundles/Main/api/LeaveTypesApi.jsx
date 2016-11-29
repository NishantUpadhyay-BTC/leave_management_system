let request = require('request');
let leave_types = [];

request('http://localhost:3000/sign_off_types', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    leave_types = JSON.parse(body);
    console.log(JSON.parse(body))
    leave_types = leave_types.sign_off_types
  }
});

class LeaveTypesApi {
  static getAllLeaveTypes() {
    return new Promise((resolve, reject) => {
      resolve(Object.assign([], leave_types));
    });
  }

  static callAddLeaveType(sign_off_type){
    return new Promise((resolve, reject) => {
      let options = {
        url: "http://localhost:3000/sign_off_types/",
        method: 'POST',
        json: sign_off_type
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let new_leave_type = Object.assign({}, { id: body.sign_off_type.id, sign_off_type_name: body.sign_off_type.sign_off_type_name, description: body.sign_off_type.description, no_of_days: body.sign_off_type.no_of_days });
          resolve(new_leave_type);
        }
      });
    });
  }

  static callDeleteLeaveType(id){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> + ID " + id)
    return new Promise((resolve, reject) => {
      let options = {
        url: "http://localhost:3000/sign_off_types/" + id,
        method: 'DELETE',
        type: 'json'
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let leave_type_id = JSON.parse(body).leave_type_id
          resolve(leave_type_id);
        }
      });
    });
  }
}
export default LeaveTypesApi;
