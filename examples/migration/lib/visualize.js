const d3 = require('d3');

export const drawGrid = (data,colors) => {
    var width = 600;
    var height = 600;
    var grid_length = data.length;

    var svg = d3.select('body').append('svg')
          .attr('width', width)
          .attr('height', height);

    var rw = Math.floor(width/grid_length);
    var rh = Math.floor(height/grid_length);

    var g = svg.selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', function (d, i) {
              return 'translate(0, ' + (width/grid_length) * i + ')';
            });

    g.selectAll('rect')
            .data(function (d) {
              return d;
            })
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
              return (width/grid_length) * i;
            })
            .attr('width', rw)
            .attr('height', rh)
            .attr('class',function(d) {
              return d;
            });
    if (!colors) {
    	d3.selectAll('.A1A1').style('fill','#fff');
        d3.selectAll('.A1A2').style('fill','#2176c9');
        d3.selectAll('.A2A2').style('fill','#042029');
    }
    else {
        for (var i = 0; i < colors.length; i = i + 2) {
            d3.selectAll('.'+colors[i]).style('fill',colors[i+1]);	
        }
    }
};

export const updateGrid = (data,colors) => {
    var grid_length = data.length;
    d3.select('svg').selectAll('g')
        .data(data)
        .selectAll('rect')
        .data(function (d) {
          return d;
        })
        .attr('class',function(d) {
          return d;
        });
    if (!colors) {
    	d3.selectAll('.A1A1').style('fill','#fff');
        d3.selectAll('.A1A2').style('fill','#2176c9');
        d3.selectAll('.A2A2').style('fill','#042029');
    }
    else {
        for (var i = 0; i < colors.length; i = i + 2) {
            d3.selectAll('.'+colors[i]).style('fill',colors[i+1]);	
        }
    }
};
