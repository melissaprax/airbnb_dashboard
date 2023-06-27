var relative_path = "../../data/AB_NYC_2019.csv";
var apiData ="/api/data";


// Create a function to load the dataset using d3.csv
// function loadData(path) {
//     d3.csv(path).then(function(data) {
//         console.log(data);
//         mapData(data);

//     });
// }

//Function to call in JSON data (API CALL)
function loadData() {
    d3.json(apiData).then(function(data) {
        console.log(data);
        mapData(data);

    });
}

// d3.json("/api/staten_island").then(function(data) {
//     console.log(data);
// }
// );


// Call the loadData function
loadData(apiData);



// Map Visualization
var mapOptions = {
    center: [40.73, -74.0059],
    zoom: 10,
    minZoom: 10,
    maxZoom: 18
 }

var map = new L.map('map', mapOptions);

var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

map.addLayer(layer);

//markers
function mapData(data) {
    var markers = L.markerClusterGroup();

for (var i in data) {
    var row = data[i];
    console.log(row.latitude);
    console.log(row.longitude);

    //full set of data
    //filter by neighborhood

    try {
        if(row.latitude && row.longitude){

            markers.addLayer(L.marker([row.latitude, row.longitude])
            .bindPopup("test"));

            map.addLayer(markers);
            // markers.addTo(map);
        }


    } catch (error) {

        console.error('invalid data received', error);

    }
}
}





