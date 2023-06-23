var relative_path = "../../data/AB_NYC_2019.csv";
var statenData ="/api/staten_island";


// Create a function to load the dataset using d3.csv
// function loadData(path) {
//     d3.csv(path).then(function(data) {
//         console.log(data);
//         mapData(data);

//     });
// }

//Function to call in JSON data (API CALL)
function loadData() {
    d3.json(statenData).then(function(data) {
        console.log(data);
        mapData(data);

    });
}

// d3.json("/api/staten_island").then(function(data) {
//     console.log(data);
// }
// );


// Call the loadData function
loadData(statenData);



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
            markers.addLayer(L.marker([row.latitude, row.longitude]));
            // map.addLayer(markers);

            // var marker = L.marker([row.latitude, row.longitude], {
            //     opacity: 1
            // }).bindPopup(row.Title);

            markers.addTo(map);
        }


    } catch (error) {

        console.error('invalid data received', error);

    }
}
}





