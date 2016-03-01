Wings.run(function() {

		var view = new Wings.
		View(document.getElementById('canvas3'));

		view.color('cyan');
		view.borderColor('transparent');

		var Box = Wings.Panel.extend({
			init : function Box() {
				this._super();
				this.size(50, 50);
				this.color('magenta');
			},
			draw : function(ctx) {
				ctx.beginPath();
				ctx.lineWidth = '10';
				ctx.strokeStyle = this.color();
				ctx.rect(0, 0, this.width(), 
						this.height());
				ctx.stroke();
			}

		});

		var box = new Box();
		box.location((view.width() - box.width()) / 2,
				(view.height() - box.height()) / 2);

		view.add(box);

	});



