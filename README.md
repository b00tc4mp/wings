![alt tag](http://1nside0ut.com/wings/images/logo.svg) **.js**

## JavaScript UI framework that draws on canvas, inspired on Java Swing.

### Usage:

Link it to your web page,

```html
<script type='text/javascript' src='wings-0.1.0.min.js'></script>
```

Remember you need a canvas where to draw,

```html
<canvas id='canvas' width='300px' height='300px'>
```

Then link that canvas to the view,

```javascript
var view = new Wings.View(document.getElementById('canvas'));
```

Create the component you want,

```javascript
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

And add it to the view,

```javascript
var box = new Box();
view.add(box);
```

Inspect the code examples at http://1nside0ut.com/wings/