const database = require('../services/database.js');

const baseQuery = 
`select spriden_id "id", spriden_pidm "pidm",spriden_last_name "last_name",
spriden_first_name "first_name"
from spriden where spriden_change_ind is null
and lower(spriden_last_name) like '%valdes%'`;

const userQuery = `select user from dual`;


async function find(context) {
    let query = baseQuery;
    const binds = {};
 console.log('context.pidm: ->',context.pidm)
    if (context.pidm) {
        binds.spriden_pidm = parseInt(context.pidm);
        query +=`\nand spriden_pidm = :spriden_pidm` ;
    }
    const result = await database.simpleExecute(query,binds);
    return result.rows;
}

async function showUser(){
    let query = userQuery;
    const binds = {};
    const result = await database.simpleExecute(query,binds);
    return result.rows;
}
module.exports.find = find;
module.exports.showUser = showUser;