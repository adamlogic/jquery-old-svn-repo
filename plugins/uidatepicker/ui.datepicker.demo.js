$(document).ready(function () {
	$('#alt').attr({ 'disabled':'disabled' });
	tabs.init();
	// Restore default language after loading French localisation
	$.datepicker.setDefaults($.datepicker.regional['']);
	// Set date picker global defaults - invoke via focus and image button
	$.datepicker.setDefaults({showOn: 'both', buttonImageOnly: true,
		buttonImage: 'img/calendar.gif', buttonText: 'Calendar'});
	// Defaults
	$('#defaultFocus').datepicker({showOn: 'focus'});
	// Invocation
	$('#invokeFocus').datepicker({showOn: 'focus', yearRange: '-5:+5'});
	$('#invokeButton').datepicker({showOn: 'button', buttonImageOnly: false,
		buttonImage: '', buttonText: '...', yearRange: '-7:+7'});
	$('.invokeBoth').datepicker(); // Also Keystrokes
	$('#enableFocus').toggle(
		function () { this.value = 'Enable'; return $.datepicker.disableFor($('#invokeFocus')); },
		function () { this.value = 'Disable'; return $.datepicker.enableFor($('#invokeFocus')); });
	$('#enableButton').toggle(
		function () { this.value = 'Enable'; return $.datepicker.disableFor($('#invokeButton')); },
		function () { this.value = 'Disable'; return $.datepicker.enableFor($('#invokeButton')); });
	$('#enableBoth').toggle(
		function () { this.value = 'Enable'; return $.datepicker.disableFor($('.invokeBoth')[0]); },
		function () { this.value = 'Disable'; return $.datepicker.enableFor($('.invokeBoth')[0]); });
	// Restricting
	$('#restrictControls').datepicker({firstDay: 1, changeFirstDay: false,
		changeMonth: false, changeYear: false});
	$('#restrictDates').datepicker({minDate: new Date(2005, 1 - 1, 26),
		maxDate: new Date(2007, 1 - 1, 26)});
	// Customise
	$('#noWeekends').datepicker({beforeShowDay: $.datepicker.noWeekends});
	$('#nationalDays').datepicker({beforeShowDay: nationalDays});
	// Localisation
	$('#isoFormat').datepicker({dateFormat: 'YMD-'});
	$('#l10nDatepicker').datepicker();
	$('#language').change(localise);
	localise();
	// Date range
	$('.dateRange').datepicker({beforeShow: customRange});
	$('#rangeSelect').datepicker({rangeSelect: true});
	$('#rangeSelect2Months').datepicker({rangeSelect: true, numberOfMonths: 2});
	$('#rangeSelect6Months').datepicker({rangeSelect: true, numberOfMonths: [2, 3],
		stepMonths: 3, prevText: '&lt;&lt; Previous Months', nextText: 'Next Months &gt;&gt;'});
	// Miscellaneous
	$('#openDateJan01').datepicker({defaultDate: new Date(2007, 1 - 1, 1)});
	$('#openDatePlus7').datepicker({defaultDate: +7});
	$('#addSettings').datepicker({closeAtTop: false,
		showOtherMonths: true, onSelect: alertDate});
	$('#linkedDates').datepicker({minDate: new Date(2001, 1 - 1, 1),
		maxDate: new Date(2010, 12 - 1, 31), beforeShow: readLinked,
		onSelect: updateLinked});
	$('#selectMonth,#selectYear').change(checkLinkedDays);
	// Reconfigure
	$('#reconfigureCal').datepicker();
	$('.inlineConfig').datepicker();
	// Inline
	$('.dateInline').datepicker({onSelect: updateInlineRange});
	updateInlineRange();
	$('#rangeInline').datepicker({rangeSelect: true, rangeSeparator: ' to ',
		numberOfMonths: 2, onSelect: updateInlineRange2});
	updateInlineRange2();
	$('#datepicker_div_25').width(370); // Unfortunately not automatic
	// Stylesheets
	$('#altStyle').datepicker();
	$('#button1').click(function() { 
		$.datepicker.showFor($('#invokeFocus')[0]);
	});
	$('#button2').click(function() { 
		$.datepicker.dialogDatepicker($('#invokeDialog').val(),
		setDateFromDialog, {prompt: 'Choose a date', speed: ''});
	});
	$('#button3').click(function() { 
		$.datepicker.dialogDatepicker($('#altDialog').val(),
		setAltDateFromDialog, {prompt: 'Choose a date', speed: ''});
	});
});

function setSpeed(select) {
	$.datepicker.reconfigureFor('#reconfigureCal',
		{speed: select.options[select.selectedIndex].value});
}

function setDateFromDialog(date) {
	$('#invokeDialog').val(date);
}

function setAltDateFromDialog(date) {
	$('#altDialog').val(date);
}

var natDays = [[1, 26, 'au'], [2, 6, 'nz'], [3, 17, 'ie'], [4, 27, 'za'], [5, 25, 'ar'], [6, 6, 'se'],
	[7, 4, 'us'], [8, 17, 'id'], [9, 7, 'br'], [10, 1, 'cn'], [11, 22, 'lb'], [12, 12, 'ke']];
