const helper = global.helper;
const express = helper.module.express;
const router = express.Router();
const utilites = require('../../../utilities');
const logger = utilites.logger;
const safePromise = utilites.safePromise;
const slotGeneration = require('../../../services').slotGeneration;
const sendEmail = require('../../../services').sendEmail;


router.post("/slotApi", async (req, res) => {
    const body = req.body;
    const [error, result] = await safePromise(slotGeneration(body));
    if (error) {
        const resp = {
            success: false,
            ...error
        }
        return res.json(resp);
    }
    const resp = {
        result
    }
    res.json(resp);
});

router.post("/emailApi", async (req, res) => {
    const body = req.body;
    const [error, result] = await safePromise(sendEmail(body));
    if (error) {
        const resp = {
            success: false,
            ...error
        }
        return res.json(resp);
    }
    const resp = {
        result
    }
    res.json(resp);
});

module.exports = router;