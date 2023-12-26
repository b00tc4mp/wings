![Alt text](./images/logo.svg "Wings")

Object-oriented Component-based UI JavaScript library for HTML Canvas (inspired by Java Swing)

##### Usage

- link wings

```html
<script src="wings.js"></script>
```

- add a canvas

```html
<canvas id="view" width="300px" height="300px">
```

- add `View` and `Component` classes

```js
const { View, Component } = Wings
```

- construct a view with a reference to the canvas

```js
const view = new View(document.getElementById("view"))
```

- create a component class (example)

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

- create an instance and add it to the view

```js
const box = new Box

view.add(box)
```

- locate it inside the view

```js
box.x = box.y = 100
```

- add a mouse reaction to it (example)

```js
box.on('MouseClick', () => alert('Hello, World!'))
```

- and that's it

See more examples at https://b00tc4mp.github.io/wings