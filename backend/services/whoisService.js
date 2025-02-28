const axios = require('axios');
require('dotenv').config();
const logToFile = require("../utils/logger");
exports.fetchWhoisData = async (domain, type) => {
    const apiUrl = `${process.env.WHOIS_API_URL}?apiKey=${process.env.WHOIS_API_KEY}&domainName=${domain}&outputFormat=json`;

    try {
        const response = await axios.get(apiUrl);
        const whoisData = response.data.WhoisRecord;

        if (!whoisData) throw new Error("No data found for this domain.");

        if (type === 'domain') {
            return {
                domainName: whoisData.domainName,
                registrarName: whoisData.registrarName,
                registrationDate: whoisData.registryData.createdDate,
                expirationDate: whoisData.registryData.expiresDate,
                estimatedDomainAge: whoisData.estimatedDomainAge,
                hostnames: whoisData.registryData?.nameServers?.hostNames?.join(', ').substring(0, 25) + '...'
            };
        } else if (type === 'contact') {
            return {
                registrantName: whoisData.registryData.registrant?.name,
                technicalContactName: whoisData.registryData.technicalContact?.name,
                administrativeContactName: whoisData.registryData.administrativeContact?.name,
                contactEmail: whoisData.contactEmail
            };
        } else {
            logToFile("error", `Invalid type parameter: ${type}`);
            throw new Error("Invalid type parameter.");
        }
    } catch (error) {
        logToFile("error", `API request failed for domain: ${domain} - ${error.message}`);
        throw new Error("Failed to fetch WHOIS data.");
    }
};
