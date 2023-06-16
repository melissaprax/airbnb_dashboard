// Import d3 libary and create a function to load the data

// Save the data source in a variable
csv_path = "data/AB_NYC.csv"

function loadData(csv_path) {
    d3.csv(csv_path).then(function(data) {
        console.log(data);
    });
}

