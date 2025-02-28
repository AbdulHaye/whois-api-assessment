const fs = require("fs");
const path = require("path");

/**
 * Logs messages to a file with timestamps.
 * @param {string} level - The log level (info, error, warning).
 * @param {string} message - The log message.
 */
const logToFile = (level, message) => {
  const logDirectory = path.join(__dirname, "../logs");
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }

  const logFilePath = path.join(logDirectory, "server.log");
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Failed to write log:", err);
    }
  });
};

module.exports = logToFile;
