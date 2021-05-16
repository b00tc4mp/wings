![Alt text](./images/logo.svg "WingsJS")

##### Usage:

Link Wings to your web page

```html
<script src="wings.js"></script>
```

Add a canvas

```html
<canvas id="view" width="300px" height="300px">
```

Add `View` and `Component` classes to your running scope

```js
const { View, Component } = Wings
```

Instantiate the view linking it to the canvas

```js
var view = new View(document.getElementById("view"))
```

Create a component class (demo)

```js
class Box extends Component {
	constructor() {
		super()

		// set the dimensions
		this.width = this.height = 50

		// set colors
		this.backgroundColor = 'magenta'
		this.borderColor = 'cyan'
		this.borderWidth = 5
	}
}
```

Instantiate it and add it to the view

```js
var box = new Box

view.add(box)
```

Locate it inside the view

```js
box.x = box.y = 100
```

Add mouse reaction to it

```js
box.on('MouseClick', () => alert('Hello, World!'))
```

See demos at https://manuelbarzi.github.io/wings-js