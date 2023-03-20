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
    add.fname = req.body.firstName;
    add.lname = req.body.lastName;
    add.email = req.body.email;
    add.address = req.body.address;
    add.password = bcrypt.hashSync(req.body.password, saltRounds);
    add.profile_picture = 'uploads/'+req.file.filename;

    try {
      const rows = await knex("users")
        .insert(add)
        .returning('*');
      const user = rows[0];
      const token = jwt.sign({ id: user.id }, 'secret_key');
      sendRegistrationEmail(add.email, token);
      res.json({ status: "success", message: "success", token: token});
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
