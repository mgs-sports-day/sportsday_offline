var statusSheet = 'https://docs.google.com/spreadsheets/d/1kApI3fZBqBqRx_egkx4BIGrWpoodAuyKd-e3lQ8CxMk/edit#gid=0';
var rawStatusResults = sheetrock({
  url: statusSheet,
  query: "select A,B where A = 'results'",
});
alert(rawStatusResults);
