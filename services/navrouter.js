const express = require('express');

const home = require('../controllers/home.js' );
//const casauth = require ('cas-authentication');
const webserverConfig = require('../config/web-server.js');


let navrouter = new express.Router();

navrouter.route('/sendemail') 
    .post(home.post);

const port = webserverConfig.port;
// const cas = new casauth(
//     {
//       cas_url: 'https://cas.pucpr.edu:8447/cas-web',
//       service_url: `http://dockerpuc.pucpr.edu:${port}`,
//       cas_version: '2.0'
//     });

//navrouter.get('/',function(req,res){res.send("hello");})
//navrouter.get('/classRoom',function(req,res){res.send("hello classroom");})
//navrouter.get('/classRoom',function(req,res){res.send("hello classroom");})
//navrouter.get('/classRoom',cas.bounce,home.hello);


module.exports = navrouter
