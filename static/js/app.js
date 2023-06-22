// In the mapping exercise, we used the http module to create a web server.

// Javascript can't get files from your computer, but it can get them from a web server.

// JavaScript wants information.

// Get Data:

d3.json("http://127.0.0.1:5000/api/data").then(function(data) {
    console.log(data);
    console.log(data.map(d => d.price))
    createHistogram(data);
}
);


// Write function for only Brooklyn subset

// Use the .filter function to filter the data to only the Staten Island neighborhood.

function createHistogram(sample) {

    var filteredData = sample.filter(d => d.neighbourhood_group === "Brooklyn");

    var filteredPrice = filteredData.map(d => d.price);

    var trace = {
        x: filteredPrice,
        type: "histogram"
    };

    var data = [trace];

    var layout = {
        title: "Brooklyn Price Distribution",
        xaxis: { title: "Price", range: [0,1300] },
        yaxis: { title: "Count" }
    };

    Plotly.newPlot("histogram", data, layout);
}

// Test the other neighbourhood groups to view their price distributions. Note: remove range argument from layout to view all data


