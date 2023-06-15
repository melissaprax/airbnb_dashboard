# Background Research & Inspirations for Airbnb Dashboard

This readme provides an overview of potential interactive visualizations for an Airbnb dashboard based on a JavaScript implementation. The visualizations mentioned below can be used to explore the provided Airbnb dataset.

## Map Visualization
- HighCharts: Utilize a tiled web map with points of interest to visualize the Airbnb listings on a map. You can find an example implementation using HighCharts at [Tiled Web Map with Points of Interest](https://www.highcharts.com/demo/maps/twm-oslo-attractions).
- Leaflet: Display markers with custom icons to represent Airbnb listings on a map. You can refer to the Leaflet documentation's [Custom Icons example](https://leafletjs.com/examples/custom-icons/) for implementation details.

## Price Distribution
- Histogram: Create a histogram to illustrate the distribution of prices for Airbnb listings. You can find an example implementation using D3.js at [Histogram Example](https://observablehq.com/@d3/histogram/2?).

## Room Type Breakdown
- Stacked Bar Chart: Represent the proportion of each room type using a stacked bar chart. You can refer to the D3.js documentation's [Stacked Bar Chart example](https://observablehq.com/@d3/stacked-bar-chart/2?intent=fork) for implementation details.
- Radar Plot: Visualize the room type breakdown using a radar plot. You can find example implementations at:
  - [D3.js Radar Plot](https://d3-graph-gallery.com/spider)
  - [Chart.js Radar Chart](https://www.chartjs.org/docs/latest/charts/radar.html)

## Neighborhood Analysis
- Bar Chart: Compare neighborhoods based on the average price using a bar chart. You can refer to the Chart.js documentation's [Bar Chart example](https://www.chartjs.org/docs/latest/charts/bar.html) for implementation guidance.

## Price & Minimum Nights (Bonus Points)
- Correlation Heatmap: Explore the correlation between price and minimum nights using a heatmap. You can use various JavaScript libraries, such as D3.js or Chart.js, to create this visualization.

## Examples
Here are a few examples of existing Airbnb dashboards and tutorials that can provide inspiration for your project:
1. [Tampa Call-for-Service Dashboard](https://dreisbach.us/articles/building-dashboards-with-django-and-d3/): This dashboard demonstrates the integration of Django, D3.js, and interactive visualizations to analyze call-for-service data.
2. [Adil Moujahid's Interactive Data Visualization](https://adilmoujahid.com/posts/2016/08/interactive-data-visualization-geospatial-d3-dc-leaflet-python/): This tutorial showcases how to build an interactive geospatial data visualization using D3.js, DC.js, Leaflet, and Python.
3. [Billy Nguyen - Airbnb Dashboard](https://www.kaggle.com/code/billynguyen/newyork-airbnb-dashboard): This Kaggle project provides an example of an Airbnb dashboard built with Python and various visualization libraries.