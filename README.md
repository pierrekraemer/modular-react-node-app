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
  |  |-index.html            --> main html structure
  |  |-index.js              --> redux store creation + main react renderDOM call
  |  |-components            --> react components definitions
  |  |  |-app.js             --> root component
  |  |  |-nav/
  |  |  |  |-navbar.js       --> navbar component
  |  |  |  |-...
  |  |  |-todolist/
  |  |  |  |-index.js        --> main component of the todolist app
  |  |  |  |-todo_list.js    --> todo list component
  |  |  |  |-...             --> other components
  |  |  |-user/
  |  |  |  |-signin.js       --> signin component
  |  |  |  |-...             --> other components
  |  |  |-...
  |  |-actions               --> redux action definitions
  |  |  |-user.js
  |  |  |-todolist.js
  |  |  |-...
  |  |-reducers              --> redux reducers definitions
  |  |  |-index.js           --> root reducer definition
  |  |  |-user.js
  |  |  |-todolist.js
  |  |  |-...
  |-package.json             --> description of dependencies + build & watch scripts
  |-webpack.config.js        --> webpack config file
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
  |-models/            --> models definition
  |  |-index.js
  |  |-user.js
  |  |-...
  |-routes/            --> routes description
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

The configuration of the database connection is done in `server/models/index.js`.

```sh
cd server
npm install
node server.js
```
