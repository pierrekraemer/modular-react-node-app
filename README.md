# modular-react-node-app
A starting kit for a modular Web application using [React](https://facebook.github.io/react/) + [Redux](http://redux.js.org/) with [webpack](http://webpack.github.io/) for client side and [Node.js](https://nodejs.org/) + [Express](http://expressjs.com/) + [Sequelize](http://sequelizejs.com/
) for server side.

Code structure
--------------

### Client side

The client code is organized using es6 modules.

Build & watch tasks are provided through npm scripts.

```
client/
  |-src/
  |  |-index.html                --> main html structure
  |  |-index.js                  --> redux store creation + main react renderDOM call
  |  |-app.js                    --> root component
  |  |-nav/
  |  |  |-navbar.js              --> navbar component
  |  |  |-...
  |  |-todolist/
  |  |  |-actions.js             --> actions of the todolist app
  |  |  |-reducer.js             --> reducer of the todolist app
  |  |  |-app.js                 --> main component of the todolist app
  |  |  |-todo_list.js           --> todo list component
  |  |  |-...                    --> other components
  |  |-user/
  |  |  |-actions.js             --> actions of the user management
  |  |  |-reducer.js             --> reducer of the user management
  |  |  |-signin.js              --> signin component
  |  |  |-...                    --> other components
  |  |-...
  |-package.json                 --> description of dependencies + build & watch scripts
  |-webpack.config.js            --> webpack config file
```

### Server side

The server code is organized as follows:

```
server/
  |-server.js          --> main server file
  |-config/            --> config
  |  |-...
  |-controllers/       --> controllers
  |  |-user.js
  |  |-...
  |-models/            --> models
  |  |-index.js
  |  |-user.js
  |  |-...
  |-routes/            --> routes
  |  |-index.js
  |  |-user.js
  |  |-...
  |-services/          --> services
  |  |-...
  |-package.json       --> description of dependencies
```

Deployment
----------

### Client side

```sh
cd client
npm install
npm run build
```

The build task creates a "client/public/" directory which will be served statically by the server.
This directory is organized as follows:
```
public/
  |-js/
  |  |-bundle.js     --> js file built by webpack
  |-index.html       --> main html file
```

### Server side

```sh
cd server
npm install
node server.js
```
