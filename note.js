var SmallMults, addCommas, formatNumber, plotData, roundNumber, shortenNumber;

SmallMults = function() {
  var chart, colorScale, createLegend, data, drawChart, drawDetails, getPosition, graphHeight, graphWidth, height, hideAnnotation, hideDetail, scaleFactor, setScales, showAnnotation, showDetail, toggleHidden, width, xScale, yPadding, yScale;
  width = 200;
  height = 160;
  graphWidth = 180;
  graphHeight = 140;
  yPadding = 12;
  data = [];
  xScale = d3.scale.ordinal().rangeRoundBands([0, graphWidth], 0.1);
  colorScale = d3.scale.ordinal().range(["#ff7f0e", "#1f77b4", "#2ca02c", "#d62728", "#8c564b", "#9467bd"]);
  yScale = d3.scale.linear().range([0, graphHeight - yPadding]);
  scaleFactor = 4;
  chart = function(selection) {
    return selection.each(function(rawData) {
      var pre, previews, svgs;
      data = rawData;
      setScales();
      createLegend();
      pre = d3.select(this).select("#previews").selectAll(".preview").data(data);
      pre.enter().append("div").attr("class", "preview").attr("width", width).attr("height", height);
      svgs = pre.append("svg").attr("width", width).attr("height", height);
      previews = svgs.append("g");
      previews.each(drawChart);
      return previews.append("rect").attr("width", graphWidth).attr("height", graphHeight).attr("class", "mouse_preview").on("click", showDetail);
    });
  };
  drawChart = function(d, i) {
    var base, graph;
    base = d3.select(this);
    base.append("rect").attr("width", graphWidth).attr("height", graphHeight).attr("class", "background");
    graph = base.append("g");
    graph.selectAll(".bar").data(function(d) {
      return d.values;
    }).enter().append("rect").attr("x", function(d) {
      return xScale(d.name);
    }).attr("y", function(d) {
      return graphHeight - yScale(d.value) - yPadding;
    }).attr("width", xScale.rangeBand()).attr("height", function(d) {
      return yScale(d.value);
    }).attr("fill", function(d) {
      return colorScale(d.name);
    }).on("mouseover", showAnnotation).on("mouseout", hideAnnotation);
    return graph.append("text").text(function(d) {
      return d.year;
    }).attr("class", "title").attr("text-anchor", "middle").attr("x", graphWidth / 2).attr("dy", "1.3em");
  };
  drawDetails = function(d, i) {
    var graph;
    graph = d3.select(this);
    graph.selectAll(".name").data(d.values).enter().append("text").attr("class", "name").text(function(d) {
      return d.name;
    }).attr("text-anchor", "middle").attr("y", graphHeight - yPadding).attr("dy", "1.3em").attr("x", function(d) {
      return xScale(d.name) + xScale.rangeBand() / 2;
    }).attr("font-size", 8);
    return graph.selectAll(".amount").data(d.values).enter().append("text").attr("class", "amount").text(function(d) {
      if (d.value === 0) {
        return "No Data";
      } else {
        return shortenNumber(d.value);
      }
    }).attr("text-anchor", "middle").attr("y", function(d) {
      return graphHeight - yScale(d.value) - yPadding;
    }).attr("dy", function(d) {
      if (yScale(d.value) < 10) {
        return "-0.3em";
      } else {
        return "1.1em";
      }
    }).attr("x", function(d) {
      return xScale(d.name) + xScale.rangeBand() / 2;
    }).attr("font-size", 5);
  };
  showDetail = function(d, i) {
    var detailG, detailView, main, pos, scrollTop;
    toggleHidden(true);
    detailView = d3.select("#detail_view");
    detailView.selectAll('.main').remove();
    detailG = detailView.selectAll('g').data([d]).enter();
    main = detailG.append("g").attr("class", "main");
    main.each(drawChart);
    main.each(drawDetails);
    main.on("click", function() {
      return hideDetail(d, i);
    });
    d3.select("#detail").on("click", function() {
      return hideDetail(d, i);
    });
    pos = getPosition(i);
    scrollTop = $(window).scrollTop();
    main.attr('transform', "translate(" + pos.left + "," + (pos.top - scrollTop) + ")");
    return main.transition().delay(500).duration(500).attr('transform', "translate(" + 40. + "," + 0. + ") scale(" + scaleFactor + ")");
  };
  hideDetail = function(d, i) {
    var pos, scrollTop;
    pos = getPosition(i);
    scrollTop = $(window).scrollTop();
    return d3.selectAll('#detail_view .main').transition().duration(500).attr('transform', "translate(" + pos.left + "," + (pos.top - scrollTop) + ")").each('end', function() {
      return toggleHidden(false);
    });
  };
  toggleHidden = function(show) {
    d3.select("#previews").classed("hidden", show).classed("visible", !show);
    return d3.select("#detail").classed("hidden", !show).classed("visible", show);
  };
  showAnnotation = function(d) {
    var graph;
    graph = d3.select("#detail_view .main");
    graph.selectAll(".subtitle").remove();
    return graph.selectAll(".subtitle").data([d]).enter().append("text").text((formatNumber(d.percent_world * 100)) + "% of Worldwide Emissions").attr("class", "subtitle").attr("fill", function(d) {
      return colorScale(d.name);
    }).attr("text-anchor", "middle").attr("dy", "3.8em").attr("x", function(d) {
      return graphWidth / 2;
    }).attr("font-size", 8);
  };
  hideAnnotation = function(d) {
    var graph;
    graph = d3.select("#detail_view .main");
    return graph.selectAll(".subtitle").remove();
  };
  setScales = function() {
    var names, yMax;
    yMax = d3.max(data, function(d) {
      return d3.max(d.values, function(e) {
        return e.value;
      });
    });
    yScale.domain([0, yMax + 500000]);
    names = data[0].values.map(function(d) {
      return d.name;
    });
    xScale.domain(names);
    return colorScale.domain(names);
  };
  getPosition = function(i) {
    var el, pos;
    el = $('.preview')[i];
    pos = $(el).position();
    return pos;
  };
  createLegend = function() {
    var keys, legend;
    legend = d3.select("#legend").append("svg").attr("width", 100).attr("height", 300);
    keys = legend.selectAll("g").data(data[0].values).enter().append("g").attr("transform", function(d, i) {
      return "translate(" + 0 + "," + (40 * (i + 1)) + ")";
    });
    keys.append("rect").attr("width", 30).attr("height", 30).attr("fill", function(d) {
      return colorScale(d.name);
    });
    return keys.append("text").text(function(d) {
      return d.name;
    }).attr("text-anchor", "left").attr("dx", "2.2em").attr("dy", "1.2em");
  };
  return chart;
};

addCommas = function(number) {
  var dec, num, rgx, values;
  number += '';
  values = number.split('.');
  num = values[0];
  dec = values.length > 1 ? '.' + values[1] : '';
  rgx = /(\d+)(\d{3})/;
  while (rgx.test(num)) {
    num = num.replace(rgx, '$1' + ',' + '$2');
  }
  return num + dec;
};

roundNumber = function(number, decimals) {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

formatNumber = function(number) {
  return addCommas(roundNumber(number, 0));
};

shortenNumber = function(number) {
  if (number > 1000000) {
    return addCommas(roundNumber(number / 1000000, 1)) + "M";
  } else if (number > 1000) {
    return addCommas(roundNumber(number / 1000, 0)) + "K";
  } else {
    return addCommas(roundNumber(number, 0));
  }
};

plotData = function(selector, data, plot) {
  return d3.select(selector).datum(data).call(plot);
};

$(function() {
  var display, plot;
  plot = SmallMults();
  display = function(data) {
    return plotData("#vis", data, plot);
  };
  return d3.json("data/co2_kt_data.json", display);
});

// ---
// generated by coffee-script 1.9.2