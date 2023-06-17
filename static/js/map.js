csv_path = "../data/AB_NYC_2019.csv"

function loadData(csv_path) {
    d3.csv(csv_path).then(function(data) {
        console.log(data);
    });
}

// Call the function
loadData(csv_path);


// Map Visualization
var mapOptions = {
    center: [40.73, -74.0059],
    zoom: 10
 }

var map = new L.map('map', mapOptions);

var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

map.addLayer(layer);
