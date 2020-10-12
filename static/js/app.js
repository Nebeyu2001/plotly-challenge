console.log("hi");

function dashBoard()

{
    var selector = d3.select("#selDataset");
    
    d3.json("samples.json").then((data)=> {

        var sampleNames=data.names;

        // populate the selector with all of the sample Ids

        sampleNames.forEach((sampleId) => {

            selector.append ("option")
            .text(sampleId)
            .property("value",sampleId);
        });

      var  firstId= sampleNames[0];
      buildTable(firstId)
      buildChart(firstId)
    });
}

dashBoard();

function buildTable(sampleId)
{
    var selector = d3.select("#sample-metadata");
    
    d3.json("samples.json").then((data)=> {

        var sampleMetadata=data.metadata;

        var filterData= sampleMetadata.filter(x => x.id==sampleId)
        console.log(filterData); 
        selector.html("")
    Object.entries(filterData[0]).forEach(([key,value]) => {
        var row = selector.append ("tr");
        var cell= row.append("td");
        cell.text(key)
       
        var cell= row.append("td");
        cell.text(`:${value}`)
    })
    })

}

function buildChart(sampleId) {
    d3.json("samples.json").then((data)=> {

        var samples=data.samples;

        var filterData= samples.filter(x => x.id==sampleId)
        console.log(filterData); 
        var otuIds= filterData[0].otu_ids
        var sampleValues=filterData[0].sample_values
        var otulabls = filterData[0].otu_labels

        var bardata=[{
            x:sampleValues.slice(0,10),
            y:otuIds.slice(0,10).map(x=>` OTU ${x}`),
            text:otulabls.slice(0,10),
            type:"bar", orientation:"h"
        }]

        var barlayout={
            title: "Top 10 Bacteria" 
        }

        Plotly.newPlot("bar",bardata,barlayout)

      var bubbledata=[{
          x:otuIds,
          y:sampleValues,
          text:otulabls,
          mode:"markers",
          marker:{
              size:sampleValues
          }
        
      }]
      var bubblelayout={
        title: "Top 10 Bacteria" 
    }

    Plotly.newPlot("bubble",bubbledata,bubblelayout)

    })
}
function optionChanged(newId) {
    buildTable(newId)
    buildChart(newId)
}