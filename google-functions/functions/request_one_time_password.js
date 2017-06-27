const admin = require('firebase-admin');
const twilio = require('./twilio');
const twilioAccount = require('./twilio_account.json');

module.exports = (req, res) => {
	if (!req.body.phone) {
		return res
			.status(422)
			.send({ error: 'You must provide a phone number' });
	}
	const phone = String(req.body.phone).replace(/[^\d]/g, '');
	admin
		.auth()
		.getUser(phone)
		.then(userRecord => {
			const code = Math.floor(Math.random() * 8999 + 1000);
			twilio.messages.create(
				{
					body: `Your code is ${code}`,
					to: phone,
					from: twilioAccount.phone
				},
				error => {
					admin
						.database()
						.ref(`users/${phone}`)
						.update({ code, codeValid: true }, () => {
							res.send({
								success: true,
								twilioError: error
							});
						});
				}
			);
		})
		.catch(error => {
			return res.status(422).send({ error });
		});
};
