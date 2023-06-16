// Use D3 to read in 'samples.json' from url.
// Save url to variable.
url = `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`

// Use D3 to fetch data from url.
d3.json(url).then(function(data) {
  console.log(data);
  
  // Create variable for names.
  var names = data.names;
  // Create variable for metadata.
  var metadata = data.metadata;
  // Create variable for samples.
  var samples = data.samples;
  
  // Create variable for dropdown menu.
  var dropdownMenu = d3.select("#selDataset");
  
  // Create variable for dropdown menu options.
  var dropdownOptions = dropdownMenu.selectAll("option")
    .data(names)
    .enter()
    .append("option")
    .text(function(d) {
      return d;
    });

  // Initialize function to create bar chart.
  function initBarChart(sample) {
    // Find the selected sample data
    var selectedSample = samples.find(function(item) {
      return item.id === sample;
    });
    
    // Create variables for bar chart data
    var barChartData = [{
      x: selectedSample.sample_values.slice(0, 10).reverse(),
      y: selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: selectedSample.otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    // Create variable for bar chart layout.
    var barChartLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID" }
    };
    
    // Plot bar chart.
    Plotly.newPlot("bar", barChartData, barChartLayout);
  }
  
  // Initialize function to create bubble chart.
  function initBubbleChart(sample) {
    // Find the selected sample data
    var selectedSample = samples.find(function(item) {
      return item.id === sample;
    });
    
    // Create variables for bubble chart data
    var bubbleChartData = [{
      x: selectedSample.otu_ids,
      y: selectedSample.sample_values,
      text: selectedSample.otu_labels,
      mode: "markers",
      marker: {
        size: selectedSample.sample_values,
        color: selectedSample.otu_ids
      }
    }];

    // Create variable for bubble chart layout.
    var bubbleChartLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" }
    };
    
    // Plot bubble chart.
    Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);
  }
  // Initialize function to create gauge chart.
  function initGaugeChart(sample) {
    // Find the selected metadata
    var selectedMetadata = metadata.find(function(item) {
      return item.id === parseInt(sample);
    });
    
    // Create variables for gauge chart data
    var gaugeChartData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: selectedMetadata.wfreq,
      title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 9] },
        steps: [
          { range: [0, 1], color: "#f0f9e8" },
          { range: [1, 2], color: "#bae4bc" },
          { range: [2, 3], color: "#7bccc4" },
          { range: [3, 4], color: "#43a2ca" },
          { range: [4, 5], color: "#0868ac" },
          { range: [5, 6], color: "#0868ac" },
          { range: [6, 7], color: "#0868ac" },
          { range: [7, 8], color: "#0868ac" },
          { range: [8, 9], color: "#0868ac" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: selectedMetadata.wfreq
        }
      }
    }];
    
    // Create variable for gauge chart layout.
    var gaugeChartLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    
    // Plot gauge chart.
    Plotly.newPlot("gauge", gaugeChartData, gaugeChartLayout);

    // Select the demographic info panel and update its content
    var demographicInfoPanel = d3.select("#sample-metadata");
    demographicInfoPanel.html(""); // Clear existing content

    // Iterate through the selected metadata and append each key-value pair
    Object.entries(selectedMetadata).forEach(([key, value]) => {
    demographicInfoPanel.append("p").text(`${key}: ${value}`);
  });
  }

  // Create function to update all charts when a new sample is selected.
  function updateCharts(sample) {
    // Call the functions to update the charts.
    initBarChart(sample);
    initBubbleChart(sample);
    initGaugeChart(sample);
  }
  
  // Create function to handle dropdown change event.
  function optionChanged(sample) {
    // Update all charts when a new sample is selected.
    updateCharts(sample);
  }
  
  // Get the first sample name to initialize the page.
  var firstSample = names[0];
  
  // Call the functions to initialize the charts.
  initBarChart(firstSample);
  initBubbleChart(firstSample);
  initGaugeChart(firstSample);
  
  // Set up event listener for dropdown change event.
  dropdownMenu.on("change", function() {
    // Get the selected sample.
    var selectedSample = dropdownMenu.property("value");
  
    // Update the charts with the selected sample.
    optionChanged(selectedSample);
  });
});