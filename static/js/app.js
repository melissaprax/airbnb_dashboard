// In the mapping exercise, we used the http module to create a web server.

// Javascript can't get files from your computer, but it can get them from a web server.

// JavaScript wants information.

// Get Data:
// // Check Staten Island data in the console:
// d3.json("http://127.0.0.1:5000/api/staten_island").then(function(data) {
//   console.log(data);
// });
// // Check Bronx data in the console:
// d3.json("http://127.0.0.1:5000/api/bronx").then(function(data) {
//   console.log(data);
// });
// // Check Queens data in the console:
// d3.json("http://127.0.0.1:5000/api/queens").then(function(data) {
//   console.log(data);
// });

// Use d3.json() to request data from the Flask app
d3.json("http://127.0.0.1:5000/api/data").then(function(data) {
  console.log(data);

  // Section 1: Create a dropdown menu to allow users to select a neighbourhood group
  
  // Create a variable for a dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  // Set unique neighbourhood groups as dropdown options
  var dropdownOptions = [...new Set(data.map(d => d.neighbourhood_group))];

  // Append dropdown options to the dropdown menu
  dropdownOptions.forEach(function(option) {
    dropdownMenu.append("option").text(option).property("value", option);
  });
  
  // Section 2: Create a map to plot the latitude and longitude of Airbnb listings
  
  // Define variables necessary to create the map

  // Create a variable for the map options
  var mapOptions = {
    center: [40.73, -74.0059],
    zoom: 10,
    minZoom: 10,
    maxZoom: 18
  }
  // Create a variable for the map
  var map = L.map("map", mapOptions);

  // Create a variable for the tile layer
  var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  
  // Add the layer to the map
  map.addLayer(layer);

  // Initialize function to create and add markers to the map
  function initMap(selection) {
    // Filter data to only include selected neighbourhood group
    var filteredData = data.filter(d => d.neighbourhood_group === selection);
    // Create a variable for the markers
    var markers = L.markerClusterGroup();
    // Loop through data
    for (var i in filteredData) {
      var row = filteredData[i];
      // Console log latitude and longitude
      console.log(row.latitude, row.longitude);
      // Add a marker to the map
      markers.addLayer(L.marker([row.latitude, row.longitude]));
      // Bind a popup to the marker
      markers.bindPopup("<h3>" + row.name + "</h3><hr><p>Neighbourhood: " + row.neighbourhood + "</p><p>Room Type: " + row.room_type + "</p><p>Price: $" + row.price + "</p>");
      // Add the markers to the map
      markers.addTo(map);
    }
  }
  
  // Section 3: Create a histogram to visualize the price of Airbnb listings

  // Initialize function to create histogram of price data
  function initHistogram(selection) {
    // Filter data to only include selected neighbourhood group
    var filteredData = data.filter(d => d.neighbourhood_group === selection);
    // Create array of price data for "Entire home/apt"
    var filteredPriceEntire = filteredData.filter(d => d.room_type === "Entire home/apt").map(d => d.price);
    // Create array of price data for "Private room"
    var filteredPricePrivate = filteredData.filter(d => d.room_type === "Private room").map(d => d.price);
    // Create array of price data for "Shared room"
    var filteredPriceShared = filteredData.filter(d => d.room_type === "Shared room").map(d => d.price);

    // Create array of price data
    // var filteredPrice = filteredData.map(d => d.price); // This is the original code


    // Conditional Formatting for Room Type

    // Note: Instead of giving each neighbourhood group a unique color, we can give each room type a unique color.
    
    // Create a variable for a string to be concatenated in the title of the histogram for each neighbourhood group
    var title = "";
    // Set title for Bronx
    if (selection === "Bronx") {
        title = "Bronx: Histogram of Airbnb Listing Prices Layered by Room Type";
    }
    // Set title for Brooklyn
    else if (selection === "Brooklyn") {
        title = "Brooklyn: Histogram of Airbnb Listing Prices Layered by Room Type";
    }
    // Set title for Manhattan
    else if (selection === "Manhattan") {
        title = "Manhattan: Histogram of Airbnb Listing Prices Layered by Room Type";
    }
    // Set title for Queens
    else if (selection === "Queens") {
        title = "Queens: Histogram of Airbnb Listing Prices Layered by Room Type";
    }
    // Set title for Staten Island
    else if (selection === "Staten Island") {
        title = "Staten Island: Histogram of Airbnb Listing Prices Layered by Room Type";
    }

    // Create a variable for the color of the histogram bars
    var color = "";
    // Set color for "Entire home/apt" to be Blue
    if (selection === "Entire home/apt") {
        color = "blue";
    }
    // Set color for "Private room" to be Red
    else if (selection === "Private room") {
        color = "red";
    }
    // Set color for "Shared room" to be Green
    else if (selection === "Shared room") {
        color = "green";
    }

    // // Set the color of the histogram bars to be unique for each neighbourhood group
    // var color = "";
    // // Set Bronx to be Purple
    // if (selection === "Bronx") {
    //     color = "purple";
    // }
    // // Set Brooklyn to be Blue
    // else if (selection === "Brooklyn") {
    //     color = "blue";
    // }
    // // Set Manhattan to be Red
    // else if (selection === "Manhattan") {
    //     color = "red";
    // }
    // // Set Queens to be Green
    // else if (selection === "Queens") {
    //     color = "green";
    // }
    // // Set Staten Island to be Orange
    // else if (selection === "Staten Island") {
    //     color = "orange";
    // }   

    // Create trace for Entire home/apt
    var trace1 = {
      x: filteredPriceEntire,
      type: "histogram",
        marker: {
            color: color,
            line: {
                color: "black",
                width: 1
            }
        },
        name: "Entire home/apt"
    };
    // Create trace for Private room
    var trace2 = {
      x: filteredPricePrivate,
      type: "histogram",
        marker: {
            color: color,
            line: {
                color: "black",
                width: 1
            }
        },
        name: "Private Room"
    };
    // Create trace for Shared room
    var trace3 = {
      x: filteredPriceShared,
      type: "histogram",
        marker: {
            color: color,
            line: {
                color: "black",
                width: 1
            }
        },
        name: "Shared Room"
    };
    // Create data array for plot
    var plotData = [trace1, trace2, trace3];
    // Create layout for plot
    var layout = {
      title: title,
      xaxis: { title: "Price", range: [-25, 500]},
      yaxis: { title: "Count" },
      // Overlay histograms
      barmode: "overlay"
    };
    // Plot the histogram
    Plotly.newPlot("histogram", plotData, layout);
  }

  // Section 4: Create a word cloud to visualize the word frequencies of names of Airbnb listings
  
  // Create a function to initialize word cloud of listing names
  function initWordCloud(selection) {
    // Filter data to only include selected neighbourhood group
    var filteredData = data.filter(d => d.neighbourhood_group === selection);
    // Create array of listing names
    var filteredName = filteredData.map(d => d.name);
    // Create a string of all listing names
    var nameString = filteredName.join(" ");
    // Create an array of all words in the string
    var words = nameString.split(" ");
    // Create an array of unique words
    var uniqueWords = [...new Set(words)];
    
    // Create an array of arrays for word frequency
    var wordFrequency = uniqueWords.map(word => [word, words.filter(w => w === word).length]);
    // Sort the array of arrays by word frequency
    wordFrequency.sort(function(a, b) {
      return b[1] - a[1];
    });
    // Slice the array to only include the top 100 words
    wordFrequency = wordFrequency.slice(0, 100);
    // Create an array of objects for word frequency
    wordFrequency = wordFrequency.map(word => {
      return { name: word[0], weight: word[1] };
    });

    // Create High Charts word cloud
    Highcharts.chart("wordcloud", {
      accessibility: {
        screenReaderSection: {
          beforeChartFormat:
            "<h5>{chartTitle}</h5>" +
            "<div>{chartSubtitle}</div>" +
            "<div>{chartLongdesc}</div>" +
            "<div>{viewTableButton}</div>"
        }
      },
      series: [
        {
          type: "wordcloud",
          data: wordFrequency,
          name: "Occurrences",
          turboThreshold: 5000
        }
      ],
      title: {
        text: "Word Cloud of Listing Names"
      },
      subtitle: {
        text: "Neighbourhood Group: " + selection
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.weight}</b>"
      }
    });
  }
  
  // Section 5: Activate and initialize the charts
  
  // Create function to update histogram when a new option is selected calling updateChart
  function updateCharts(selection) {
    // Call the initMap function to update the map
    initMap(selection);
    // Call the initHistogram function to update the plot
    initHistogram(selection);
    // Call the getWordCloudData function to update the word cloud
    initWordCloud(selection);
  }

  // Create function to handle change in dropdown menu
  function optionChanged(selection) {
    // Call updateChart function with the new selection
    updateCharts(selection);
  }

  // Get the first selection to initialize the plot
  var firstSelection = dropdownOptions[0];

  // Initialize the charts
  initMap(firstSelection);
  initHistogram(firstSelection);
  initWordCloud(firstSelection);

  // Set up event listener for when a new option is selected
  dropdownMenu.on("change", function() {
    // Get the new selection
    var newSelection = d3.select(this).property("value");
    // Call the optionChanged function with the new selection
    optionChanged(newSelection);
  }); 
}
).catch(function(error) {
  console.log("Error retrieving data:", error);
});

