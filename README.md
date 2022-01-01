# Node with Express Custom Framework

## Installation

>Install [node](https://nodejs.org/en/download/) in your system.After finishing installation
open console and clone default project from github.  
```bash
git clone https://github.com/Sabbir1993/node-framework.git
```
```shell script
cd node-framework
npm install
npm start
```

## Used Packages

>Here some package ar users to make this framework user friendly. these packages are :

- **[express](https://expressjs.com/)**
- **[dotenv](https://www.npmjs.com/package/dotenv)**
- **[ejs](https://ejs.co/)**
- **[express-ejs-layouts](https://www.npmjs.com/package/express-ejs-layouts)**
- **[body-parser](https://www.npmjs.com/package/body-parser)**
- **[mongodb](https://www.npmjs.com/package/mongodb)**
- **[mongoose](https://www.npmjs.com/package/mongoose)**
- **[bcypt](https://www.npmjs.com/package/bcrypt)**
- **[express-fileupload](https://www.npmjs.com/package/express-fileupload)**
- **[express-session](https://www.npmjs.com/package/express-session)**
- **[express-validator](https://express-validator.github.io/docs/)**
- **[local-storage](https://www.npmjs.com/package/local-storage)**
- **[connect-flash](https://www.npmjs.com/package/connect-flash)**
- **[uuid](https://www.npmjs.com/package/uuid)**
- **[mysql](https://www.npmjs.com/package/mysql)**

### express
    Fast, unopinionated, minimalist web framework for node.
    
```js
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)
```

### dotenv
    Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
```js
require('dotenv').config()
```

### ejs
    Control flow with <% %>
    Escaped output with <%= %> (escape function configurable)
    Unescaped raw output with <%- %>
    Newline-trim mode ('newline slurping') with -%> ending tag
    Whitespace-trim mode (slurp all whitespace) for control flow with <%_ _%>
    Custom delimiters (e.g. [? ?] instead of <% %>)
    Includes
    Client-side support
    Static caching of intermediate JavaScript
    Static caching of templates
    Complies with the Express view system

### express-ejs-layouts

    Layout support for ejs in express

### body-parser
    Node.js body parsing middleware.
    
    Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
    
    Note As req.body's shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. For example,
    req.body.foo.toString() may fail in multiple ways, for example the foo property may not be there or may not be a string, and toString may not be a function and instead a string or other user input.
    
```js
var bodyParser = require('body-parser')
```

### mongodb

    The official MongoDB driver for Node.js.

### mongoose

    Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

### bcrypt
    A library to help you hash passwords.
```js
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});
```

### express-fileupload

    Simple express middleware for uploading files.
    
```js
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.post('/upload', function(req, res) {
  console.log(req.files.foo); // the uploaded file object
});
```

### local-storage
    
    A simplified localStorage API that just works
    
```js
var ls = require('local-storage');
 
ls.set('foo', 'bar');
 
ls.get('foo');
```

### connect-flash
    
    The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.
    The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.
    
### uuid

    For the creation of RFC4122 UUIDs
    
    Complete - Support for RFC4122 version 1, 3, 4, and 5 UUIDs
    Cross-platform - Support for ...
        -CommonJS, ECMAScript Modules and CDN builds
        -Node 8, 10, 12, 14
        -Chrome, Safari, Firefox, Edge, IE 11 browsers
        -Webpack and rollup.js module bundlers
        -React Native / Expo
    Secure - Cryptographically-strong random values
    Small - Zero-dependency, small footprint, plays nice with "tree shaking" packagers
    CLI - Includes the uuid command line utility
    
```js
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
```

## ENV Setup
```shell script
cp .env.example .env 
```
     APP_PORT = 3000
     DB_SERVER = 'localhost'
     DB_PORT =  27017
     DB_NAME = node
    

## Usage

#### Controller
    Instead of defining all of your request handling logic as closures in your route files, you may wish to organize this behavior using "controller" classes. 
    Controllers can group related request handling logic into a single class. For example, a TodoController class might handle all incoming requests related 
    to todo, including index (list), view(detail), create, store, edit and update todo. By default, controllers are stored in the app/Controllers directory.
```shell script
node express make:controller TodoController
```

```js
// controller code
class TodoController {
    static index = async (req, res) => {
        return res.render('todo')
    }
}

// Route code 
var TodoController = require('./path/TodoController')
router.get('/todos', TodoController.index)
```

#### Model
    
    Here includes an object-relational mapper (ORM) that makes it enjoyable to interact with your Mongo database. 
    When using ORM, each database table has a corresponding "Model" that is used to interact with that table. 
    In addition to retrieving records from the database table, ORM models allow you to insert, update, and 
    delete records from the table as well.To create a model  you may use the make:model NODE CLI command:
    
```shell script
node express make:model User
```
    
```js
// Model code
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

// in controller 
let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: image
        });
newUser.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
        console.log(result)
    }
})
```

#### Mysql Model
    
    Here includes an object-relational mapper (ORM) that makes it enjoyable to interact with your Mysql database. 
    When using ORM, each database table has a corresponding "Model" that is used to interact with that table. 
    In addition to retrieving records from the database table, ORM models allow dynamic conditions like where,selectRaw,whereIn etc...To create a model  you may use the make:mysqlModel NODE CLI command:
    
```shell script
node express make:mysqlModel User
```
    
```js
// Model code
const Model =  require('../../vendor/Orm/Model')

module.exports = class User extends Model{

    constructor(){
        super() /* provide table name here */
    }
}


// in controller 
let data = await new User()
    .where('key', '=', 'value);
    .get() /*for get multiple data*/

let data = await new User()
    .where('key', '=', 'value);
    .first() /*for get single data*/
```

#### Migration

    No need to create specific table into database. just type make:migration to create migration file and add all the column name insde migration file.
    You can also create migration with model with command make:migrationModel

```js
//migration file code
const Migration = require("../../vendor/Migration/Migration");

module.exports = class User {
  up() {
    var schema = new Migration("user");
    return schema
      .id()
      .string("name", 191).notnull()
      .number("msisdn", 11).unique().notnull()
      .end();
  }
};

```

```shell script
node express make:migrationModel User
```

for run migration run 

```shell script
node express make:migrate
```
this will exwcute all the files inside migration folder and create all the tables respective files.


#### Request
    
    For more complex validation scenarios, you may wish to create a "form request". Form requests are custom request 
    classes that encapsulate their own validation and authorization logic. To create a form request class, you may 
    use the make:request NODE CLI command:
    
```shell script
node express make:request RegistrationRequest
```

```js
// Request file code 
const User = require('../models/User')
const {catchErrorAndReturn} = require('../../vendor/helper')
const { check } = require('express-validator')

module.exports = [
    check('name').notEmpty().withMessage('Name field is required'),
    check('password').isLength({min:8}).withMessage('Password minimum length 8'),
    check('password').custom((value, { req }) => {
        if (value !== req.body.confirm_password) {
            return Promise.reject('Password confirmation is incorrect');
        } else {
            return true;
        }
    }),
    check('email').isEmail().withMessage('Email field is required'),
    check('email').custom(value => {
        return User.findOne({email:value}).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    catchErrorAndReturn
]

// Use in Route 

router.post('/registration',RegistrationRequest,LoginController.registrationStore)
```
```ejs

// Old request value in view 

<input type="text" name="name" value="<%- oldData.name %>" class="form-control" placeholder="User name">

// get errors in view

<%if (errors.length > 0) { %>
    <% errors.forEach( error => { %>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Error!</strong> <%= error.msg %>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    <%})%>
<%}%>
```

#### Error Handling :
    Handled all errors (without compile errors) and write into log (daily base)
    file automatically.
    path : base_dir/logs/*date*_log.log
    
#### Logging

    To help you learn more about what's happening within your application, This provides robust logging services 
    that allow you to log messages to files, the system error log.
    path : [project root]/logs/date_log.log
    
```js
// Controller code
const Log = require('../../vendor/Log')
const User = require('../models/User')
class TodoController {
    static index = async (req, res) => {
        let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    image: image
                });
        newUser.save(function(err,result){
            if (err){
                Log.error(err)
            }
            else{
                Log.info(result)
            }
        })
    }
}
```
    
#### Localization

    Here's localization features provide a convenient way to retrieve strings in various languages, allowing you to 
    easily support multiple languages within your application.
    
    Here provides two ways to manage translation strings. First, language strings may be stored in files within the 
    resources/lang directory. Within this directory, there may be subdirectories for each language supported by the 
    application.
    
    /resources
        /lang
            /en
                common.js
            /bn
                common.js

```ejs
// use in view 
<div class="title m-b-md">
    <%= trans('common.project_name') %>
</div>
```
```js
// set localization

var localStorage = require('local-storage');

router.get('/lang/:lang', (req, res, next) => {
   localStorage.set('lang',req.params.lang)
   return res.redirect('back')
})

```

#### Authenticate
    Added default auth system using passport local stretagy.if you want to use it then run these two shell command and
    just go to index.js and uncommentthese two line of code.
    
```shell script
npm i passport
npm i passport-local
```

```js
// const AuthModule = require('./vendor/defaultAuth/AuthModule')
// new AuthModule(app)
```

#### User Role Permission
    
    Default Role permission added on this system. For enable this just go vendor > defaultAuth > AuthModule.js 
    and uncomment these lines as your requirement ..

```js
// res.locals.role = await RolePermissionHelper.role(req.session.passport)
// res.locals.permission = await RolePermissionHelper.permission(req.session.passport)
```
    Uses inside view
```ejs
//use permission in view 
<% if(permission.includes('permission_name')){ %>
...code
<% } %>
        
// use role in view 
<% if(role.includes('admin')) { %>
...code
<% } %>
```

 Uses inside route and controller
 
```js
// use in route

const {userHasRole,userHasPermission} = require('../app/middleware/CheckRolePermission')
router.get('/user/create',[userHasPermission('permission name')],UserController.create)
router.get('/user/create',[userHasRole('role name')],UserController.create)

// use in controller

const {userHasRole,userHasPermission} = require('../app/middleware/CheckRolePermission')
class UserController {
  static create(req, res){
        // role
        if(userHasRole('role name')){
            // code
        } else {
            // code
        }
        // permission
        if(userHasPermission('role name')){
            // code
        } else {
            // code
        }

    }
}
```

#### View Log in html
    import log controller to your web.js and you can browse your log files
```js
//in web.js
const LogController = require('../vendor/logging/LogController')
router.get('/logs', LogController.index)
```

## Hope you will enjoy this. Happy coding 
