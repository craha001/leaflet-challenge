// Pulling the GeoData
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the geoData for earthquake 
d3.json(geoData).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// Function to determine marker size based on earthquake magnitude
function markerSize(magnitude) {
  return magnitude * 20000; // Adjust this value to scale the marker size appropriately
}

// Function to determine marker color based on earthquake depth with gradient
function markerColor(depth) {
  return depth > 90 ? "#fa3e1e" :
         depth > 70 ? "#fa7f1e" :
         depth > 50 ? "#ffa123" :
         depth > 30 ? "#ffca23" :
         depth > 10 ? "#dbff23" :
                      "#a2ff23";
}

function createFeatures(earthquakeData) {

  // Define a function to run for each feature in the features array.
  // Give each feature a popup that describes the place, time, and magnitude of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(
      `<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>
       <p>Magnitude: ${feature.properties.mag}</p>
       <p>Depth: ${feature.geometry.coordinates[2]} km</p>`
    );
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Add circle markers with customized size and color based on magnitude and depth.
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circle(latlng, {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.geometry.coordinates[2]),
        color: "black",
        weight: 1,
        fillOpacity: 0.75,
        stroke: true
      });
    },
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the satellite base layer
  let satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri, USGS, NOAA',
    maxZoom: 20
  });

  // Create the grayscale base layers.
  let grayscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Grayscale": grayscale,
    "Satellite":satellite
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [grayscale, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Add legend for earthquake depth
  let legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');
    // Add styling for the white box with padding, border, and background color
    div.style.backgroundColor = 'white';
    div.style.padding = '10px';
    div.style.border = '2px solid #ccc';
    div.style.borderRadius = '5px'; // Optional: rounds the corners

    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = ["#a2ff23", "#dbff23", "#ffca23", "#ffa123", "#fa7f1e", "#fa3e1e"];

    // Loop through depth intervals and generate a label with a colored square for each interval.
  for (let i = 0; i < depths.length; i++) {
    div.innerHTML +=
      '<i style="background:' + colors[i] + '; width: 18px; height: 18px; display: inline-block;"></i> ' +
      depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
  }

    return div;
  };

  legend.addTo(myMap);
}
