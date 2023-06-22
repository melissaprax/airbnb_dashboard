var relative_path = "../../data/AB_NYC_2019.csv";

const sortedData = data.sort(compareFn);

// function loadData(path) {
//     d3.csv(path); {
//         console.log(data);
//     }

// }

async function getData(path) {
    d3.csv(path);
    console.log(data);
   }

// Create a function to load the dataset using d3.csv
// function loadData(path) {
//     d3.csv(path).then(function(data) {
//         console.log(data);

//         function compareFn(a, b) {
//             if (a is less than b by some ordering criterion) {
//               return -1;
//             }
//             if (a is greater than b by the ordering criterion) {
//               return 1;
//             }
//             // a must be equal to b
//             return 0;
//           }
//         for (let index = binarySearch(function that accepts a key); index < number of markers to display (hard code 15); index++) {
//             const element = array[index];

            // Set up map with defaults for leaflet.js openstreetmaps - done
// If the zoom level goes up, show a set number of results for the area of the map shown
// Clicking on those markers will show the defaults for a result
// If the zoom level is very low, show markers containing the number of results for a larger area
// Clicking on those makers will zoom in and show the results for that area

//it would be ideal to have a sorted table as well by neighborhood (all bouroughs have sorted areeas, and by those would be sorted by lat/lon)
//binary search - recursivee function until you find what you're looking


        // }
        // for (var i in data) {
        //     var row = data[i];
        //     console.log(row.latitude);
        //     console.log(row.longitude);

            //full set of data
            //filter by neighborhood

//             try {

//                 var marker = L.marker([row.latitude, row.longitude], {
//                     opacity: 1
//                 }).bindPopup(row.Title);

//                 marker.addTo(map);


//             } catch (error) {

//                 console.error('invalid data received', error);

//             }
//         }

//     });
// }

// Call the loadData function
loadData(relative_path);



// Map Visualization
var mapOptions = {
    center: [40.73, -74.0059],
    zoom: 10
 }

var map = new L.map('map', mapOptions);

var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

map.addLayer(layer);

//markers






