const helper = global.helper;
const config = helper.config;
const cron = require('node-cron');
const fetch = require('node-fetch');
const utilites = require('../../utilities');
const logger = utilites.logger;
const slotGeneration = require('../slots-service');
const safePromise = utilites.safePromise;

/**
 * 
 * 
 * @param {object} body
 * 
 */


function sendEmail(body) {
    return new Promise(function (resolve, reject) {
        const slots = body.getslots;
        cron.schedule('0 0 */3 * * *', async (next) => {
            const [err, data] = await safePromise(slotGeneration(slots));
            if (err) {
                next(err)
            }
            delete body["getslots"];
            body.emailPayload.body = data;
            const payload = body;
            fetch(config.EMAIL_URL, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(function (json) {
                    resolve(json)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    })
}

module.exports = sendEmail;