const { jsPDF } = require("jspdf");
const fs = require("fs");
require("jspdf-autotable");

function deleteReportFile(userId) {
  const filePath = getReportPath(userId);
  fs.unlinkSync(filePath);
}

function getReportFileName(userId) {
  return `${userId}_report`;
}

function getReportPath(userId) {
  return `./reports/${getReportFileName(userId)}.pdf`;
}

function getFormattedShortDate(unformattedDate) {
  const date = new Date(unformattedDate);
  const formattedDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  formattedDate.setHours(formattedDate.getHours() + 5);
  formattedDate.setMinutes(formattedDate.getMinutes() + 30);
  return formattedDate;
}

function getTableHeader() {
  return [["Sl No", "Device Id", "Sensor", "Value", "Reading Time"]];
}

function getTableBody(reportData) {
  const tableBody = [];

  for (let i = 0; i < reportData.length; i++) {
    const row = reportData[i];
    const { device_id, sensor_name, value, reading_time, sensor_uom } = row;

    const date = new Date(reading_time);
    const formattedReadingTime = date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    const tableRow = [
      i + 1,
      device_id,
      sensor_name,
      `${value} ${sensor_uom}`,
      formattedReadingTime,
    ];
    tableBody.push(tableRow);
  }
  return tableBody;
}

function generateReport(userId, reportData, startDate, endDate) {
  const doc = new jsPDF();
  const totalPagesExp = "{total_pages_count_string}";

  const formattedStartDate = getFormattedShortDate(startDate);
  const formattedEndDate = getFormattedShortDate(endDate);

  doc.text(`Report from ${formattedStartDate} to ${formattedEndDate}`, 15, 10);
  doc.autoTable({
    head: getTableHeader(),
    body: getTableBody(reportData),
    margin: { top: 20, bottom: 20 },
    didDrawPage: function (data) {
      // Footer
      let footerText = "Page " + doc.internal.getNumberOfPages();

      if (typeof doc.putTotalPages === "function") {
        footerText = `${footerText} of ${totalPagesExp}`;
      }

      doc.setFontSize(10);
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(footerText, data.settings.margin.left, pageHeight - 10);
    },
  });

  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  doc.save(getReportPath(userId));
}

module.exports = {
  generateReport,
  getReportPath,
  getReportFileName,
  deleteReportFile,
};
