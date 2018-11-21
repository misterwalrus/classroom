const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const webServerConfig = require('../config/web-server.js' );
const apirouter = require('./router.js');
const navrouter = require('./navrouter.js');
const casauth = require ('./cas-authentication');
const session = require('express-session');

const { NODE_EXTRA_CA_CERTS } = process.env;


const port = webServerConfig.port;
const casobj = new casauth(
    {
      cas_url: 'https://cas.pucpr.edu:8447/cas-web',
      cas_version: '2.0',
      service_url: 'http://dockerpuc.pucpr.edu:8888'
    });


let httpServer;

function initialize() {
    return new Promise((resolve,reject) =>{
        const app = express();
        app.use(
            session({
              secret: 'another super secret key',
              resave: false,
              saveUninitialized: true
            })
          );

        httpServer = http.createServer(app);
   

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));

        app.use(morgan('combined'));
        app.use('/api',apirouter);
        app.use('/',navrouter);
    console.log('sevice_url:',casobj.service_url);
    
        app.get('/classRoom',casobj.bounce,(req,res)=>{res.end("Welcome")});

        httpServer.listen(webServerConfig.port)
        .on('listening', ()=>{
            console.log(`Web server is listening at localhost:${webServerConfig.port} `);
            resolve();
        })
        .on('error', err => {
            reject(err);
        });
            
    });
}

function close() {
    return new Promise((resolve,reject) => {
        httpServer.close((err) =>{
            if (err) { 
                reject(err);
                return;
            }
            resolve();
        });
    }) ;
}
module.exports.initialize = initialize;
module.exports.close = close;
