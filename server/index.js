const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "server/build");

const Gun = require('gun');
const SEA = require('gun/sea');

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

const peers = process.env.PEERS

let port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

const {pub, priv, epub, epriv} = SEA.pair().then((pair) => {
  console.log(
    '\nAdd this to .dotenv file:'
  );
  console.log(`PUBLIC_KEY=${JSON.stringify(pair.pub)}`);
  console.log(`PRIVATE_KEY=${JSON.stringify(pair.priv)}`);
  console.log(`EPUBLIC_KEY=${JSON.stringify(pair.epub)}`);
  console.log(`EPRIVATE_KEY=${JSON.stringify(pair.epriv)}`);
  // Return these to return them to the env with an fs call
  return [pair.pub, pair.priv , pair.epub, pair.epriv]
});

Gun({ web: server })


// create profile space under the public key

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
