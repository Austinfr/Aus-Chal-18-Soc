const router = require('express').Router();
//defines the methods gotten from the userController.js file for use in routes
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

//base routes
router.route('/')
  .get(getAllUsers)
  .post(createUser);

//routes for focusing on a specific user
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//route for friend functions
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;