let request = require('request');

class profileApi {
  static fetchUserProfile(user_id) {
    return new Promise((resolve, reject) => {
      let options = {
        url: "http://localhost:3000/profiles/" + user_id + "?access_token=" + localStorage.getItem('accessToken'),
        method: 'get'
      };
      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let profile = Object.assign({}, JSON.parse(body));
          resolve(profile);
        }
      })
    });
  };
}
export default profileApi;
