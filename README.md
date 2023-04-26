# Austin Week 18 Challenge Social Network

## Description

This project demonstrates understanding of mongodb using mongoose to provide the models and database in a MVC setup by creating a simple social network between created users and thoughts which a user can react to or add friends. It completely focuses on backend and interaction that can be done through insomnia or another program that can make api calls

## TOC/Links

- [Goal](#goal)
- [Installation](#installation)
- [Usage](#usage)
- [Video guide](#video)
- [Contribution](#contribution)
- [Testing](#testing)
- [License](#license)
- [Questions](#questions)

## Goal

The goal is to create a base social media so that I can display understanding of routes and models and how they can interact within a mongodb

## Installation

You will need a compiler with express installed and insomnia or another api calling program

## Usage

After running npm install you can load up insomnia and based on the routes which are explaned later in the video can test out functionality
All the routes should be run through localhost:3001/api as the base url
- Thought routes /thoughts
    - '/' base route
        - get will return all the thoughts in the database
        - post will create a new thought with a body such as 
        ```
        {
            "thoughtText": "I like crackers",
            "username": "fred",
            "userId": "6440c539d8cf609843255ef4"
        }
        ```
    - '/:id' deals with specific thoughts
        - get will return the specific thought given in the :id parameter
        - put will update a specific thought found by the :id and updated by the request body
        - delete will remove that specific thought from the database
    - '/:thoughtId/reactions' deals with reations for a thought
        - post will create the reation attached to the thought given by :thoughtId in the parameter
    - '/:thoughtId/reactions/:reactionId'
        - delete will delete the specific reation given by the :reationId param on the thought given by the :thoughtId param

- User routes /users
    - '/' base route
        - get will return all the users in the database
        - post will create a new user based on the body provided. It will look something like this:
        ```
        {
            "username": "fred",
            "email": "fred46@gmail.com"
        }
        ```
    - '/:id' deals with specific users
        - get will return the user that is specified by the :id param
        - put will update that specific user based on the body that's given
        - delete will remove that specific user from the database
    - '/:userId/friends/:friendId'
        - post will update the user's friend list given by :userId and add a user as a friend given by :friendId
        - delete will remove a friend from the user's friends list

## Video

Here is a link for a video walkthrough:
- [Week 18 challenge](https://drive.google.com/file/d/125hz9NzG-VXHtbgJbQ2Iz7_hRig_0ImG/view?usp=share_link)

## Testing

Running insomnia and testing routes, making sure the user fields are accounted for and that thoughts and reactions are successfully stored

## License

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)


## Questions

If there are any questions you can contact me at wustinah20@gmail.com or refer to https://github.com/austinfr 
