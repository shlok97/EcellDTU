var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var response = require('response');
var multer = require('multer');
var assert = require('assert');
mongoclient= require('mongodb').mongoclient;
var mongodb = require('mongodb');
var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');


var index = express.Router();
index.use(bodyParser.json());
 console.log('lol');
index.route('/')
.get( function(request, response){
	    console.log("tr home page requested");
        response.writeHead(200, {"content-type": "text;/html"})
        fs.createReadStream("../notification system/views/tr/index.html").pipe(response);
});
module.exports = index;