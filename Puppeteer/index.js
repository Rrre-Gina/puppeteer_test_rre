const optica = require('./projects/Optica/optica');

const cron = require('node-cron');
const express = require('express');

const HandlerActions = require("./helpers/HandlerActions");

require('dotenv').config()

let app = express();

let _handler = new HandlerActions('DeleteLogFiles')

cron.schedule(process.env.TEST_CRON, async () => {
    console.log('run test');
    await optica.optica();
    // await authorization.authorization();
    // await filtration.filtration();
})

cron.schedule(process.env.LOG_DELETE_CRON, async () => {
    await _handler.deleteLogs();
})

app.listen(process.env.EXPRESS_PORT);