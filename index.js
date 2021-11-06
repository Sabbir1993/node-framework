require("dotenv").config();
var express = require("express");
const { ErrorHandle } = require("./vendor/ErrorHandler");
const fileUpload = require("express-fileupload");
const SystemHelper = require("./vendor/SystemHelper");
const Grapsql = require('./vendor/Graphql/graphhql')
// define app
var app = express();

new SystemHelper(app, express);
new Grapsql(app)

app.use(fileUpload());

// Enable auth default module
// const AuthModule = require('./vendor/defaultAuth/AuthModule')
// new AuthModule(app)

// define routes
var web = require("./routes/web");
var api = require("./routes/api");

app.use("/", web);
app.use("/api", api);

// GET 404 & send to error handler
app.get((req, res, next) => {
    // ============== for api =================
    // res.send(setResponse(null,'failed', 404, ['url not found']))
    // ============== for view ================
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(ErrorHandle);

// set file upload size
app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  })
);

// define http server
var port = process.env.APP_PORT || 3000;
app.listen(port, function () {
  console.log(`Server stated on port : ${port}`);
});
