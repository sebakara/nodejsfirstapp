let express = require("express");
let router = express.Router();
const bodyParser = require("body-parser");
const {
  addPerson,
//   updatePerson,
//   getPerson,
//   addPersonFavourite,
//   getPersonWithFavourite,
} = require("../controllers/user.controller");
// const {profilePic,imageName,pic} = require("../controllers/profile.controller")
// router.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
router.use(express.json());

router.post("/user", addPerson);
// router.patch("/person/:personId", updatePerson);
// router.get("/person/:personId", getPerson);
// router.post("/favourite", addPersonFavourite);
// router.get("/favourite/:personId", getPersonWithFavourite);

// router.post("/profile/:personId",imageName,profilePic)

// router.get("/profile/:personId",pic)
module.exports = router;