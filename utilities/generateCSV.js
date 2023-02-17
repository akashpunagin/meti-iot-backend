const { convertArrayToCSV } = require("convert-array-to-csv");
const fs = require("fs");

function deleteCSVFile(userId) {
  const filePath = getCSVPath(userId);
  try {
    fs.unlinkSync(filePath);
  } catch (error) {}
}

function getCSVFileName(userId) {
  return `${userId}_csv`;
}

function getCSVPath(userId) {
  return `./csv/${getCSVFileName(userId)}.csv`;
}

function saveCSVFile(userId, csvData) {
  fs.writeFileSync(getCSVPath(userId), csvData);
}

async function generateAndSaveCSV(userId, reportData) {
  const csvFromArrayOfObjects = convertArrayToCSV(reportData);
  saveCSVFile(userId, csvFromArrayOfObjects);
}

module.exports = {
  deleteCSVFile,
  getCSVFileName,
  getCSVPath,
  saveCSVFile,
  generateAndSaveCSV,
};
