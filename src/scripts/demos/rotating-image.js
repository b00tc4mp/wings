/*!
 * Rotating image demo.
 */
(function() {
	'use strict';

	Wings.run(function() {

		var view = new Wings.View(document.getElementById('rotating-image'));

		view.color('magenta');
		view.borderColor('transparent');

		var RotatingImage = Wings.Panel.extend({

			init : function RotatingImage(url) {

				this._super();

				var self = this;

				self._img = new Image();
				self._img.src = url;
				self._img.onload = function() {
					self._img.loaded = true;
				};

				self._angle = 0;

				setInterval(function() {
					self._angle++;
					if (self._angle > 360)
						self._angle = 0;
					view.refresh();
				}, 10);

			},

			draw : function(ctx) {

				if (this._img && this._img.loaded) {
					ctx.save();
					ctx.rotate(num.radians(this._angle));
					ctx.drawImage(this._img, -this._img.width / 2,
							-this._img.height / 2);
					ctx.restore();
				}

			}

		});

		var img = new RotatingImage('images/wheel.png');
		img.location(150, 150);

		view.add(img);

	});
})();