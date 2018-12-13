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
  console.log(data);
  ids = data.otu_ids;
  vals = data.sample_values;
  top10ids = ids.slice(ids.length - 9, ids.length);
  top10vals = vals.slice(vals.length - 9, vals.length);
  
  var trace1 = {
    labels: top10ids,
    values: top10vals,
    type: 'pie'
  };
  
  var data1 = [trace1];
  
  var layout1 = {
    title: "Pie Chart",
  };
  
  Plotly.newPlot("pie", data1, layout1);
    // @TODO: Build a Bubble Chart using the sample data
  var trace2 = {
    x: data.otu_ids,
    y: data.sample_values,
    mode: 'markers',
    marker: {
      size: data.sample_values
    }
  };
  
  var data2 = [trace2];
  console.log(data2);
  var layout2 = {
    title: 'Sample Values as a function of Sample Number',
    xaxis: 'OTU ID',
    yaxis: 'Sample Value'
    };
  console.log(layout2);
  Plotly.newPlot("bubble", data2, [layout2]);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
});
};

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
