var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/upload', (req, res) => {
  res.json({ message: 'Please send a POST request' });
});

app.post('/upload', function(req, res){

  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '/uploads');
  form.on('file', function(field, file) {console.log("TEST api GOSE HARE",file.name);
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  form.on('end', function() {
    res.end('success');
  });
  form.parse(req);

});

var server = app.listen(3006, function(){
  console.log('Server listening on port 3006');
});