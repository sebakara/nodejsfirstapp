const knex = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const sendRegistrationEmail = require("../components/email");

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})
const upload = multer({ storage: storage });

// user registration
module.exports.addPerson = async (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err) {
      return res.json({ status: "error", message: err.message });
    }
    const saltRounds = 10;
    let add = {};
    let add_prof = {};

    add.fname = req.body.firstName;
    add.lname = req.body.lastName;
    add.email = req.body.email;
    add.password = bcrypt.hashSync(req.body.password, saltRounds);
    // `national_id`, `gender`, `date_of_birth`, `profile_picture`, `address`, `user_id`
    add_prof.national_id = req.body.nid;
    add_prof.gender = req.body.gender;
    add_prof.date_of_birth = req.body.dob;
    add_prof.profile_picture = 'uploads/'+req.file.filename;
    add_prof.address = req.body.address;
    try {

      // const [user] = await knex
      const [rows] = await knex("users").insert(add);

      add_prof.user_id = rows;
      const profile = await knex("users_profile").insert(add_prof);

      const token = jwt.sign({ id: rows }, 'secret_key');
      sendRegistrationEmail(add.email, token);
      res.json({ status: "success", message: "success", token: token, data:rows});
    } catch (err) {
      console.log(err)
      res.json({ status: "error", message: err.code });
    }
  });
};

    // user login
module.exports.userLogin = async (req,res)=>{
    const mail = req.body.username;
    const pwd = req.body.password;
    const saltRounds = 10;

    knex("users").where("email",mail).then(function(data){

        if(data.length > 0){
            if(data.password !== bcrypt.hashSync(pwd, saltRounds)){
                res.json({
                    message:"invalid password",
                    data: null
                })
            }
            res.json({
                message:"success",
                data: data
            })
        }
        else{
            res.json({
                message:"data not found",
                data: null
            })
        }

    })
// console.log("email is: "+mail+ " and passwoed is:"+pwd);  photogenixstudio
}



// check the jwt
module.exports.authenticate = async(request, response, next) =>{
    const authHeader = request.get("Authorization")


}
