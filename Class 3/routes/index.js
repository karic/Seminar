var express = require('express');
var router = express.Router();
var fs = require('fs'); // FileSystem for writing to a file

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', poruke: 'Send a message to see others'});
});

router.post('/poruka', function (req, res, next) {
    let usr = req.body.ime;
    let str = req.body.poruka;
    if (usr!=="" && str!==""){
        fs.appendFile('Messages.txt', usr + "-" + str + '\n <br /> ', () => {
        fs.readFile('Messages.txt', (err, data) => {
            if (!err) {
                res.render('index', {
                    title: usr,
                    poruke: data.toString()
                });
            } else {
                console.log(err);
            }
        })
        });
    }else {
        fs.readFile('Messages.txt', (err, data) => {
            if (!err) {
                res.render('index', {
                    title: usr,
                    poruke: data.toString()
                });
            } else {
                console.log(err);
            }
        })
    }
});
module.exports = router;
