let request = require('request');

class authApi {
  static loginUser(email, password) {
    return new Promise((resolve, reject) => {
      let options = {
        url: "http://localhost:3000/users/sign_in",
        method: 'post',
        json: {
          user: {
            email: email,
            password: password
          }
        }
      };
      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let userData = Object.assign({}, body.user);
          resolve(userData);
        }
      })
    });
  };
}
export default authApi;
