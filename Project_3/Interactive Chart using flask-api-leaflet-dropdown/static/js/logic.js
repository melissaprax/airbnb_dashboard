// Event Listener that enacts when the dropdown changes
// I could have used the D3 method for adding an event handler
let year = document.querySelector('#sel_year');
      year.addEventListener('change', function(){
        // update map based on year
        selectDataSource()
      });

// updates the geojson layer based on the selected dropdown choice
// updates the styles and the popups
// note:  geojson.eachLayer accesses each layer already added to the map
// note2: each layer is a shape on the map (single feature that includes properties and geometry info)
function selectDataSource(feature){

  // grabs value from dropdown - I could have used D3 instead
  // note: this is just overwriting a part of the geojson variable
  let yearSelected = document.querySelector('#sel_year').value;
  geojson.eachLayer(function(layer){
    let suicideRate = eval(`layer.feature.properties.` + yearSelected)
    layer.setStyle({
      fillColor: getColor(suicideRate),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '1',
      fillOpacity: 0.7
    });
    layer.bindPopup("Country: " + layer.feature.properties.country + "<br>Suicides:<br>" + suicideRate);
  });
}

// sets the shape properties (colors, lines, etc)
// only runs once when the map loads
function customStyles(feature){
  return {
    fillColor: getColor(feature.properties.s2017),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '1',
    fillOpacity: 0.7
  };
}

// only chnages the color
// note scale does not change with dropdown change
function getColor(d) {
  return d > 90   ? '#800026' :
          d > 70   ? '#BD0026' :
          d > 50   ? '#E31A1C' :
          d > 40   ? '#FC4E2A' :
          d > 30   ? '#FD8D3C' :
          d > 20   ? '#FEB24C' :
          d > 10   ? '#FED976' :
                    '#FFEDA0';
}


// ***********************************************
// Creating map object
let myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});


// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Load in geojson data
// load via server path - used when developing graphic
// let geoData = "static/data/allData_reduced.geojson";
// Load via an api - used after flask route was created
let geoData = "/api/v1.0/boundaries"

// Defined outside function so this variable can be used in other places in the code
let geojson;

// Grab data with d3
d3.json(geoData).then(function(data) {

  // Creating a layer for each feature/properties json object
  // Every feature (in this case country data - properties, geomtry) has functions below acted on itself - like a for loop
  // Only runs once on page load but objects in geojson persists and can be accessed and updated
  geojson = L.geoJson(data,{
    // Set styles for SVG objects for each layer
    style: customStyles,
    // Set code to run on each feature 
    onEachFeature: function(feature, layer) {
      // accesses the layer and adds popup
      layer.bindPopup("Country: " + feature.properties.country + "<br>Suicides:<br>" + feature.properties.s2017);
      // accesses the layer and runs function countryClicked() on each click
      layer.on({click: countryClicked});      
    }
  }).addTo(myMap);


// on country click, the name of the country is returned
function countryClicked(e){
  // grabs country name of clicked object
  let countrySelected = e.target.feature.properties.country;
  console.log("country clicked", countrySelected);
  
  // function that takes the country as an input and updates other plots
  otherPlots(countrySelected);
}

// code for updating plots goes here
function otherPlots(countrySelected){
  // call functions that update plots
}

// create legend
function addLegend(){
  // Set up the legend
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = [0, 10, 20, 30, 40, 50, 70, 90];
    let colors = ['#FFEDA0','#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026' ]
    let labels = [];

    // Add min & max
    let legendInfo = "<h1>Suicides</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Add legend to the map
  legend.addTo(myMap);
}

// add legend on page load
addLegend()
  

});


