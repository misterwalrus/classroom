const webServer = require('../services/web-server.js');
const database = require('../services/database.js');
const dbConfig = require('../config/database.js');
const defaultThreadPoolSize = 4;

//increase thread pool size by poolmax
process.env.UV_THREADPOOL_SIZE = dbConfig.banPool.poolMax + defaultThreadPoolSize;


async function startup() {
    console.log(' starting application ');
    try {
        console.log('Initializine database module');
        await database.initialize();
    }catch(err) {
        console.error(err);
        process.exit(1);
    }

    try  {
        console.log(' Init Web Server Module');
        await webServer.initialize();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

startup();

async function shutdown(e) {
    let err =e;
    console.log(' Shutting down');
    try {
        console.log(' Closing web server module' );
        await webServer.close();
    } catch (e) {
        console.log('An error was found:',e);
        err = err || e;
    }
    console.log(' Exiting process' );

    if (err) {
        process.exit(1); //none zero failure code
    } else {
        process.exit(0);
    }
}

process.on('SIGTERM', ()=>{
    console.log(' Received SIGTERM');
    shutdown();
});
process.on('SIGINT', ()=>{
    console.log(' Received SIGINT');
    shutdown();
});
process.on('uncaughtException', (err)=>{
    console.log(' Received uncaughtException');
    console.log(err);
    shutdown(err);
});