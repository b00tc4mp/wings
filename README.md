**Wings** - JavaScript UI library that draws on canvas, inspired on Java Swing.

usage:

link it to your web page,

```
<script type='text/javascript' src='wings-0.1.0.min.js'></script>
```

remember you need a canvas where to draw,

```
<canvas id='canvas' width='300px' height='300px'>
```

and then link it to the view,

```
var view = new Wings.View(document.getElementById('canvas'));
```

finally create the component you want,

```
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
				ctx.rect(0, 0, this.width(), this.height());
				ctx.stroke();
			}

		});
```

and add it to the view,

```
var box = new Box();
view.add(box);
```

inspect the code examples at http://1nside0ut.com/wings/
