// In the mapping exercise, we used the http module to create a web server.

// Javascript can't get files from your computer, but it can get them from a web server.

// JavaScript wants information.

// Get Data:

// Draft II:

// Use d3.json() to request data from the Flask app
d3.json("http://127.0.0.1:5000/api/data").then(function(data) {
  console.log(data);

  // Create a variable for a dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  // Set unique neighbourhood groups as dropdown options
  var dropdownOptions = [...new Set(data.map(d => d.neighbourhood_group))];

  // Append dropdown options to the dropdown menu
  dropdownOptions.forEach(function(option) {
    dropdownMenu.append("option").text(option).property("value", option);
  });

  // Initialize function to create histogram of price data
  function initHistogram(selection) {
    // Fillter data to only include selected neighbourhood group
    var filteredData = data.filter(d => d.neighbourhood_group === selection);
    // Create array of price data
    var filteredPrice = filteredData.map(d => d.price);

    // Create a variable for a string to be concatenated in the title of the histogram for each neighbourhood group
    var title = "";
    // Set title for Bronx
    if (selection === "Bronx") {
        title = "Bronx Airbnb Listing Price Distribution";
    }
    // Set title for Brooklyn
    else if (selection === "Brooklyn") {
        title = "Brooklyn Airbnb Listing Price Distribution";
    }
    // Set title for Manhattan
    else if (selection === "Manhattan") {
        title = "Manhattan Airbnb Listing Price Distribution";
    }
    // Set title for Queens
    else if (selection === "Queens") {
        title = "Queens Airbnb Listing Price Distribution";
    }
    // Set title for Staten Island
    else if (selection === "Staten Island") {
        title = "Staten Island Airbnb Listing Price Distribution";
    }

    // Set the color of the histogram bars to be unique for each neighbourhood group
    var color = "";
    // Set Bronx to be Purple
    if (selection === "Bronx") {
        color = "purple";
    }
    // Set Brooklyn to be Blue
    else if (selection === "Brooklyn") {
        color = "blue";
    }
    // Set Manhattan to be Red
    else if (selection === "Manhattan") {
        color = "red";
    }
    // Set Queens to be Green
    else if (selection === "Queens") {
        color = "green";
    }
    // Set Staten Island to be Orange
    else if (selection === "Staten Island") {
        color = "orange";
    }   

    // Create trace for histogram
    var trace = {
      x: filteredPrice,
      type: "histogram",
        marker: {
            color: color,
            line: {
                color: "black",
                width: 1
            }
        }
    };
    // Create data array for plot
    var plotData = [trace];
    // Create layout for plot
    var layout = {
      title: title,
      xaxis: { title: "Price", range: [-25, 500]},
      yaxis: { title: "Count" }
    };
    // Plot the histogram
    Plotly.newPlot("histogram", plotData, layout);
  }

  // Create function to update histogram when a new option is selected calling updateChart
  function updateChart(selection) {
    // Call the initHistogram function to update the plot
    initHistogram(selection);
  }

  // Create function to handle change in dropdown menu
  function optionChanged(selection) {
    // Call updateChart function with the new selection
    updateChart(selection);
  }

  // Get the first selection to initialize the plot
  var firstSelection = dropdownOptions[0];

  // Initialize the plot
  initHistogram(firstSelection);

  // Set up event listener for when a new option is selected
  dropdownMenu.on("change", function() {
    // Get the new selection
    var newSelection = d3.select(this).property("value");
    // Call the optionChanged function with the new selection
    optionChanged(newSelection);
  });
}).catch(function(error) {
  console.log("Error retrieving data:", error);
});


// Note: My goal is to set the range of the histogram to be within 2 standard deviations of the mean.







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