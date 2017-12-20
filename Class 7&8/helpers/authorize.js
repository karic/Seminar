let crypto = require('crypto');
let Buffer = require('buffer').Buffer;
let SECRET_KEY = "NekiBasTajan123dsa1234";
let ENCODING = 'hex';
let algorithm = 'des-ede3-cbc';




function encrypt(text){
    console.log("Cipher: ", text);
    var cipher = crypto.createCipher(algorithm,SECRET_KEY);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    //console.log("KRIPTIRANO: " + crypted);
    console.log("Cipher: ", crypted);
    return crypted;
}

function decrypt(text){
    console.log("Decipher: ", text);
    var decipher = crypto.createDecipher(algorithm,SECRET_KEY);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    console.log("Decipher: ", dec);
    return dec;
}

var list = [
    ["root", "toor"],
    ["nagib", "uzbrdica"],
    ["usr", "pw"]
];

function validLoginUser(user, password) {
   for (var i=0; i<list.length; i++){
      if (user===list[i][0] && password== list[i][1]){
          return encrypt(user);
      }
   }
   return false;
}

function validLoginCookie(cookie) {
    console.log(cookie);
    if (cookie) {
        let decuser = decrypt(cookie);
        for (var i = 0; i < list.length; i++) {
            if (decuser == list[i][0]) {
                return decuser;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }

}
function authorize () {
    return function (req, res, next) {
        console.log("URL:" ,req.url);
        if (req.url === '/' || req.url === '/login') {
            console.log("NoAuth");
            next();
        } else {
            //if (req.cookies && req.cookies['userName'])
            console.log("Auth ",req.cookies['userName']);
            if (validLoginCookie(req.cookies['userName'])) {
                next();
            } else {
                res.redirect(302, `http://localhost:3000`);
            }
        }
    }
}

module.exports = {authorize: authorize,
                    validLoginUser: validLoginUser,
                    validLoginCookie: validLoginCookie};