// Notes for future reference: 
// 1. Consider whether adding number of listing to the histogram would be useful
// 2. Consider if standardizing the number of bins would be better than using the default
// 3. Consider whether numerical summary statistics would be welcome additions to the dashboard




// Draft I:

// // Use d3.json() to request data from the Flask app
// d3.json("http://127.0.0.1:5000/api/data").then(function(data) {
//     console.log(data);

//     // Create a variable for a dropdown menu
//     var dropdownMenu = d3.select("#selDataset");

//     // Set unique neighbourhood groups as dropdown options
//     var dropdownOptions = [...new Set(data.map(d => d.neighbourhood_group))];

//     // Append dropdown options to the dropdown menu
//     dropdownOptions.forEach(function(option) {
//         dropdownMenu.append("option").text(option).property("value", option);
//     });

// // Initialize function to create histogram of price data
// function initHistogram(selection) {
//     // Fillter data to only include selected neighbourhood group
//     var filteredData = data.filter(d => d.neighbourhood_group === selection);
//     // Create array of price data
//     var filteredPrice = filteredData.map(d => d.price);
//     // Create trace for histogram
//     var trace = {
//         x: filteredPrice,
//         type: "histogram"
//     };
//     // Create data array for plot
//     var data = [trace];
//     // Create layout for plot
//     var layout = {
//         title: "Price Distribution",
//         xaxis: { title: "Price", range: [0,1300] },
//         yaxis: { title: "Count" }
//     };
//     // Plot the histogram
//     Plotly.newPlot("histogram", data, layout);
// }
// // Create function to update histogram when a new option is selected calling updateChart
// function updateChart(selection) {
//     // Call the initHistogram function to update the plot
//     initHistogram(selection);
// }

