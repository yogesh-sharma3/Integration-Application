'use strict';

const welcome = require('./welcome');
const slotGeneration = require('./slots-service');
const sendEmail = require('./sendEmail-service');


module.exports = {
    welcome,
    slotGeneration,
    sendEmail
}