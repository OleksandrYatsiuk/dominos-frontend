const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/Dominos'));

// Send all requests to index.html
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Dominos/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 4000, (ev) => {
    console.log("\nServer was started on http://localhost:4000")
})