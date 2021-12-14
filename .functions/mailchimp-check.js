//dotenv here is only for development purpose, you can set your own env keys inside netlify.
const dotenv = require('dotenv')
//Axios is a promise-based HTTP Client for node.js and the browser.
const axios = require('axios');
// Crypto module is one of the third-party modules that help encrypt or decrypt or hash any data.
// which we want to secure from outside the world.
var crypto = require('crypto');

dotenv.config()
// you can get your listId (Unique id) by going to your lists in ...mailcimp.com/lists then settings
const listId = '247eaff566';
const apiRoot = `https://us20.api.mailchimp.com/3.0/lists/${listId}/members/`;

const handler = async (event) => {
	try {
        // The email recieved from client side.
		const email = event.queryStringParameters.email;
		if (!email) {
			return {
				statusCode: 500,
				body: 'email query paramter required'
			};
		}

		// https://gist.github.com/kitek/1579117
		let emailhash = crypto.createHash('md5').update(email).digest('hex');

		return axios({
				method: 'put',
				url: apiRoot + emailhash,
				data: {
					email_address: email,
					status: 'subscribed',
					merge_fields: {
						tag:'blog'
					}
				},
				auth: {
                    // username can be anything
					'username': 'Moefirst',
                    //password is your API key created from mailchimp > account > Extras > API Keys
					'password': process.env.MC_API_KEY
				}
			}).then(res => {
				return {
					statusCode: 200,
					body: JSON.stringify(res.data)
				}
			})
			.catch(err => {
				console.log('returning from here', err.response.data.detail);
				return {
					statusCode: 500,
					body: JSON.stringify(err.response.data)
				};
			});

	} catch (error) {
		return { statusCode: 500, body: error.toString() }
	}
}

module.exports = { handler }