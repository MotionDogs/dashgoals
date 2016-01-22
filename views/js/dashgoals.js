var dashgoals_data;
var dashgoals_chart;

function bar_chart_goals(widget_name, chart_details){
	
	dashgoals_data = chart_details.data;
	
	//console.log(chart_details);	
	
    nv.addGraph(function() {
            var chart = nv.models.multiBarChart()
            	.showControls(false)
                .stacked(true);
                
            var contentGenerator = chart.tooltip.contentGenerator();
            var tooltip = chart.tooltip;
            tooltip.contentGenerator(function(dashgoals_data){     
	                
	            key = dashgoals_data.data.key;

				if (key == 'sales_real') {
					var result = '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + formatCurrency(parseInt(dashgoals_data.data.sales), currency_format, currency_sign, currency_blank) + '</strong><br />(' + formatCurrency(parseInt(dashgoals_data.data.goal), currency_format, currency_sign, currency_blank) + ')<br/>';
					if (dashgoals_data.data.sales > dashgoals_data.data.goal)
						result += '<span class="dash_trend dash_trend_up">+';
					else
						result += '<span class="dash_trend dash_trend_down">';
					result += dashgoals_data.data.goal_diff + '%</span></div>';
					return result;
				} else if (key == 'sales_less') {
					if (dashgoals_data.data.sales > 0)
						return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br /><span class="dash_trend dash_trend_down">' + formatCurrency(parseInt(dashgoals_data.data.goal_diff), currency_format, currency_sign, currency_blank) + '</span></div>';
					else
						return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br />(' + formatCurrency(parseInt(dashgoals_data.data.goal), currency_format, currency_sign, currency_blank) + ')</div>';
				} else if (key == 'sales_more')
					return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br /><span class="dash_trend dash_trend_up">+' + formatCurrency(parseInt(dashgoals_data.data.goal_diff), currency_format, currency_sign, currency_blank) + '</span></div>';
				else if (key == 'avg_cart_value_real') {
					var result = '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + formatCurrency(parseInt(dashgoals_data.data.avg_cart_value), currency_format, currency_sign, currency_blank) + '</strong><br />(' + formatCurrency(parseInt(dashgoals_data.data.goal), currency_format, currency_sign, currency_blank) + ')<br/>';
					if (dashgoals_data.data.avg_cart_value > dashgoals_data.data.goal)
						result += '<span class="dash_trend dash_trend_up">+';
					else
						result += '<span class="dash_trend dash_trend_down">';
					result += dashgoals_data.data.goal_diff + '%</span></div>';
					return result;
				} else if (key == 'avg_cart_value_less') {
					if (dashgoals_data.data.avg_cart_value > 0)
						return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br /><span class="dash_trend dash_trend_down">' + formatCurrency(parseInt(dashgoals_data.data.goal_diff), currency_format, currency_sign, currency_blank) + '</span></div>';
					else
						return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br />(' + formatCurrency(parseInt(dashgoals_data.data.goal), currency_format, currency_sign, currency_blank) + ')</div>';
				} else if (key == 'avg_cart_value_more')
					return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br /><span class="dash_trend dash_trend_up">+' + formatCurrency(parseInt(dashgoals_data.data.goal_diff), currency_format, currency_sign, currency_blank) + '</span></div>';
				else if (key == 'traffic_real') {
					var result = '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + dashgoals_data.data.traffic + ' ' +chart_details.data[dashgoals_data.index].unit_text+'</strong><br />(' + dashgoals_data.data.goal + ' ' +chart_details.data[dashgoals_data.data.series].unit_text+')<br/>';
					if (dashgoals_data.data.traffic > dashgoals_data.data.goal)
						result += '<span class="dash_trend dash_trend_up">+';
					else
						result += '<span class="dash_trend dash_trend_down">';
					result += dashgoals_data.data.goal_diff + '%</span></div>';
					return result;
				} else if (key == 'traffic_less') {
					if (dashgoals_data.data.traffic > 0)
						return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br /><span class="dash_trend dash_trend_down">' + dashgoals_data.data.goal_diff + ' ' +chart_details.data[dashgoals_data.data.series].unit_text+'</span></div>';
					else
						return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br />(' + dashgoals_data.data.goal + ' ' +chart_details.data[dashgoals_data.data.series].unit_text+')</div>';
				} else if (key == 'traffic_more')
					return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.index].zone_text + '</strong><br /><span class="dash_trend dash_trend_up">+' + dashgoals_data.data.goal_diff + ' ' +chart_details.data[dashgoals_data.index].unit_text+'</span></div>';
				else if (key == 'conversion_real') {
					var result = '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + dashgoals_data.data.conversion + '%</strong><br />(' + dashgoals_data.data.goal + '%)</strong><br/>';
					if (dashgoals_data.data.conversion  > dashgoals_data.data.goal)
						result += '<span class="dash_trend dash_trend_up">+';
					else
						result += '<span class="dash_trend dash_trend_down">';
					result += dashgoals_data.data.goal_diff + '%</span></div>';
					return result;
				} else if (key == 'conversion_less') {
					if (dashgoals_data.data.conversion > 0)
						return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br /><span class="dash_trend dash_trend_down">' + dashgoals_data.data.goal_diff + '%</span></div>';
					else
						return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + chart_details.data[dashgoals_data.index].title + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br />(' + dashgoals_data.data.goal + '%)</div>';
				} else if (key == 'conversion_more'){
					return '<div class="tooltip-panel"><div class="tooltip-panel-heading">' + dashgoals_data.value + '</div><strong>' + chart_details.data[dashgoals_data.data.series].zone_text + '</strong><br /><span class="dash_trend dash_trend_up">+' + dashgoals_data.data.goal_diff + '%</span></div>';
				}
	           //return contentGenerator(chart_details.series.key);
	        });

			chart.yAxis.tickFormat(d3.format('.1f'));
			dashgoals_chart = chart;
	
			d3.select('#dash_goals_chart1 svg')
				.datum(chart_details.data)
				.transition()
				.call(chart);
	
			$('#dash_goals_chart1 .nv-legendWrap').remove();
	
			nv.utils.windowResize(chart.update);

            return chart;
    });
}




