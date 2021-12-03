const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "server/build");

const Gun = require('gun');


let app = express();
app.use(compression());
app.use(Gun.serve)

// You may want to be more aggressive with this caching
app.use(express.static("public", { maxAge: "1h" }));

// Remix fingerprints its assets so we can cache forever
app.use(express.static("public/build", { immutable: true, maxAge: "1y" }));

app.use(morgan("tiny"));
app.all(
  "*",
  MODE === "production"
    ? createRequestHandler({ build: require("./build") })
    : (req, res, next) => {
        purgeRequireCache();
        let build = require("./build");
        return createRequestHandler({ build, mode: MODE })(req, res, next);
      }
);


(function () {
  var cluster = require('cluster');
  if (cluster.isMaster) {
    return (
      cluster.fork() &&
      cluster.on('exit', function () {
        cluster.fork();
      })
    );
  }

  var fs = require('fs');
  var config = { port: 8765 };
  var Gun = require('gun');

  if (process.env.HTTPS_KEY) {
    config.key = fs.readFileSync(process.env.HTTPS_KEY);
    config.cert = fs.readFileSync(process.env.HTTPS_CERT);
    config.server = require('https').createServer(config, Gun.serve(__dirname));
  } else {
    config.server = require('http').createServer(Gun.serve(__dirname));
  }
//TODO workshop a NFS or SAMBA storage option. Especially with Dcker volumes. 

  var gun = Gun({
    web: config.server.listen(8765),
    config,
  });
  console.log('Relay peer >>> ' + 8765 + ' /gun');

  module.exports = gun;
  const listener = app.listen(process.env.PORT || 3369, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });
})();

////////////////////////////////////////////////////////////////////////////////
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (let key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
