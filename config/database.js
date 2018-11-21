module.exports = {
     banPool: {
         user: process.env.DB_USER,
         password: process.env.DB_PASS,
         connectString: process.env.DB_CONNECTIONSTRING,
         poolMin:10,
         poolMax:10,
         poolIncrement:0,
     }
};
