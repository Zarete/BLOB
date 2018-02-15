var express = require('express');
var app     = express();
var path    = require('path');
const fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());

app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    //console.log("accueil");
  res.sendFile(path.join(__dirname+'/public/metabolism.html'));

});


app.get('/input',function(req,res){
    res.sendFile(path.join(__dirname+'/public/input.html'));
});


//https://www.npmjs.com/package/express-fileupload
app.post('/uploadFile', function(req, res) {
    //console.log("upload");
  if (!req.files){
    return res.status(400).send('No files were uploaded.')};

  // Use the mv() method to place the file somewhere on your server

  var testfile1=false;

  var file1 = req.files.file1;
  file1.mv(__dirname+'/public/inputfile.json', function(err) {
    if (err){
      return res.status(500).send(err)};
    testfile1=true;
    //res.redirect('/');
    console.log("ok");

  });
  app.get('/visInput',function(req,res){
      res.sendFile(path.join(__dirname+'/public/visInput.html'));
  });

});




app.listen(3000);

console.log('Working directory : '+__dirname+'/public\n');
console.log('Running at Port 3000      url =  localhost:3000');
console.log('Ctrl-C  to close the server\n');
