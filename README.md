This is a *very silly, very small, very simple api*

Built with Node, Express, and sqlite3, also a variety of node_modules

This is a mish-mash of several tutorials I found as a tutorial for learning how to build a node API for work.

This version has 4 working endpoints, that can be accessed via postman or other faux endpoint testers

    http://localhost:5000/api/v1/todos - GET 
    
    http://localhost:5000/api/v1/todos/:id - GET ONE TODO 
    
    http://localhost:5000/api/v1/todos - POST 
    
    http://localhost:5000/api/v1/todos/:id - DELETE

This uses node version 6

to get up and running

Clone down this repo (in a nice little contained repo, I like a workspaces or sandbox folder for all play repos) (git clone "this repo name")
npm install
npm start it uses nodemon to run server
be default it runs on port 5000