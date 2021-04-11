# Custom Node with Express Framework

## System Requirement
    Node v-12 or up
## System info
    
#### Error Handling :
    Smoothly handled all errors like 401, 404, 500 etc
    run this command ' cp .env.example .env ' to get .env file
#### Default Auth :
    1. Added default auth system using passport local stretagy.
    if you want to use it then just go to index.js and uncomment 
    these two line of code.
    
    // var authRoutes = require('./app/common/defaultAuth/authRoutes')
    // app.use('/', authRoutes)
    
### Role Permission Management : 
    
    1. Default Role permission added on this system.
    For enable this just go index.js and uncomment these lines as your requirement ..
    
        // res.locals.role = await RolePermissionHelper.role(req.session.passport)
        // res.locals.permission = await RolePermissionHelper.permission(req.session.passport)
    
    if you use different auth management then just pass user bject as argument for both functions
    
        use permission like 
            <% if(permission.includes('permission_name')){ %>
            ...code
            <% } %>
            
        use role like 
            <% if(role.includes('admin')) { %>
            ...code
            <% } %>
    
### Manage Request
    1. After validation failed ==>
        controller code :
            if (!errors.isEmpty()) {
                req.flash('errors',errors.array())
                req.flash('oldData',oldData)
                res.redirect('back');
            }
        view code :
            <input type="email" name="email" value="<%- oldData.email %>" class="form-control" placeholder="User email">
        
        it will return previous from data in oldData global variable
    2. Multilanguage Like laravel ==> 
        in view <%= trans('common.sl') %>
        *common = file name 
        *sl = index
        note : create a folder same as your set app laguage short code and put files inside this
