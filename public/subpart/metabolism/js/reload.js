// From VisualizeSBML (github)
function reloadCanvas() {
  var cy = window.cy;
  var layout = cy.layout({
      name: 'cose',
      nodeOverlap: 20,
        componentSpacing: 100,
        nodeRepulsion: 550000,
        edgeElasticity: 100,
        directed: true,
        nestingFactor: 5,
        padding: 10,
        animate: true,
  });
  layout.run();
  console.log('reload');
}
