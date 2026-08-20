const express = require("express");
const { 
    createUserController,
    updateUserController, 
    deleteUserController,
    getAllUsersController,
    getAllUsersByIdController
} = require("../controllers/userController");


const router = express.Router();

router.post("/create", createUserController);
router.put("/update", updateUserController);
router.delete("/delete", deleteUserController);
router.get("/all", getAllUsersController);
router.post("/id", getAllUsersByIdController);


module.exports = router;