var express = require('express');
var app = express();

var mongoose = require('mongoose');    

//var mongodbUri = 'mongodb://cdc-user:$$cdcuser@ds059205.mongolab.com:59205/cdc';
var mongodbUri = 'localhost:27017';
mongoose.connect(mongodbUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/search',function (req,res){
	res.send('Hello');
});
app.post('/api/users', function(req, res) {
   

    res.sent('value recieved');

db.once('open', function callback () {

  // Create song schema
  var diseaseSchema = mongoose.Schema({
    providerId: String,
    providerName: String,
    latitude: Number,
    longitude: Number,
    patientPhoneNumber:String,
    patientAddress:String,
    patientSymptoms:String,
    patientDiseaseId:String,
    diagnoisisDate:date
    
  });

  // Store song documents in a collection called "songs"
  var Disease = mongoose.model('disease', diseaseSchema);

  // Create seed data
  var diseaseincidence = new Disease({
    providerId: req.body.providerId,
    providerName: req.body.providerName,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    patientPhoneNumber: req.body.patientPhoneNumber,
    patientAddress: req.body.patientAddress,
    patientSymptoms: req.body.patientSymptoms,
    patientDiseaseId: req.body.patientDiseaseId,
    diagnoisisDate: req.body.diagnoisisDate
  });

	diseaseincidence.save();

 }); 


});
app.listen(2000);