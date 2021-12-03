import Gun from "gun";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";

// const Gun = require('gun')
const sea = require('gun/sea')

var gun = Gun(['http://localhost:8765/gun'])

//the database
var data = gun.get('data')


  export {gun}