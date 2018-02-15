(function () {
  'use strict';

  var onClickButton = function () {
    var html =
      '<form id="uploadForm" class="upload-form" style="display: none;">' +
      '<input id="SBMLFile" name="sbml_file" type="file" accept=".xml,.sbml">' +
      '</form>';
    $('body').append(html);
    $('#SBMLFile').on('change', uploadFile).click();
  };

  var uploadFile = function () {
    var formData = new FormData($('#uploadForm')[0]);
    formData.append('other_data', 999);
    $.ajax({
      url: 'cgi-bin/upload.py',
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      timeout: 10000
    }).done(function (json_str) {
      console.log('done');
			var data = JSON.parse(json_str);
			var cy = window.cy = cytoscape({
				container: document.getElementById('cy'),

				boxSelectionEnabled: false,
				autounselectify: true,

				elements: data,
				layout: {
					name: 'cose',
					directed: true,
					padding: 10,
					animate: true
				},

				style: [
					{
						selector: 'node',
						style: {
							'shape': 'roundrectangle',
							'background-color': '#d5fcd7',
							'border-color': 'black',
							'border-width': 1,
							'width': 80,
							'height': 40,
							'text-valign': 'center',
							'font-size': 12,
							'label': 'data(name)'
						}
					},

					{
						selector: 'node.rxn',
						style: {
							'shape': 'rectangle',
							'background-color': 'white',
							'width': 10,
							'height': 10,
							'label': ''
						}
					},

					{
						selector: 'edge',
						style: {
							'curve-style': 'bezier',
							'width': 1,
							'target-arrow-shape': 'triangle',
							'arrow-scale': 1.3,
							'line-color': 'black',
							'target-arrow-color': 'black'
						}
					},

					{
						selector: 'edge.activation',
						style: {
							'target-arrow-shape': 'circle',
							'arrow-scale': 0.8,
							'target-arrow-fill': 'hollow',
							'line-style': 'dotted'
						}
					},

					{
						selector: 'edge.inhibition',
						style: {
							'target-arrow-shape': 'tee',
							'arrow-scale': 0.8,
							'line-style': 'dashed'
						}
					},

					{
						selector: 'edge.reactant',
						style: {
							'target-arrow-shape': 'none',
						}
					}
				],

			});
		}).fail(function () {
			console.log('fail');
		}).then(function () {
			$('#uploadForm').remove();
		});

	};

	$('button').on('click', onClickButton);
})();
