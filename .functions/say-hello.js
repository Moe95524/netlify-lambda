exports.handler = async (event, context, callback) => {
	
	return new Promise((resolve, reject) => {

		setTimeout(() => {
			resolve({
				statusCode:200,
				body:"Hello there!"
			});
		}, 2000);

	});

};