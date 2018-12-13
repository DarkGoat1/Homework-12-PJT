console.log(data);
// YOUR CODE HERE
console.log(data.length)

godnames = [];
greekresults = [];
romanresults = [];

for (i = 0; i < data.length; i++) { 

    godnames.push(data[i]["pair"]);
    greekresults.push(data[i]["greekSearchResults"]);
    romanresults.push(data[i]["romanSearchResults"]);
};

var greektrace = {
    x: godnames,
    y: greekresults,
    type: "bar"
  };
var romantrace = {
    x: godnames,
    y: romanresults,
    type: "bar"
  };

var data = [greektrace, romantrace];
  
Plotly.newPlot("plot", data);

// console.log(godnames);
// console.log(greekresults);
// console.log(romanresults);