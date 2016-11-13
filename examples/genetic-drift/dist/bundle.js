(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["geneticDrift"] = factory();
	else
		root["geneticDrift"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var drawLineChart = __webpack_require__(1).drawLineChart;
	
	var round = __webpack_require__(2).round;
	
	var N = 1000;
	var generations = 1000;
	var data = Array(generations).fill(1);
	
	var nextGeneration = function (n) {
	  return function (p) {
	    return Array(n * 2).fill(1).map(function (x) {
	      return Math.random() < p;
	    }).filter(function (a1) {
	      return a1;
	    }).length / (n * 2);
	  };
	};
	
	var nextGenerationKIndividuals = nextGeneration(N);
	
	data.forEach(function (p, i, a) {
	  return a[i] = nextGenerationKIndividuals(a[i - 1] || 0.5);
	});
	
	drawLineChart(data, "Generation", "p", ["Population Size:", N, "Generations:", generations]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var drawLineChart = function (data, x_label, y_label, legend_values, x_max, y_max_flex) {
	    var margin = { top: 20, right: 20, bottom: 50, left: 50 },
	        width = 700 - margin.left - margin.right,
	        height = 400 - margin.top - margin.bottom;
	
	    var version = d3.scale ? 3 : 4;
	    var color = version == 3 ? d3.scale.category10() : d3.scaleOrdinal(d3.schemeCategory10);
	
	    if (!x_max) {
	        x_max = data[0].length > 0 ? data[0].length : data.length;
	    }
	
	    var y_max = data[0].length > 0 ? d3.max(data, function (array) {
	        return d3.max(array);
	    }) : d3.max(data);
	
	    var x = (version == 3 ? d3.scale.linear() : d3.scaleLinear()).domain([0, x_max]).range([0, width]);
	
	    var y = y_max_flex ? (version == 3 ? d3.scale.linear() : d3.scaleLinear()).domain([0, 1.1 * y_max]).range([height, 0]) : (version == 3 ? d3.scale.linear() : d3.scaleLinear()).range([height, 0]);
	
	    var xAxis = version == 3 ? d3.svg.axis().scale(x).orient("bottom") : d3.axisBottom().scale(x);
	
	    var yAxis = version == 3 ? d3.svg.axis().scale(y).orient("left") : d3.axisLeft().scale(y);
	
	    var line = (version == 3 ? d3.svg.line() : d3.line()).x(function (d, i) {
	        var dat = data[0].length > 0 ? data[0] : data;
	        return x(i / (dat.length - 1) * x_max);
	    }).y(function (d) {
	        return y(d);
	    });
	
	    var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").style("text-anchor", "middle").attr("x", width / 2).attr("y", 6).attr("dy", "3em").style("fill", "#000").text(x_label);
	
	    svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("x", -height / 2).attr("dy", "-3.5em").style("text-anchor", "middle").style("fill", "#000").text(y_label);
	
	    if (legend_values.length > 0) {
	        var legend = svg.append("text").attr("text-anchor", "star").attr("y", 30).attr("x", width - 100).append("tspan").attr("class", "legend_title").text(legend_values[0]).append("tspan").attr("class", "legend_text").attr("x", width - 100).attr("dy", 20).text(legend_values[1]).append("tspan").attr("class", "legend_title").attr("x", width - 100).attr("dy", 20).text(legend_values[2]).append("tspan").attr("class", "legend_text").attr("x", width - 100).attr("dy", 20).text(legend_values[3]);
	    } else {
	        svg.selectAll("line.horizontalGridY").data(y.ticks(10)).enter().append("line").attr("x1", 1).attr("x2", width).attr("y1", function (d) {
	            return y(d);
	        }).attr("y2", function (d) {
	            return y(d);
	        }).style("fill", "none").style("shape-rendering", "crispEdges").style("stroke", "#f5f5f5").style("stroke-width", "1px");
	
	        svg.selectAll("line.horizontalGridX").data(x.ticks(10)).enter().append("line").attr("x1", function (d, i) {
	            return x(d);
	        }).attr("x2", function (d, i) {
	            return x(d);
	        }).attr("y1", 1).attr("y2", height).style("fill", "none").style("shape-rendering", "crispEdges").style("stroke", "#f5f5f5").style("stroke-width", "1px");
	    }
	
	    d3.select("body").style("font", "10px sans-serif");
	    d3.selectAll(".axis line").style("stroke", "#000");
	    d3.selectAll(".y.axis path").style("display", "none");
	    d3.selectAll(".x.axis path").style("display", "none");
	    d3.selectAll(".legend_title").style("font-size", "12px").style("fill", "#555").style("font-weight", "400");
	    d3.selectAll(".legend_text").style("font-size", "20px").style("fill", "#bbb").style("font-weight", "700");
	
	    if (data[0].length > 0) {
	        var simulation = svg.selectAll(".simulation").data(data).enter().append("g").attr("class", "simulation");
	
	        simulation.append("path").attr("class", "line").attr("fill", "none").attr("d", function (d) {
	            return line(d);
	        }).style("stroke", function (d, i) {
	            return color(i);
	        });
	    } else {
	        svg.append("path").datum(data).attr("class", "line").attr("fill", "none").attr("d", line).style("stroke", "steelblue");
	    }
	    d3.selectAll(".line").style("fill", "none").style("stroke-width", "1.5px");
	};
	exports.drawLineChart = drawLineChart;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Round value with a specific number of decimals
	 */
	var round = function (value) {
	  var decimals = arguments[1] === undefined ? 2 : arguments[1];
	
	  var shifter = Math.pow(10, decimals);
	  return Math.round(value * shifter) / shifter;
	};
	exports.round = round;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.map