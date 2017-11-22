var express = require('express');
var router = express.Router();
var fs = require('fs'); // FileSystem for writing to a file

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', poruke: 'Send a message to see others'});
});

router.get('/chat', function (req, res, next) {
     fs.readFile('Messages.txt', (err, data) => {
            if (!err) {
                res.send(data.toString());
            } else {
                console.log(err);
            }
        })
        });

router.post('/chat', function (req, res, next) {
    let usr = "Unknown";
    let str = req.body.message;
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
