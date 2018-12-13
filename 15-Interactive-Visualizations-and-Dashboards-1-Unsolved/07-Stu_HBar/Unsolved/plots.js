// @TODO: Complete the following sections

console.log(data);
// Sort the data array using the greekSearchResults value

newdata = data.sort(function(a, b) {
    return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
});

godnames = [];
greekresults = [];


for (i = 0; i < 9; i++) { 
    godnames.push(newdata[i]["greekName"]);
    greekresults.push(newdata[i]["greekSearchResults"]);
};



var greektrace = {
    y: godnames,
    x: greekresults,
    type: "bar",
    orientation: 'h',
    transforms: [{
        type: 'sort',
        target: 'y',
        order: 'descending'}]
  };


var plotdata = [greektrace];
  
Plotly.newPlot("plot", plotdata);

// Slice the first 10 objects for plotting

// Trace1 for the Greek Data

// set up the data variable

// set up the layout variable

// Render the plot to the div tag with id "plot"
