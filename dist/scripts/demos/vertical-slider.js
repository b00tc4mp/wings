/*!
 * VerticalSlider parts example.
 */
(function() {
	'use strict';

	Wings.run(function() {

		var view = new Wings.View(document.getElementById('slider'));

		view.color('magenta');
		view.borderColor('transparent');

		var VerticalSlider = Wings.Panel.extend({

			init : function VerticalSlider() {

				this._super();

				var slider = this;

				slider.size(50, 200);

				slider.color('transparent');
				slider.borderColor('cyan');
				slider.borderWidth(5);

				var Knob = Wings.Panel.extend({

					init : function Knob() {

						this._super();

						var knob = this;

						knob.size(slider.width(), slider.width());
						knob.color('white');
						knob.borderColor('transparent');

						knob._txt = {
							height : 12,
							value : 0
						};

						var diff;

						knob.add(new Wings.MouseDown(function(event) {
							var loc = knob.location();
							diff = new Wings.Point(event.location.x - loc.x,
									event.location.y - loc.y);
						}));

						knob.add(new Wings.MouseDrag(function(event) {
							if (diff) {
								var y, maxY;
								knob.location(0, y = ((y = event.location.y
										- diff.y) < 0 ? 0 : (y > (maxY = slider
										.height()
										- knob.height()) ? maxY : y)));
								knob._txt.value = y;
							}
						}));

						return knob;
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

				var knob = new Knob();

				slider.add(knob);
			}

		});

		var slider = new VerticalSlider();

		slider.location((view.width() - slider.width()) / 2,
				(view.height() - slider.height()) / 2);

		view.add(slider);

	});
})();