const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"test": "my test data"})
})

app.listen(5000, () => {console.log("Sever started on port 5000")})