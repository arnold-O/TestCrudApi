const express = require("express");
const { registeruser, selectAllUsers, getSingleUser, UpdateUser,deleteUser, authUser} = require("../controllers/usersControllers");

const router = express.Router();


router.route("/").post(registeruser).get(selectAllUsers)
router.route('/:id').get(getSingleUser).put(UpdateUser).delete(deleteUser)
// authenticated user


router.route('/authuser').post(authUser)






module.exports = router;
