const cron = require("node-cron");

cron.schedule("* * * * *", function() {
    console.log("---------------------");
}).start();


module.exports = cron;