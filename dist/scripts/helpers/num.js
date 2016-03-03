/**
 * Num(bers).
 * 
 * @author manuelbarzi
 */
var num;
(function() {
	'use strict';

	num = {

		radians : function(degrees) {
			return Math.PI * degrees / 180;
		},

		toStringDigits : function(value, digits) {
			var val = value.toString();
			if (val.length > digits) {
				val = val.slice(val.length - digits, val.length);
			} else if (val.length < digits) {
				var length = val.length;
				for (var i = 0; i < digits - length; i++) {
					val = '0' + val;
				}
			}
			return val;
		}
	};
})();
