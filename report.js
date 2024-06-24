const { createObjectCsvWriter } = require("csv-writer");
const ExcelJS = require("exceljs");

async function generateCsvFile(pages, path) {
  const csvWriter = createObjectCsvWriter({
    path: path,
    header: [
      { id: "url", title: "URL" },
      { id: "hits", title: "Hits" },
    ],
  });

  const records = pages.map(([url, hits]) => ({ url, hits }));
  await csvWriter.writeRecords(records);
}

async function generateExcelFile(pages, path) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Report");

  worksheet.columns = [
    { header: "URL", key: "url", width: 100 },
    { header: "Hits", key: "hits", width: 10 },
  ];

  pages.forEach(([url, hits]) => {
    worksheet.addRow({ url, hits });
  });

  await workbook.xlsx.writeFile(path);
}

async function printReport(pages) {
  const CSVPath = "./Reports/WebCrawlesReport.csv";
  const ExcelPath = "./Reports/WebCrawlesReport.xlsx";

  console.log("=============");
  console.log("REPORT");
  console.log("=============");

  const sortedPages = sortPages(pages);

  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    console.log(`Found ${hits} links to page: ${url}`);
  }

  await generateCsvFile(sortedPages, CSVPath);
  await generateExcelFile(sortedPages, ExcelPath);

  console.log("=============");
  console.log("END REPORT");
  console.log("=============");
}

function sortPages(pages) {
  const pageArr = Object.entries(pages);
  pageArr.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return b[1] - a[1];
  });

  return pageArr;
}

module.exports = {
  sortPages,
  printReport,
};
