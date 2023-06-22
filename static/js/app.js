// Create a function to load the dataset using d3.csv

d3.json("http://127.0.0.1:5000/api/data").then(function(data) {
    console.log(data);
}
);
// function loadData(path) {
//     d3.csv(path).then(function(data) {
//         console.log(data);
//     });
// }

// Call the loadData function
// loadData(relative_path);

// Map Visualization



// Price Distribution Visualization (Histogram)

// The purpose of this visualization is to show the distribution of Airbnb listing prices in NYC, filtered by neighborhood.

// The user selects a neighborhood from the dropdown menu, and the histogram will update to show the distribution of prices for that neighborhood.

// The histogram will also update to show the distribution of prices for the entire city when the user selects "All Neighborhoods" from the dropdown menu.


// Step 1: Load the data

// function loadDataset(path) {
//     d3.csv(path).then(function(data) {

        // Create variables for each column in the dataset

        // The only columns we need for this visualization are "neighbourhood_group" and "price"
        // var id = data.id;
        // var name = data.name;
        // var host_id = data.host_id;
        // var host_name = data.host_name;
        // var neighbourhood_group = data.neighbourhood_group;
        // var neighbourhood = data.neighbourhood;
        // var latitude = data.latitude;
        // var longitude = data.longitude;
        // var room_type = data.room_type;
        // var price = data.price;

//         // Step 2: Prepare the data
        
//         // Create a variable for the dropdown menu
//         var dropdownMenu = d3.select("#selDataset");

//         // Create a variable containing the unique values for the "neighbourhood_group" column
//         var neighbourhoodGroups = data.map(data => data.neighbourhood_group).filter((value, index, self) => self.indexOf(value) === index);

//         // Create a variable containing the unique values for the "neighbourhood" column
//         var neighbourhoods = data.map(data => data.neighbourhood).filter((value, index, self) => self.indexOf(value) === index);

//         // Console log the neighbourhoodGroups and neighbourhoods to make sure they're working
//         console.log(neighbourhoodGroups);
//         console.log(neighbourhoods);

//         // Note: There are 5 neighbourhood groups and 221 neighbourhoods in NYC. It makes more sense to filter by neighbourhood group than by neighbourhood.
        
//         // Create a variable for dropdown menu options
//         var dropdownOptions = dropdownMenu.selectAll("option")
//             .data(neighbourhoodGroups)
//             .enter()
//             .append("option")
//             .text(function(d) {
//                 return d;
//             }
//         );
        
//         // Step 3: Initialize the visualization

//         // Create a function to create a histogram of listing prices
//         function createHistogram(neighbourhoodGroup) {
                
//                 // Filter the data by neighbourhood group
//                 var filteredData = data.filter(data => data.neighbourhood_group === neighbourhoodGroup);
    
//                 // Create a variable for the listing prices
//                 var prices = filteredData.map(data => data.price);
    
//                 // Create a variable for the histogram layout
//                 var layout = {
//                     title: "Price Distribution",
//                     xaxis: {title: "Price"},
//                     yaxis: {title: "Count"}
//                 };
    
//                 // Create a variable for the histogram data
//                 var trace = {
//                     x: prices,
//                     type: "histogram"
//                 };
    
//                 // Create a variable for the histogram data
//                 var histogramData = [trace];
    
//                 // Create a variable for the histogram plot
//                 var plot = document.getElementById("plot");
    
//                 // Plot the histogram
//                 Plotly.newPlot(plot, histogramData, layout);
//             }

//         // Step 4: Update the visualization

//         // Create a function to update the histogram when the user selects a new neighbourhood group from the dropdown menu
//         function updateHistogram(neighbourhoodGroup) {
//             // Recall the createHistogram function to update the chart
//             createHistogram(neighbourhoodGroup);
//         }

//         // Get the initial value for the dropdown menu. Note: ideally, the default will be "All Neighborhoods", but for now it's "Brooklyn"
//         var initialNeighbourhoodGroup = neighbourhoodGroups[0];

//         console.log(initialNeighbourhoodGroup);

//         // Call the createHistogram function to initialize the visualization
//         createHistogram(initialNeighbourhoodGroup);

//         // Set up the event listener to update the histogram when the user selects a new neighbourhood group from the dropdown menu
//         dropdownMenu.on("change", function() {
//             // Retreive the value of the dropdown menu
//             var selectedNeighbourhoodGroup = d3.select(this).property("value");

//             // Update the histogram
//             updateHistogram(selectedNeighbourhoodGroup);
//         });
//     });
// }

// // Call the loadDataset function
// loadDataset(relative_path);


// // Room Type Visualization
