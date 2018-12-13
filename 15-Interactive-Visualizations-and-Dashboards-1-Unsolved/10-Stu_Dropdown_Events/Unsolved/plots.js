function init() {
  var data = [{
    values: [19, 26, 55, 88],
    labels: ["Spotify", "Soundcloud", "Pandora", "Itunes"],
    type: "pie"
  }];

  var layout = {
    height: 600,
    width: 800
  };

  Plotly.plot("pie", data, layout);
}

function updatePlotly(newx, newy) {
  
  var LINE = document.getElementById("pie");
  
  // Note the extra brackets around 'newx' and 'newy'

}

function getData(dataset) {
  // YOUR CODE HERE
  // create a select statement to select different data arrays (YOUR CHOICE)
  // whenever the dataset parameter changes. This function will get called
  // from the dropdown event handler.
    // Initialize empty arrays to contain our axes
    var x = [];
    var y = [];
  
    // Fill the x and y arrays as a function of the selected dataset
    switch (dataset) {
    case "dataset1":
      x = [1, 2, 3, 4, 5];
      y = ["meme1", "meme2", "meme3", "meme4"];
      break;
    case "dataset2":
      x = [10, 20, 30, 40, 50];
      y = ["meme1", "meme2", "meme3", "meme4"];
      break;
    case "dataset3":
      x = [100, 200, 300, 400, 500];
      y = ["meme1", "meme2", "meme3", "meme4"];
      break;
    default:
      x = [1, 2, 3, 4, 5];
      y = ["meme1", "meme2", "meme3", "meme4"];
      break;
    }
  

  updatePlotly(data);
}

init();