// // Create function to handle change in dropdown menu
// function optionChanged(selection) {
//     // Call updateChart function with the new selection
//     updateChart(selection);
// }
    
// // Get the first selection to initialize the plot
// var firstSelection = dropdownOptions[0];

// // Initialize the plot
// initHistogram(firstSelection);

// // Set up event listener for when a new option is selected
// dropdownMenu.on("change", function() {
//     // Get the new selection
//     var newSelection = d3.select(this).property("value");
//     // Call the optionChanged function with the new selection
//     optionChanged(newSelection);
// });
// });


// Original Notes:

// Write createHistogram function to create a histogram of the price data.

// Use the .filter function to filter the data to only the Staten Island neighborhood.

// function createHistogram(sample) {

//     var filteredData = sample.filter(d => d.neighbourhood_group === neighbourhoodGroup);

//     var filteredPrice = filteredData.map(d => d.price);

//     var trace = {
//         x: filteredPrice,
//         type: "histogram"
//     };

//     var data = [trace];

//     var layout = {
//         title: "Brooklyn Price Distribution",
//         xaxis: { title: "Price", range: [0,1300] },
//         yaxis: { title: "Count" }
//     };

//     Plotly.newPlot("histogram", data, layout);
// }

// Test the other neighbourhood groups to view their price distributions. Note: remove range argument from layout to view all data