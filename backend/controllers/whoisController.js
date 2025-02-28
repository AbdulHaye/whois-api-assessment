const whoisService = require('../services/whoisService');
const logToFile = require("../utils/logger");
exports.getWhoisData = async (req, res) => {
    const { domain, type } = req.query;

    if (!domain || !type) {
        logToFile("error", "Missing required query parameters");
        return res.status(400).json({ error: "Domain and type are required." });
    }

    try {
        const data = await whoisService.fetchWhoisData(domain, type);
        res.json(data);
    } catch (error) {
        logToFile("error", `API request failed for domain: ${domain} - ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
