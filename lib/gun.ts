import Gun from "gun";
import { IGunCryptoKeyPair } from "gun/types/types";



const gun = Gun({ peers: [`http://localhost:3000/gun`] });
const SEA = require('gun/sea');

// const { pub, priv, epub, epriv } = SEA.pair().then((pair: IGunCryptoKeyPair) => {
//     console.log(
//         '\nAdd this to .dotenv file:'
//     );
//     console.log(`## PUBLIC_KEY=${JSON.stringify(pair.pub)}`);
//     console.log(`## PRIVATE_KEY=${JSON.stringify(pair.priv)}`);
//     console.log(`## EPUBLIC_KEY=${JSON.stringify(pair.epub)}`);
//     console.log(`## EPRIVATE_KEY=${JSON.stringify(pair.epriv)}`);
//     // Return these to return them to the env with an fs call
//     return [pair.pub, pair.priv, pair.epub, pair.epriv]
// });

// build database


const db = gun.get("DB")
console.log("#DB SET ")

const tags = db.get('tags')



export {
    db,
    tags,
    gun,
    // pub,
    // priv,
    // epub,
    // epriv
}
