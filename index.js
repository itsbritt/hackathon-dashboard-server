const express = require('express');
const cors = require('cors');

const port = 4000;

const app = express();
app.use(express.static('public'));
app.use(cors());

app.get('/', async (req, res) => {
	// res.send('Hello World!');
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');

	const payload = await subscriptionResponse(req);
	res.send(payload);
	console.log('response should have been sent:', payload);
});

app.listen(process.env.PORT || port, () => {
	console.log(`Express server is listening...`);
});

function subscriptionResponse(req) {
	let payload = {};
	console.log('Validating new subscription…');
	console.log('Executing Webhook endpoint…');
	if (req.query.validationToken) {
		console.log('Validating new subscription…');
		console.log('Validation token: ', req.query.validationToken);
		console.log(req.query.validationToken);
		// res.set({ 'Content-Type': 'text/plain' })
		payload = { headers: { 'Content-Type': 'text/plain' }, body: req.query.validationToken };
	} else {
		console.log('Received new notification…');
		console.log('Notification: ');
		console.log(JSON.stringify(req.body));
		payload = { body: '' };
		return payload;
	}
}
