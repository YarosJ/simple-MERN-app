# solv1

Installation
----------------

The first step is to install dependencies:

```sh
$ npm i
```

Then perform build and launch the application:

```sh
DEBUG_COLORS=true DEBUG=app,controllers,auth,acl seedDB=true NODE_ENV=production npm start
```

`NODE_ENV`, `DEBUG_COLORS`, `DEBUG` and `seedDB` is optional parameters

If the application is started for the first time you need set `seedDB=true`

Now you can go to the address: `localhost:3000`

Work application instance: http://solv-express.herokuapp.com/

Admin email: `example@ex.com`

Admin password: `1111111`
