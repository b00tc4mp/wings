/*!
 * Body parts parts example.
 */
(function() {
	'use strict';

	Wings.run(function() {

		var view = new Wings.View(document.getElementById('body-parts'));

		view.color('cyan');
		view.borderColor('transparent');

		var BodyParts = Wings.Panel.extend({

			init : function BodyParts() {

				this._super();

				var body = this;

				body.size(20, 200);

				body.color('black');
				body.borderColor('transparent');

				var diff;

				body.add(new Wings.MouseDown(function(event) {
					var loc = body.absoluteLocation();
					diff = new Wings.Point(event.location.x - loc.x,
							event.location.y - loc.y);
				}));

				body.add(new Wings.MouseDrag(function(event) {
					if (diff)
						body.location(event.location.x - diff.x,
								event.location.y - diff.y);
				}));

				var Eye = Wings.Panel.extend({

					init : function Eye() {

						this._super();

						var eye = this;

						eye.size(50, 50);
						eye.color('white');
						eye.borderColor('transparent');

						var diff;

						eye.add(new Wings.MouseDown(function(event) {
							var loc = eye.location();
							diff = new Wings.Point(event.location.x - loc.x,
									event.location.y - loc.y);
						}));

						eye.add(new Wings.MouseDrag(function(event) {
							if (diff)
								eye.location(event.location.x - diff.x,
										event.location.y - diff.y);
						}));

						var iris = new Wings.Panel();

						iris.location(0, 30);
						iris.size(20, 20);
						iris.color('black');
						iris.borderColor('transparent');

						var loc = iris.location(), i = 0, step = 1;
						setInterval(function() {
							iris.location(loc.x + i, loc.y);
							view.refresh();
							i += step;
							if (i === eye.width() - iris.width())
								step = -1;
							else if (i === -1)
								step = 1;
						}, 30);

						eye.add(iris);

						return eye;
					}

				});

				var eye = new Eye();

				eye.location(-eye.width() + body.width() / 3, eye.height());

				body.add(eye);

				eye = new Eye();

				eye.location(body.width() * 2 / 3, eye.height() / 2);

				body.add(eye);

				var Mouth = Wings.Panel.extend({

					init : function Mouth() {

						this._super();

						var mouth = this;

						mouth.size(50, 50);
						mouth.color('transparent');
						mouth.borderColor('transparent');

						var diff;

						mouth.add(new Wings.MouseDown(function(event) {
							var loc = mouth.location();
							diff = new Wings.Point(event.location.x - loc.x,
									event.location.y - loc.y);
						}));

						mouth.add(new Wings.MouseDrag(function(event) {
							if (diff)
								mouth.location(event.location.x - diff.x,
										event.location.y - diff.y);
						}));

						var Lip = Wings.Panel.extend({

							init : function Lip() {

								this._super();

								var lip = this;

								lip.size(mouth.width(), mouth.height() / 3);
								lip.color('magenta');
								lip.borderColor('transparent');
							}

						});

						var lip = new Lip();

						lip.location((-lip.width() + mouth.width()) / 2, 0);

						mouth.add(lip);

						lip = new Lip();

						lip.location((-lip.width() + mouth.width()) / 2, mouth
								.height()
								- lip.height());

						var size = mouth.size(), step = -1, i = 0;

						mouth.add(lip);

						setInterval(function() {

							mouth.size(size.width, size.height + i);

							lip.location((-lip.width() + mouth.width()) / 2,
									mouth.height() - lip.height());

							view.refresh();

							i += step;
							if (i < -lip.height())
								step = 1;
							else if (i > 0)
								step = -1;
						}, 20);

						return mouth;
					}

				});

				var mouth = new Mouth();

				mouth.location(body.width() / 2, body.height() - mouth.height()
						* 3 / 2);

				body.add(mouth);
			}

		});

		var body = new BodyParts();

		body.location((view.width() - body.width()) / 2, (view.height() - body
				.height()) / 2);

		view.add(body);

	});
})();