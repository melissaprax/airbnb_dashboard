// Load data from CSV and console log it

// Save the relative path to the dataset in a variable
var relative_path = "../../data/AB_NYC_2019.csv";

// Save the absolute path to the dataset in a variable
var absolute_path = "C:\Users\e.a.wright\airbnb_dashboard\dashboard\data\AB_NYC_2019.csv";

// Create a function to load the dataset using d3.csv
function loadData(path) {
    d3.csv(path).then(function(data) {
        console.log(data);
    });
}

// Call the loadData function
loadData(relative_path);

// The data is not loading. I am getting "404 (Not Found)"


// q: How do I set the root folder to be the dashboard folder?
// a: 



// Map Visualization



// Price Distribution Visualization (Histogram)

// The purpose of this visualization is to show the distribution of Airbnb listing prices in NYC, filtered by neighborhood.

// The user selects a neighborhood from the dropdown menu, and the histogram will update to show the distribution of prices for that neighborhood.

// The histogram will also update to show the distribution of prices for the entire city when the user selects "All Neighborhoods" from the dropdown menu.


// Set 1: Load the data

// Note: We will expand upon the loadData function to create variables for each relevant column in the dataset.

// function loadDataset(csv_path) {
//     d3.csv(csv_path).then(function(data) {
//         console.log(data);

//         // Create variables for each column in the dataset

//         // The only columns we need for this visualization are "neighbourhood_group" and "price"
//         var id = data.id;
//         var name = data.name;
//         var host_id = data.host_id;
//         var host_name = data.host_name;
//         var neighbourhood_group = data.neighbourhood_group;
//         var neighbourhood = data.neighbourhood;
//         var latitude = data.latitude;
//         var longitude = data.longitude;
//         var room_type = data.room_type;
//         var price = data.price;
//         var minimum_nights = data.minimum_nights;
//         var number_of_reviews = data.number_of_reviews;
//         var last_review = data.last_review;
//         var reviews_per_month = data.reviews_per_month;
//         var calculated_host_listings_count = data.calculated_host_listings_count;
//         var availability_365 = data.availability_365;

//         // Create a variable for the dropdown menu
//         var dropdownMenu = d3.select("#selDataset");

//         // Create a variable containing the unique values for the "neighbourhood_group" column
//         var neighbourhoodGroups = data.map(data => data.neighbourhood_group).filter((value, index, self) => self.indexOf(value) === index);

//         // Console log the unique values for the "neighbourhood_group" column to inspect them
//         console.log(neighbourhoodGroups);
        
//         // Create a variable for dropdown menu options
//         var dropdownOptions = dropdownMenu.property("options");
//     });
// }

// // Call the loadDataset function
// loadDataset(csv_path);


// Room Type Visualization