function nationalDays(date) {
	for (i = 0; i < natDays.length; i++) {
		if (date.getMonth() == natDays[i][0] - 1 && date.getDate() == natDays[i][1]) {
			return [false, natDays[i][2] + '_day'];
		}
	}
	return [true, ''];
}

function customRange(input) {
	return {minDate: (input.id == 'dTo' ? getDate($('#dFrom').val()) : null),
		maxDate: (input.id == 'dFrom' ? getDate($('#dTo').val()) : null)};
}

function getDate(value) {
	fields = value.split('/');
	return (fields.length < 3 ? null :
		new Date(parseInt(fields[2], 10), parseInt(fields[1], 10) - 1, parseInt(fields[0], 10)));
}

function alertDate(date) {
	alert('The date is ' + date);
}

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function showDay(input) {
	var date = getDate(input.value);
	$('#inlineDay').empty().html(date ? days[date.getDay()] : 'blank');
}

function checkLinkedDays() {
	var daysInMonth = 32 - new Date($('#selectYear').val(),
		$('#selectMonth').val() - 1, 32).getDate();
	$('#selectDay option').attr('disabled', '');
	$('#selectDay option:gt(' + (daysInMonth - 1) +')').attr('disabled', 'disabled');
	if ($('#selectDay').val() > daysInMonth) {
		$('#selectDay').val(daysInMonth);
	}
}

function readLinked() {
	$('#linkedDates').val($('#selectDay').val() + '/' +
		$('#selectMonth').val() + '/' + $('#selectYear').val());
	return {};
}

function updateLinked(date) {
	$('#selectDay').val(date.substring(0, 2));
	$('#selectMonth').val(date.substring(3, 5));
	$('#selectYear').val(date.substring(6, 10));
}

function updateInlineRange() {
	var inlineFrom = $('#inlineFrom')[0];
	var inlineTo = $('#inlineTo')[0];
	var dateFrom = $.datepicker.getDateFor(inlineFrom);
	var dateTo = $.datepicker.getDateFor(inlineTo);
	$('#inlineRange').val(formatDate(dateFrom) + ' to ' + formatDate(dateTo));
	$.datepicker.reconfigureFor(inlineFrom, {maxDate: dateTo});
	$.datepicker.reconfigureFor(inlineTo, {minDate: dateFrom});
}

function updateInlineRange2(dateStr) {
	$('#inlineRange2').val(dateStr ? dateStr :
		formatDate($.datepicker.getDateFor('#rangeInline')));
}

function formatDate(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	return (day < 10 ? '0' : '') + day + '/' +
		(month < 10 ? '0' : '') + month + '/' + date.getFullYear();
}

function localise() {
	var language = $('#language').val();
	$.localise('ui.datepicker', {language: language});
	$.datepicker.reconfigureFor('#l10nDatepicker', $.datepicker.regional[language]);
	$.datepicker.setDefaults($.datepicker.regional['']);
}

// Custom Tabs written by Marc Grabanski
var tabs = 
{
	init : function () 
	{
		// Setup tabs
		var nextHTML = '<div class="nextFeature"><a href="#">Continue to next section &gt;&gt;</a></div>';
		//var backHTML
		$("div[@class^=tab_group]").hide().append(nextHTML);
		var tabCount = $("ul[@id^=tab_menu] a").size();
		
		// Get all of the IDs from the hrefs
		tabs.IDs = [];
		for (var i=0;i<tabCount;i++) {
			tabs.IDs[i] = $("ul[@id^=tab_menu] a:eq(" + i + ")").attr("href").replace("#","");
		}
		
		// Set starting content
		var url = window.location.href;
		var loc = url.indexOf("#");
		var tabID = url.substr(loc+1);
		if (loc > -1) {
			$("#" + tabID).show();
			for (var i=0; i<tabs.IDs.length;i++) {
				if (tabs.IDs[i] == tabID) {
					$("ul[@id^=tab_menu] a:eq(" + i + ")").addClass('over');
				}
			}
		} else {
			$("div[@class^=tab_group]:first").show().id;
			$("ul[@id^=tab_menu] a:eq(0)").addClass('over');
		}

		// Slide visible up and clicked one down
		$("ul[@id^=tab_menu] a").each(function(i){
			$(this).click(function () {
				$('.over').removeClass('over');
				$(this).addClass('over');
				$("div[@class^=tab_group]:visible").slideUp("fast", function() { 
					$("#" + tabs.IDs[i]).slideDown();
				});
				tabs.stylesheet = (tabs.IDs[i] == 'styles') ? 'alt' : 'default';
				$('link').each(function() {
					this.disabled = (this.title != '' && this.title != tabs.stylesheet);
				});
				return false;
			});
		});
		
		$("div[@class^=tab_group] .nextFeature a").each(function(i){
			$(this).click(function() { 
				$("div[@class^=tab_group]:visible").slideUp("fast", function() { 
					if (tabs.IDs.length > (i+1) ) {
						$("#" + tabs.IDs[i+1]).slideDown();
						$('.over').removeClass('over');
						$("ul[@id^=tab_menu] a:eq(" + (i+1) + ")").addClass('over');
					} else {
						$("#" + tabs.IDs[0]).slideDown();
						$('.over').removeClass('over');
						$("ul[@id^=tab_menu] a:eq(0)").addClass('over');
					}
				});
				return false;
			});
		});
	}
}