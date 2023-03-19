const express = require("express");
const db = require("./database/db");
require("dotenv").config()

const app = express();


app.use(require("./routes/router"));

app.get("/",function(req,res){
    res.send("<p>Welcome mavin to the node app </p>");
})

app.get("/about",function(req,res){
    res.send("<p> hey mavin, this is about page</p>");
})

const port = process.env.PORT



Promise.all([
    db.raw('SELECT VERSION()'), 
    app.listen(port)])
.then(([dbResult])=> {
    console.log(`Server running on port ${port} and db connected to mysql ${dbResult[0][0]["VERSION()"]}`)
})
.catch((err) => console.log(err))

