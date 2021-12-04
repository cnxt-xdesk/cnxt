import Gun from 'gun';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';

var gun = Gun(['http://localhost:8765/gun']);
var state = Gun({ localStorage: true, radisk: false });
// const Gun = require('gun')
const sea = Gun.SEA;

type State = {};

interface Callback {
  (params?: String): void;
}

// set the state of the frontend element
function putDoStream(key: string, value: State, cb: Callback) {
  let initial = gun.get(key);
  initial.put(value);
  cb();
  return initial.on((data) => data);
}

const addUser = (user: string, passwd: string) => {
  gun.user().create(user, passwd, (ack: any) => {
    if (ack.ok !== 0) {
      console.log('Error creaing users API Node');
    } else console.log(`## PublicKey:` + ack.pub);
  });
};

export { gun, state, addUser };
