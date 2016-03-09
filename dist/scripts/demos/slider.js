/*!
 * Slider parts example.
 */
(function() {
	'use strict';

	Wings.run(function() {

		var view = new Wings.View(document.getElementById('slider'));

		view.color('magenta');
		view.borderColor('transparent');

		var Slider = Wings.Panel.extend({

			init : function Slider() {

				this._super();

				var slider = this;

				slider.size(50, 200);

				slider.color('transparent');
				slider.borderColor('cyan');
				slider.borderWidth(5);

				var Dial = Wings.Panel.extend({

					init : function Dial() {

						this._super();

						var dial = this;

						dial.size(slider.width(), slider.width());
						dial.color('white');
						dial.borderColor('transparent');

						dial._txt = {
							height : 12,
							value : 0
						};

						var diff;

						dial.add(new Wings.MouseDown(function(event) {
							var loc = dial.location();
							diff = new Wings.Point(event.location.x - loc.x,
									event.location.y - loc.y);
						}));

						dial.add(new Wings.MouseDrag(function(event) {
							if (diff) {
								var y, maxY;
								dial.location(0, y = ((y = event.location.y
										- diff.y) < 0 ? 0 : (y > (maxY = slider
										.height()
										- dial.height()) ? maxY : y)));
								dial._txt.value = y;
							}
						}));

						return dial;
					},

					draw : function(ctx) {
						ctx.fillStyle = this.color();
						ctx.fillRect(0, 0, this.width(), this.height());
						ctx.fillStyle = 'black';
						ctx.font = this._txt.height + 'px verdana';
						var width = ctx.measureText(this._txt.value).width;
						ctx.fillText(this._txt.value,
								(this.width() - width) / 2,
								(this.height() + this._txt.height) / 2);
					}

				});

				var dial = new Dial();

				slider.add(dial);
			}

		});

		var slider = new Slider();

		slider.location((view.width() - slider.width()) / 2,
				(view.height() - slider.height()) / 2);

		view.add(slider);

	});
})();