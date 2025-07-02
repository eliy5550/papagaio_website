
// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require("mysql2")

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
// app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.use(express.static("./public"))

const config = {
	host: '127.0.0.1',
	user: 'root',
	password: '123456',
	database: 'pta',
};

const connection = mysql.createConnection(config);

app.get("/get_checkpoint_reports", async (req, res) => {
	connection.execute("select * from checkpoints_counter", (e, r) => {
		if (e) {
			return res.status(500).json({ message: "error getting checkpoints counter data", error: e })
		}

		res.status(200).json(r)
	})

})


app.post("/checkpoint_report", (req, res) => {
	if (req.body.user_id == null || req.body.user_id == undefined) {
		res.status(400).json({ message: "missing user_id!" })
	}
	//if exists -> increment
	connection.execute(`select * from checkpoints_counter where user_id ="${req.body.user_id}";`, (e, r) => {
		if (e) return res.status(500).json({ message: "error getting checkpoints counter data", error: e })

		if (r.length >= 1) {
			connection.execute(`update checkpoints_counter set checkpoints = checkpoints+1 where user_id = "${req.body.user_id}";`, (e) => {
				if (e) return res.status(500).json({ message: "error updating checkpoints for user", error: e })
				return res.status(200).json({ message: "checkpoint recorded" })
			})
		}
		//if not -> create
		else {
			connection.execute(`insert into checkpoints_counter (user_id , checkpoints) values ("${req.body.user_id}" , 1);`, (e) => {
				if (e) return res.status(500).json({ message: "error inserting new user", error: e })
				return res.status(200).json({ message: "new user and checkpoint recorded" })
			})

		}
	})
})




app.listen(80, () => {
	setInterval(() => {
		connection.ping() // dont close this connection
	}, 1000 * 60 * 29);
	console.log('HTTP Server running on port 80');
});


try {
	var server = https.createServer({
		key: fs.readFileSync('/etc/letsencrypt/live/papagaiogames.com/privkey.pem'),
		cert: fs.readFileSync('/etc/letsencrypt/live/papagaiogames.com/fullchain.pem')
	}, app)

	server.listen(443, () => {
		console.log('HTTP Server running on port 443');
	});

} catch { }



// httpsServer.listen(443, () => {
// 	console.log('HTTPS Server running on port 443');
// });