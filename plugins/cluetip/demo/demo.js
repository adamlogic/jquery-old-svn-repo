$(document).ready(function() {

 // $.cluetip.setup({insertionType: 'insertBefore', insertionElement: 'div:first'});

//default theme
  $('a.basic').cluetip();
  $('a.custom-width').cluetip({width: '200px', showTitle: false,sticky: true});
  $('h4').cluetip({attribute: 'id', hoverClass: 'highlight'});
  $('#sticky').cluetip({'sticky': true,'closePosition': 'title'});
  $('#examples a:eq(4)').cluetip({
    hoverClass: 'highlight',
    sticky: true,
    closePosition: 'bottom',
    closeText: '<img src="cross.png" alt="close" width="16" height="16" />',
    truncate: 60
  });
  $('a.load-local').cluetip({local:true, cursor: 'pointer'});
  $('#clickme').cluetip({activation: 'click', width: 650});
  $('span[@title]').css({borderBottom: '1px solid #900'}).cluetip({splitTitle: '|', arrows: true, dropShadow: false, cluetipClass: 'jtip'});

// jTip theme
  $('a.jt:eq(0)').cluetip({cluetipClass: 'jtip', arrows: true, dropShadow: false,
    sticky: true,
    mouseOutClose: true,
    closePosition: 'title',
    closeText: '<img src="cross.png" alt="close" />'
  });
  $('a.jt:eq(1)').cluetip({cluetipClass: 'jtip', arrows: true, dropShadow: false, hoverIntent: false});

// Rounded Corner theme
  $('ol.rounded a:eq(0)').cluetip({cluetipClass: 'rounded', dropShadow: false, sticky: true, ajaxCache: false});
  $('ol.rounded a:eq(1)').cluetip({cluetipClass: 'rounded', dropShadow: false});  
});

//unrelated to clueTip -- just for the demo page...

$(document).ready(function() {
  $('#container > div:gt(0)').hide().append('<a class="back-to-top" href="#top">back to top</a>');
  $('#navigation a').click(function() {
    var $this = $(this);
    var hash = $this.attr('href');
    $(hash).siblings(':visible').hide();
    $(hash).slideDown('fast');
    $('#navigation a').removeClass('active');
    $this.addClass('active');
    return false;
  }).filter(':first').addClass('active');
  $('div.html, div.jquery').next().css('display', 'none').end().click(function() {
    $(this).next().toggle('fast');
  });
});
  



