const axios = require('axios');

exports.handler = (event, context, callback) => {
  // Here we'll use Axios to get a remote resource

    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(res.data),
        });
    })
    .catch((err) => {
        callback("the error is " + err);
    });
};