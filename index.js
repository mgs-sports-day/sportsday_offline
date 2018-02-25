var url = 'https://docs.google.com/spreadsheets/d/1kApI3fZBqBqRx_egkx4BIGrWpoodAuyKd-e3lQ8CxMk';
var query = 'select A';
var queryEncoded = encodeURIComponent(query);
var finalURL = url + '/gviz/tq?tq=' + queryEncoded;
console.log(finalURL);
var xhr = new XMLHttpRequest();
xhr.open('GET', finalURL, true);
xhr.send();
xhr.onreadystatechange = processRequest;
function processRequest(e) {
  if (xhr.readyState == 4) {
    alert(xhr.responseText);
  };
};
