var apiKey = "xDxi9KfGyHTz5_ZP6Cfr";

inputField = d3.select(".form-control");

// Submit Button handler
function handleSubmit() {
  console.log("test")
  // @TODO: YOUR CODE HERE
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  stock = inputField.node().value;
  console.log(stock);
  // clear the input value
  inputField.node().value = "";
  // Build the plot with the new stock
  buildPlot(stock);
}


/* global Plotly */

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} data
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Volume
 */

// d3.json(url).then(function(data) {
//   var close = unpack(data.dataset.data, 5);
//   var date = unpack(data.dataset.data, 0);
//   console.log(close);
//   console.log(date);
// });



function unpack(data, index) {
  return data.map(function(row) {
    return row[index];
  });
}

// Calculate a rolling average for an array
function rollingAverage(arr, windowperiod = 10) {
  // @TODO: YOUR CODE HERE
  moveavgarr  = []
  for (var i = 0; i < arr.length; i++){
  avgarr = 0
    for (var j = 0; j < windowperiod; j++){
      
      avgarr += parseInt(arr[i-j])

    }
  moveavgarr.push(parseInt(avgarr/windowperiod))
  }
  return moveavgarr
}  


/**
 * Fetch data and build the timeseries plot
 */
function buildPlot(x) {

  var url =
  `https://www.quandl.com/api/v3/datasets/WIKI/${x}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;


  d3.json(url).then(function(data) {
    var close = unpack(data.dataset.data, 4);
    var open = unpack(data.dataset.data, 1);
    var high = unpack(data.dataset.data, 2);
    var low = unpack(data.dataset.data, 3);
    var date = unpack(data.dataset.data, 0);
    var rollingPeriod = 30;
    var rollavg = rollingAverage(close, rollingPeriod);
    console.log(data.dataset);
    // console.log(close);
    // console.log(high);
    // console.log(low);
    // console.log(date);
  
  // @TODO: YOUR CODE HERE
    var trace1 = {
    x: date,
    open: open,
    high: high,
    low: low,
    close: close,
    type: "candlestick"
    };

    var trace2 = {
      x: date.slice(0, date.length - rollingPeriod),
      y: rollavg,
      type: "rolling"
      };

    var data = [trace1, trace2];

    Plotly.newPlot("plot", data);
  });
}

// buildPlot();

// Add event listener for submit button
// @TODO: YOUR CODE HERE

submission = d3.select("#submit");

submission.on("click", handleSubmit );