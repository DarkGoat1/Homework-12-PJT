// YOUR CODE HERE
console.log(data)

longjump = data.long_jump;
highjump = data.high_jump;
discus = data.discus_throw;
year = data.year;

console.log(data.year)
console.log(discus)

var trace1 = {
    y: longjump,
    x: year,
    mode: "markers",
    type: "scatter",
    name: "Long Jump"
};

var trace2 = {
    y: highjump,
    x: year,
    mode: "markers",
    type: "scatter",
    name: "High Jump"
};

var trace3 = {
    y: discus,
    x: year,
    mode: "markers",
    type: "scatter",
    name: "Discus Throw"
};

// var layout = {
//     title: "Olympic Gold Distances",
//     xaxis: "Year since 1900",
//     yaxis: "Distance in (Inches???)"
// };

var plotdata = [trace1, trace2, trace3];
  
Plotly.newPlot("plot", plotdata);