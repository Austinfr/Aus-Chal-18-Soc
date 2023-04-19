const { User, Thought } = require('../models');
//to be used in the routes
module.exports = {
    //gets all the users
    getAllUsers(req, res) {
        User.find({})
            //gets the associated data of thoughts and friends removing the version
            .populate({
                path: 'thoughts friends',
                select: '-__v'
            })
            .select('-__v')
            //sorts descendingly
            .sort({ _id: -1 })
            //returns the users
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //gets a single user specified by query parameters
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            //gets the associated thoughts and friends removing the version
            .populate({
                path: 'thoughts friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                //if can't find a user
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //creates a user based on the request body and returns the created user
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    //updates a user based on the query and body
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(dbUserData => {
                //can't find the user
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                //returns the updated user
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    //delets a user based on the query
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                //deletes the associated thoughts
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            })
            .then(() => {
                res.json({ message: 'User and associated thoughts deleted!' });
            })
            .catch(err => res.status(500).json(err));
    },
    
    //adds a friend specified by the query params of user and friend(user) id
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                //if there's any error
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                //returns the updated user
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },
      
    //removes a friend based on the query of user and friend id
    removeFriend(req, res) {
        User.findOneAndUpdate(
            //find user
            { _id: req.params.userId },
            //removes friend
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                //returns the updated user
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    }
}