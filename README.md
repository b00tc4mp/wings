![Alt text](http://www.1nside0ut.com/wings-js/images/logo.svg "WingsJS")

#### JavaScript UI framework that draws on HTML5 Canvas, inspired by Java Swing.

##### Usage:

Link Wings to your web page,

```html
<script type='text/javascript' src='wings-0.0.3.min.js'></script>
```

Remember you need a canvas to draw on,

```html
<canvas id='canvas' width='300px' height='300px'>
```

Then link that canvas to the view,

```javascript
var view = new Wings.View(document.getElementById('canvas'));
```

Create a component you want,

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

Add it to the view,

```javascript
var box = new Box();
view.add(box);
```

Locate it inside the view,

```javascript
box.location(100, 100);
```

Add mouse reaction to it,

```javascript
box.add(new Wings.MouseDown(function() {
	alert('My location is ' + box.location());
}));
```

Inspect the code demo examples at http://1nside0ut.com/wings-js/