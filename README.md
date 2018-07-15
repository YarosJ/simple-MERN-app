# Express.js RESTful/GraphQL React.js SPA.

This is a simple single page application with registration and admin panel that manages access to resources. The resources in this application are recommendations (displayed in the carousel), users and pages of site.

## Navigation:

* [Dependencies](#dependencies)
* [Installation](#installation)
* [Test REST api](#restApi)
* [Test GraphQL api](#graphqlApi)

[Dependencies:](#dependencies)
------------

The application requires `npm` version `6.1.0` or higher,  `node.js` version `10.4.1` or higher, Webpack version `4.5.0`, and MongoDB version `3.6.3`.

[Installation:](#installation)
----------------

The first step is to install dependencies:

```sh
$ npm i
```

Then perform build and launch the application:

```sh
$ DEBUG_COLORS=true DEBUG=app,controllers,auth,acl seedDB=true NODE_ENV=production npm start
```

`NODE_ENV`, `DEBUG_COLORS`, `DEBUG` and `seedDB` is optional parameters

If the application is started for the first time you need set `seedDB=true`

Now you can go to the address: `localhost:3000`

Work application instance: `http://solv-express.herokuapp.com/`

Admin email: `example@ex.com`

Admin password: `1111111`

[Test REST api (the example uses a Postman):](#restApi)
------------

__Full api documentation here: https://yarosj.github.io/solvRestApiDoc__

Api of this application supports the JWT (stateless) and session for authorisation.

Sessions will not be considered because they are not stateless.

For have access to protected resource you need to get JWT:

`http://solv-express.herokuapp.com/login`

```sh
POST /login HTTP/1.1
Host: <Host>
Content-Type: application/json
type: json
Authorization: login
Cache-Control: no-cache
Postman-Token: <Postman token>

{
    "email": "admin@ex.com",
    "password": "1111111"
}
```

The received refresh token should be stored for example in local storage and access token use to access resources. When access token expires, you need to get a new refresh token:

`http://solv-express.herokuapp.com/refresh`

```sh
POST /refresh HTTP/1.1
Host: <Host>
Content-Type: application/json
type: json
Authorization: <Refresh token>
Cache-Control: no-cache
Postman-Token: <Postman token>
```

__Test the api for the resource testimonials:__

- Get all testimonials: `http://solv-express.herokuapp.com/testimonials`

- Create testimonial: `http://solv-express.herokuapp.com/testimonials/`

```sh
POST /testimonials/ HTTP/1.1
Host: <Host>
Authorization: <Access token>
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: <Postman token>

{
    "title": "Test title",
    "body": "Test body",
    "autor": "Test autor",
    "gender": "male"
}
```

- Update testimonial: `http://solv-express.herokuapp.com/testimonials/:id`

```sh
PUT /testimonials/:id HTTP/1.1
Host: <Host>
Authorization: <Access token>
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: <Postman token>

{
    "title": "Updated test title",
    "gender": "female"
}
```

- Delete testimonial: `http://solv-express.herokuapp.com/testimonials/:id`

```sh
DELETE /testimonials/:id HTTP/1.1
Host: <Host>
Authorization: <Access token>
Cache-Control: no-cache
Postman-Token: <Postman token>
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
```

__Test the api for the resource users:__

- Get all users: `http://solv-express.herokuapp.com/users`

```sh
GET /users HTTP/1.1
Host: <Host>
Content-Type: application/json
type: json
Authorization: <Access token>
Cache-Control: no-cache
Postman-Token: <Postman token>
```

- Create user: `http://solv-express.herokuapp.com/users`

```sh
POST /users HTTP/1.1
Host: <Host>
Authorization: <Access token>
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: <Postman token>

{
    "email": "test@ex.com",
    "password": "1111111"
}
```

- Update user: `http://solv-express.herokuapp.com/users/:id`

```sh
PUT /users/:id HTTP/1.1
Host: <Host>
Authorization: <Access token>
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: <Postman token>

{
    "email": "test@ex.com",
    "role": "admin"
}
```

- Delete user: `http://solv-express.herokuapp.com/users/:id`

```sh
DELETE /users/:id HTTP/1.1
Host: <Host>
Authorization: <Access token>
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: <Postman token>
```

__Test the api for the resource roles:__


- Get all roles: `http://solv-express.herokuapp.com/roles`

```sh
GET /roles HTTP/1.1
Host: <Host>
Content-Type: application/json
type: json
Authorization: <Access token>
Cache-Control: no-cache
Postman-Token: <Postman token>
```

- Get role permissions: `http://solv-express.herokuapp.com/roles/:role/permissions`

```sh
GET /roles/:role/permissions HTTP/1.1
Host: <Host>
Content-Type: application/json
type: json
Authorization: <Access token>
Cache-Control: no-cache
Postman-Token: <Postman token>
```

- Create role: `http://solv-express.herokuapp.com/roles`

```sh
POST /roles HTTP/1.1
Host: <Host>
Authorization: <Access token>
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: <Postman token>

{
	"role": "guest",
	"resource": "testResource",
	"permission": ["POST","DELETE"]
}
```

- Delete role resource permission (method): `http://solv-express.herokuapp.com/roles/:role/resources/:resource/permissions/:permission`

```sh
DELETE /roles/:role/resources/:resource/permissions/:permission HTTP/1.1
Host: <Host>
Authorization: <Access token>
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: <Postman token>
```

[Test GraphQL api:](#graphqlApi)
------------

__Full api documentation here: https://yarosj.github.io/solvGraphQLApiDoc__

GraphQl api of this application supports the same as rest jwt authorization.

__The graphQL schema is shown below:__

- Queries:

    User(id: ID!): User
    
        User {
            _id: ID!
            email: String
            password: String
            role: String
            createdAt: String
        }
    
    Users: [User]
    
        User {
            _id: ID!
            email: String
            password: String
            role: String
            createdAt: String
        }
    
    Testimonial(id: ID!): Testimonial
    
        Testimonial {
            _id: ID!
            title: String
            body: String
            gender: String
            autor: String
        }
    
    Testimonials: [Testimonial]
    
        Testimonial {
            _id: ID!
            title: String
            body: String
            gender: String
            autor: String
        }
    
    Roles: [Role]
    
        Role {
            role: String
            resources: JSON
        }
    
    Role(role: String!): Role
    
        Role {
            role: String
            resources: JSON
        }

- Mutations:

    addUser(data: UserInput!): User

        UserInput {
            email: String
            password: String
            role: String
            createdAt: String
        }
    
        User {
            _id: ID!
            email: String
            password: String
            role: String
            createdAt: String
        }
    
    removeUser(id: ID!): User
   
        User {
            _id: ID!
            email: String
            password: String
            role: String
            createdAt: String
        }
        
    updateUser(id: ID! data: UserInput!): User
    
        UserInput {
            email: String
            password: String
            role: String
            createdAt: String
        }
    
        User {
            _id: ID!
            email: String
            password: String
            role: String
            createdAt: String
        }
    
    addTestimonial(data: TestimonialInput!): Testimonial
    
        TestimonialInput {
            title: String
            body: String
            gender: String
            autor: String
        }
    
        Testimonial {
            _id: ID!
            title: String
            body: String
            gender: String
            autor: String
        }
    
    removeTestimonial(id: ID!): Testimonial
    
        Testimonial {
            _id: ID!
            title: String
            body: String
            gender: String
            autor: String
        }
    
    updateTestimonial(id: ID! data: TestimonialInput!): Testimonial
    
        TestimonialInput {
            title: String
            body: String
            gender: String
            autor: String
        }
    
        Testimonial {
            _id: ID!
            title: String
            body: String
            gender: String
            autor: String
        }
    
    addPermissions(data: RoleInput!): Role
    
        RoleInput {
            role: String!
            resources: [String]
            permissions: [String]
        }
    
        Role {
            role: String
            resources: JSON
        }
    
    removePermissions(role: String! permissions: [String]! resources: [String]): Role
    
        Role {
            role: String
            resources: JSON
        }
    
    newToken(data: AuthenticationInput!): Authentication
    
        AuthenticationInput {
            email: String
            password: String
            refreshToken: String
        }
    
        Authentication {
            accessToken: String
            refreshToken: String
        }
    
    refreshToken(refreshToken: String!): Authentication
    
        Authentication {
            accessToken: String
            refreshToken: String
        }

## License

MIT License. Copyright 2018 Yaroslaw Zhuk

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
