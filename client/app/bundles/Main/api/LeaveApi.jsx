let request = require('request');

class LeaveApi {
  static getLeaveDetails(leave_id) {
    return new Promise((resolve, reject) => {
      let options = {
        url: "http://localhost:3000/sign_offs/" + leave_id,
        method: 'get',
        type: 'json'
      };
      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let leave_details = Object.assign({}, JSON.parse(body));
          resolve(leave_details);
        }
      })
    });
  };
}
export default LeaveApi;
