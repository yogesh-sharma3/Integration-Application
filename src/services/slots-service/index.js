const helper = global.helper;
const config = helper.config;
const fetch = require('node-fetch');
const utilites = require('../../utilities');
const logger = utilites.logger;

/**
 * 
 * 
 * @param {object} body
 * 
 */

function slotGeneration(body) {
    return new Promise((resolve, reject) => {
        fetch(config.SLOT_URL, {
                method: 'POST',
                body: JSON.stringify(body),
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
}

module.exports = slotGeneration;