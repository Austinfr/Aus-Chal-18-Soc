const { Thought, User, Reaction } = require('../models');

//to be used in another file
module.exports = {
    //getting every thought in the database
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            //removes the version from the results
            .select('-__v')
            //sorts descending so most recent first
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //gets a thought specified by the paramas id field
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                //if we can't find anything we send an error
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //method to handle and upload a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                //after creating the thought we get the id and update the user associated with the thought
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                //if for some reason we can't find the user we send an error
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json({ message: 'Thought created successfully!' });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //updates a thought by finding it's id and taking in the new request body as it's update
    updateThought(req, res) {
        Thought.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true }
            )
            .then(dbThoughtData => {
                //if we can't find it
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //deletes a thought that's specified in the request parameters
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(deletedThought => {
                //if not found maybe already deleted
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                //updates the user so that it doesn't keep the associated thought
                return User.findOneAndUpdate(
                    { username: deletedThought.username },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                //if there's some error with the user
                if (!dbUserData) {
                    res.status(404).json({ message: 'Thought removed, but no user found with this id!' });
                    return;
                }
                res.json({message: "Thought deleted successfully"});
            })
            .catch(err => res.status(400).json(err));
    },

    //creates a reaction based on the body input
    createReaction(req, res) {
        Reaction.create(req.body)
            .then(({ _id }) => {
                //updates the corresponding thought so they're associated
                return Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $push: { reactions: _id } },
                    { new: true }
                  );
            })
            .then(dbThoughtData => {
                //if try to react to a thought that doesn't exist
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json({message: "Reaction successfully created"});
            })
            .catch((err) => res.json(err));
      },
    
    //deletes a reaction based on the query giving the thought and reaction id
    deleteReaction(req, res) {
        Reaction.findOneAndDelete({ _id: req.params.reactionId })
            .then(deletedReaction => {
                //when trying to delete a reaction that doesn't exist
                if (!deletedReaction) {
                    return res.status(404).json({ message: 'No reaction with this id!' });
                }
                //updates the thought as well so it isn't associated with a non-existant thought
                return Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: req.params.reactionId } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                //If there's an error finding the thought or updating it
                if(!dbThoughtData){
                    res.status(404).json({ message: 'Reaction removed, but no thought found with this id!' });
                    return;
                }
                res.json({message: "Reaction successfully deleted"});
            })
            .catch((err) => res.json(err));
    }
}