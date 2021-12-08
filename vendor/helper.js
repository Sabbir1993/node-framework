const User = require("../app/models/UserMongo");
const { validationResult } = require("express-validator");
const Log = require("./Log");
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
const database = require("../config/database");

exports.uploadfile = (file, path = null) => {
  let sampleFile = file;
  let name = uuidv4() + Date.now() + file.name;
  sampleFile.mv(
    path ? `public/uploads/${path}/${name}` : `public/uploads/${name}`,
    function (err) {
      if (err) {
        Log.error(err);
        throw err;
      }
    }
  );
  return path ? `/${path}/${name}` : `/${name}`;
};

exports.role = async (val) => {
  roles = null;
  if (process.env.DB_DRIVER.toLowerCase() === "mongo") {
    if (val && val.user) {
      await User.findById(val.user._id)
        .populate({
          path: "role",
          select: "-_id name",
        })
        .then((user) => {
          roles = user.role?.name;
        });
    }
  }
  return roles;
};

exports.permission = async (val) => {
  permissions = [];
  if (process.env.DB_DRIVER.toLowerCase() === "mongo") {
    if (val && val.user) {
      await User.findById(val.user._id)
        .populate({
          path: "role",
          populate: {
            path: "permissions",
            select: "-_id name",
          },
        })
        .then((user) => {
          if (user.role?.permissions?.length > 0) {
            user.role.permissions.map((permission) => {
              permissions.push(permission.name);
            });
          }
        });
    }
  }
  return permissions;
};

exports.catchErrorAndReturn = (req, res, next) => {
  const errors = validationResult(req);
  const oldData = req.body;
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    req.flash("oldData", oldData);
    return res.redirect("back");
  } else {
    next();
  }
};

exports.sqlResult = (query) => {
  if(global.mysql.state === 'disconnected'){
    global.mysql = mysql.createConnection(database.mysql);
    global.mysql.connect(function(err) {
      if (err) {
        global.next(err)
      }
      Log.debug('connected as id ' + global.mysql.threadId)
    });
  }
  return new Promise((resolve, reject) => {
    global.mysql.query(query, function (error, results, fields) {
      if (process.env.QUERY_LOG) {
        Log.info(`SQL Query ===> ${query}`)
      }
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

exports.sqlResultForMigration = (query) => {
  var mysqli = mysql.createConnection(database.mysql);
  mysqli.connect();
  return new Promise((resolve, reject) => {
    mysqli.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
        // mysqli.end();
      }
      resolve(results);
      // mysqli.end();
    });
  });
};
