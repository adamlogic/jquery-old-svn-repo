/**
 * jQuery.AjaxFilter - Registry of filters for AJAX responses.
 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 8/7/2008
 * @author Ariel Flesler
 * @version 1.0.1
 */
;(function($){var b={};$.ajaxFilter={f:b,register:function(c,f,g){$.each(f.split(' '),function(d,a){if(!b[a])b[a]={};b[a][c]=g})}};$.ajaxSettings.dataFilter=function(d,a){var c=b[a]&&b[a][this.filter];return c?c.call(this,d,a):d}})(jQuery);