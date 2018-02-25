function updateBoxes(res, com) {
  switch (res) {
    case 1:
      $( '#results-container' )
        .html ( '<div class="alert alert-success"><strong>Online!</strong> You can visit this page by clicking <a href="#" class="alert-link">here</a>.</div>' );
      break;
    case 0:
      $( '#results-container' )
        .html ( '<div class="alert alert-danger"><strong>Sorry!</strong> This page is currently offline. Please check again later.</div>' );
      break;
    default:
      $( '#results-container' )
        .html ( '<div class="alert alert-warning"><strong>Error!</strong></div>' );
      break;
  }
  switch (com) {
    case 1:
      $( '#compets-container' )
        .html ( '<div class="alert alert-success"><strong>Online!</strong> You can visit this page by clicking <a href="#" class="alert-link">here</a>.</div>' );
      break;
    case 0:
      $( '#compets-container' )
        .html ( '<div class="alert alert-danger"><strong>Sorry!</strong> This page is currently offline. Please check again later.</div>' );
      break;
    default:
      $( '#compets-container' )
        .html ( '<div class="alert alert-warning"><strong>Error!</strong></div>' );
      break;
  }
};

function loadData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', finalURL, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  function processRequest(e) {
    if (xhr.readyState == 4) { // 4 means request fully completed
      var responseComplete = xhr.responseText;
      var responseStarted = responseComplete.replace('/*O_o*/\ngoogle.visualization.Query.setResponse(','');
      var responseFinished = responseStarted.slice(0, -2);
      console.log(responseFinished);
      var responseJSON = JSON.parse(responseFinished);
      statusResults = responseJSON.table.rows[0].c[1].v;
      statusCompets = responseJSON.table.rows[1].c[1].v;
      console.log(statusResults, statusCompets);
      updateBoxes(statusResults, statusCompets);
    }
  }
};

updateBoxes(1,1);

var url = 'https://docs.google.com/spreadsheets/d/1kApI3fZBqBqRx_egkx4BIGrWpoodAuyKd-e3lQ8CxMk';
var query = 'select A,B';
var queryEncoded = encodeURIComponent(query);
var finalURL = url + '/gviz/tq?tq=' + queryEncoded;
console.log(finalURL);
loadData();
