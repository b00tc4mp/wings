![Alt text](http://www.1nside0ut.com/wings-js/images/logo.svg "WingsJS")

##### Usage:

Link Wings to your web page:

```html
<script type='text/javascript' src='wings-[current version].min.js'></script>
```

You need a canvas to draw on:

```html
<canvas id='canvas' width='300px' height='300px'>
```

Link that canvas to the view:

```javascript
var view = new Wings.View(document.getElementById('canvas'));
```

Create a component:

```javascript
var Box = Wings.Panel.extend({
			init : function Box() {
				this._super();
				this.size(50, 50);
				this.backgroundColor('magenta');
				this.borderColor('cyan');
				this.borderWidth(5);
			}
		});
```

Add it to the view:

```javascript
var box = new Box();
view.add(box);
```

Locate it inside:

```javascript
box.location(100, 100);
```

Add mouse reaction to it:

```javascript
box.add(new Wings.MouseDown(function() {
	alert('My location is ' + box.location());
}));
```

See demos at http://1nside0ut.com/wings-js/