import Gun from "gun";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";

// const Gun = require('gun')
const sea = require('gun/sea')

var state = Gun({localStorage: true, radisk: false, })
var gun = Gun(['http://localhost:8765/gun'])

//the database
var data = gun.get('data')
data
  .get('message')
  .map()
  .on((msg) => {
    var date = new Date();
   console.log(
      `${date.toString()} Message recieved ${JSON.stringify(msg.test, null, 3)}`
    );
  });

  export {gun, state}