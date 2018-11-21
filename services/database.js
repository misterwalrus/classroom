const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');
 
async function initialize() {
    var pool = await oracledb.createPool(dbConfig.banPool);
}

function simpleExecute(statement, binds = [], opts = {}){
    return new Promise(async(resolve,reject)=>{
        let conn;
        opts.outFormat = oracledb.OBJECT;
        opts.autoCommit = true;
        
        try {
            conn = await oracledb.getConnection();
            console.log('to execute query:',statement);
            const result = await conn.execute(statement,binds,opts);
            resolve(result);
        }catch(err) {
            reject(err) ;
        } finally {
            if (conn) {   //conn is active needs to be closed
                try{
                    await conn.close();
                }catch(err) {
                    console.log(err);
                }
            }
        }
    })
}
function storedProc(statement,binds = [], opts = {}) {
    return new Promise(async(resolve,reject)=>{
        let conn;
        opts.autoCommit = true;
        try {
            conn = await oracledb.getConnection();
            console.log('query: ',statement);
            const result = await conn.execute(statement,binds,opts);
            resolve(result);
        }catch(err) {
            reject(err)
        } finally {
            if (conn) {
                try{
                    await conn.close();
                }catch(err) {
                    console.log('error closing connection from pool',err);
                }
            }
        }
    })
}
module.exports.storedProc = storedProc;
module.exports.initialize = initialize;
module.exports.simpleExecute = simpleExecute;