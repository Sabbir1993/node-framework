# Custom Node with Express Framework

## System Requirement
    Node v-12 or up
    Mongo DB
## System info
    
### ENV Setup
     -- run this command ' cp .env.example .env ' to get .env file and set all values
     APP_PORT = 
     DB_SERVER = 
     DB_PORT = 
     DB_NAME = 
    
    run project : npm start
    
#### Error Handling :
    Smoothly handled all errors with compile error and write into log (daily base)
    file automatically.
    path : base_dir/logs/*date*_log.log
    
### Features : 

    1. Added default auth system using passport local stretagy.
    if you want to use it then just go to index.js and uncomment 
    these two line of code.
    
    // const AuthModule = require('./vendor/defaultAuth/AuthModule')
    // new AuthModule(app)
    
    and run 
        a. npm i passport
        b. npm i passport-local
    
    2. Default Role permission added on this system.
    For enable this just go vendor > defaultAuth > AuthModule.js and uncomment these lines as your requirement ..
    
        // res.locals.role = await RolePermissionHelper.role(req.session.passport)
        // res.locals.permission = await RolePermissionHelper.permission(req.session.passport)
    
    if you use different auth management then just pass user object as argument for both functions
    
        use permission like 
            <% if(permission.includes('permission_name')){ %>
            ...code
            <% } %>
            
        use role like 
            <% if(role.includes('admin')) { %>
            ...code
            <% } %>
    
    3. If use request file in route then it will automatically validate you request as you define.
        if validation got error then it redirect back with oldData (reqeust body)
        get old data in view :
            <input type="email" name="email" value="<%- oldData.email %>" class="form-control" placeholder="User email">
        
    4. Multilanguage Like laravel ==> 
        in view <%= trans('common.sl') %>
        *common = file name 
        *sl = index
        note : create a folder same as your set app laguage short code and put files inside this
    
    5. Have console support for : 
        a. node express make:contorller UserController 
        b. node express make:request UserRequesr
        c. node express make:model Test
