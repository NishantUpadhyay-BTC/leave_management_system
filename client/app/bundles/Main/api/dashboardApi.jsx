let request = require('request');
let leave_requests = {};

request('http://localhost:3000/sign_offs?access_token=17c60fdf5981794bb31f246849ae398e', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    leave_requests = JSON.parse(body);
  }
});

class dashboardApi {
  static getAllRequestByStatus() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], leave_requests));
      }, 1000);
    });
  }
}
export default dashboardApi;
