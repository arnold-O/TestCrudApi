const express = require("express");
const { registeruser, selectAllUsers, getSingleUser, UpdateUser,deleteUser, authUser} = require("../controllers/usersControllers");

const router = express.Router();


router.route("/user").post(registeruser).get(selectAllUsers)
router.route('/user/:id').get(getSingleUser).put(UpdateUser).delete(deleteUser)
// authenticated user


router.route('/user/authuser').post(authUser)






module.exports = router;
