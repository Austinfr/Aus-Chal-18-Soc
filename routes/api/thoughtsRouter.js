const router = require('express').Router();
//defines the methods gotten from thoughtController.js to be used by the router depending on the route
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

//base route
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

//routes that focus on a specific thought
router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

//route for creating a reaction
router.route('/:thoughtId/reactions')
  .post(createReaction);

//route for deleting a reaction
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;