function selectDashgoalsChart(type)
{
	if (type !== false)
	{
		$.each(dashgoals_data, function(index, value) {
			if (value.key == type + '_real' || value.key == type + '_more' || value.key == type + '_less')
				value.disabled = false;
			else
				value.disabled = true;
		});
	}
	dashgoals_toggleDashConfig();
}

/* 	Refresh dashgoals chart when coming from the config panel
	Called from /js/admin-dashboard.js: toggleDashConfig() */
function dashgoals_toggleDashConfig()
{
	d3.select('#dash_goals_chart1 svg')
		.datum(dashgoals_data)
		.transition()
		.call(dashgoals_chart);
	nv.utils.windowResize(dashgoals_chart.update);
}

/* 	Calculate Sales based on the traffic, average cart value and conversion rate */
function dashgoals_calc_sales()
{
	$('.dashgoals_sales').each(function() {
		var key = $(this).attr('id').substr(16);
		var sales = parseFloat($('#dashgoals_traffic_' + key).val()) * parseFloat($('#dashgoals_avg_cart_value_' + key).val()) * parseFloat($('#dashgoals_conversion_' + key).val()) / 100;
		if (isNaN(sales))
			$(this).text(formatCurrency(0, currency_format, currency_sign, currency_blank));
		else
			$(this).text(formatCurrency(parseInt(sales), currency_format, currency_sign, currency_blank));
	});
}

function dashgoals_changeYear(xward)
{
	var new_year = dashgoals_year;
	if (xward == 'forward')
		new_year = dashgoals_year + 1;
	else if (xward == 'backward')
		new_year = dashgoals_year - 1;

	$.ajax({
		url: dashgoals_ajax_link,
		data: {
			ajax: true,
			action: 'changeconfyear',
			year: new_year
		},
		success : function(result){
			$('#dashgoals_title').text($('#dashgoals_title').text().replace(dashgoals_year, new_year));
			var hide_conf = $('#dashgoals_config').hasClass('hide');
			$('#dashgoals_config').replaceWith(result);
			dashgoals_calc_sales();
			if (!hide_conf)
				$('#dashgoals_config').removeClass('hide');
			$('.dashgoals_config_input').off();
			$('.dashgoals_config_input').keyup(function() { dashgoals_calc_sales(); });
			dashgoals_year = new_year;
			refreshDashboard('dashgoals', false, dashgoals_year);
		}
	});
}

$(document).ready(function() {
	$('.dashgoals_config_input').keyup(function() { dashgoals_calc_sales(); });
	dashgoals_calc_sales();
});
