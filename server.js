'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var app = express();
var mult = multer();
var mime = require('mime-types');

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', mult.single('upfile'), function(req, res, next){
    let {originalname, size} = req.file;
    let ext = originalname.split('.')[1];
    let mimeType = mime.lookup(ext);
    res.json({originalname, type: mimeType, size});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
