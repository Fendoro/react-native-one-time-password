const admin = require('firebase-admin');

module.exports = (req, res) => {
	const { phone, code } = req.body;
	if (!(phone && code)) {
		return res.status(422).send({
			error: 'Phone and code must be provided'
		});
	}
	const correctPhone = String(phone).replace(/[^\d]/g, '');
	const correctCode = parseInt(code);
	admin
		.auth()
		.getUser(correctPhone)
		.then(() => {
			const ref = admin.database().ref(`users/${correctPhone}`);
			ref.on('value', snapshot => {
				ref.off(); //stop listening record changes
				const user = snapshot.val();
				if (!(user.codeValid && user.code === correctCode)) {
					return res.status(422).send({ error: 'Code not valid' });
				}
				ref.update({ codeValid: false });
				admin
					.auth()
					.createCustomToken(correctPhone)
					.then(token => res.send({ token }));
			});
		})
		.catch(error => {
			return res.status(422).send({ error });
		});
};
