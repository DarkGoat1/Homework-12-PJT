function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var URL = `/metadata/${sample}`;
    var metadata = d3.select("#sample-metadata");
    metadata.selectAll("span").html("");
    console.log(URL);
    d3.json(URL).then(function(data) {
      console.log(data);
      metadata.append('span').
      text("KeyValue Pairs : " + Object.entries(data) + "  |  ")
    });

    

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    var URL = `/samples/${sample}`;
    console.log(URL);
    d3.json(URL).then(function(data) {
    console.log(data)
    // console.log("BC " + data.otu_ids);
    // console.log("BC " + data.otu_labels);
    // console.log("BC " + data.sample_values);
    newdata = data.sort(function(a, b) {
      return parseFloat(data.sample_values[b]) - parseFloat(data.sample_values[a]);
    });
    // console.log("BC " + newdata.otu_ids);
    // console.log("BC " + newdata.otu_labels);
    // console.log("BC " + newdata.sample_values);
    // var psorted = Object.keys(data.sample_values).map(function(key) {
    //   return { key: key, value: this[key] };
    // }, data.sample_values);
    psorted.sort(function(p1, p2) { return p2.value - p1.value; });
    var top10 = psorted.slice(0, 9);
    console.log(top10);
    function selectbigdawgz(x) {
      return x.sample_values >= top10;
    };
    console.log("BC " + data);
    var bigdawgz = data.filter(selectbigdawgz);
    console.log(bigdawgz);
    
    var trace1 = {
      labels: bigdawgz.otu_labels,
      values: bigdawgz.sample_values,
      type: 'pie'
    };
    
    var data = [trace1];
    
    var layout = {
      title: "Pie Chart",
    };
    
    Plotly.newPlot("pie", data, layout);


    });
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
