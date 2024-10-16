# leaflet-challenge

For this week's challenge, our goal was to use the United States Geological Survey (USGS) to create a visual tool for assessing earthquake data. By importing the geoJson data from their page, I was able
to create a map centered around the U.S. to portray different earthquakes. The visual shows different sized and colored earthquakes. Size is based on the magnitude of the earhquake where as the color correlates to the 
depth in which it occurred. To see the map, simply click the link in the about section. For a better understanding of the code, click on the Leaflet-Part-1 folder and you can see the java script within the js folder. 

The visual has an interactive map which can be moved around to anywhere and show different earthquake information. Each marker popup has information on the location, time, magnitude, and depth of the earthquake. With a legend
on the bottom right, it indicates a color scale for depth which was performed by using the coordinates from USGS. On the map are two different layers, a satellite layer and a grayscale layer. 

To complete this challenge, leaflet.js was used in order to render the interactive maps. Data was pulled from USGS providing real-time earthquake data. And fetching and parsing the data was done with D3.js.

## Contributions:
USGS for the data provided. Chatgpt assisted in the creation of the legend. 
