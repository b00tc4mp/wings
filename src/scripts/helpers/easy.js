/*!
 * Easy HTML manipulation.
 */
var easy;
(function() {
	easy = {

		center : function(elem) {
			var outer = document.createElement('div');
			outer
					.setAttribute('style',
							'display: table; position: absolute; height: 100%; width: 100%;');
			var middle = document.createElement('div');
			middle.setAttribute('style',
					'display: table-cell; vertical-align: middle;');
			var inner = document.createElement('div');
			inner
					.setAttribute('style',
							'margin-left: auto; margin-right: auto; width: 100%; text-align: center;');
			elem.parentElement.appendChild(outer);
			outer.appendChild(middle);
			middle.appendChild(inner);
			inner.appendChild(elem);
		}

	};
})();