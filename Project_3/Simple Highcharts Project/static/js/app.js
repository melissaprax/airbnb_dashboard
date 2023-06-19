// function buildPlot() {
//   /* data route */
//   const url = "/api/pals";
//   d3.json(url).then(function(response) {

//     // Plotly Scattermap Geo Understands the format of our data automatically
//     let data = response;

//   // Check to see if data is available
//     console.log(data);

//     let layout = {
//       scope: "usa",
//       title: "Pet Pals",
//       showlegend: true,
//       height: 600,
//       width: 980,
//       geo: {
//         scope: "usa",
//         projection: {
//           type: "albers usa"
//         },
//         showland: true,
//         landcolor: "rgb(217, 217, 217)",
//         subunitwidth: 1,
//         countrywidth: 1,
//         subunitcolor: "rgb(255,255,255)",
//         countrycolor: "rgb(255,255,255)"
//       }
//     };

//     Plotly.newPlot("plot", data, layout);
//   });
// }

// buildPlot();


