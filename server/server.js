require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// static user details
const userData = {
    userId: "1",
    password: "1234",
    username: "cuddlysword",
    email: "cuddlysword@gmail.com",
    isAdmin: true
}

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// middleware that checks if JWT token exists and verifies it if it does
// In all future toutes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next();

    token = token.replace('Bearer', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user; // set the usr to req so other routes can use it
            next();
        }
    });
});


// request handlers
app.get("/", (req, res) => {
    if(!req.user) return res.status(401).json({ success: false, message: "Invalid user to access it."});
    res.send('Welcome to my site ' + req.user.name);
})

// validate user credentials
app.post('users/signin', function(req, res) {
    const user = req.body.username;
    const pwd = req.body.password;

    // return 400 status is username/password dont exist
    if (!user || !pwd) {
        return res.status(400).json({
            error: true,
            message: "Username or Password is required."
        })
    }

    // return 401 status if the credential is not a match
    if (user !== userData.username || pwd !== userData.password) {
        return res.status(401).json({
            error: true,
            message: "Username or Password is wrong."
        })
    }

    // generate token
    const token = utils.generateToken(userData);
    // get basic user details
    const userObj = utils.getCleanUser(userData);
    // return the token along with the user details
    return res.json({ user: userObj, token });

})

// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res){
    
    // check header or url parameters or post parameter for token
    var token = req.query.token;
    if (!token){
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }

    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
        });

        // return 401 status if the userId does not match
        if (user.usreId !== userData.userId){
            return res.status(401).json({
                error: true,
                message: "Invalid  user."
            });
        }

        // get basic user details
        var userObj = utils.getCleanUser(userData);
        return res.json({ user: userObj, token })
    });
});

app.listen(port, () => {
    console.log("Sever started on port 5000");
})