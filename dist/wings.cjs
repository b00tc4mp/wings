/**
 * Wings JS
 * 
 * An Object-Oriented Component-based UI Library for Canvas built in JavaScript (inspired by Java Swing).
 * 
 * @author manuelbarzi
 * @version 1.0.2
 */
const Wings = (() => {
    class Component {
        constructor() {
            this.x = this.y = this.width = this.height = 0
            this.mouse = {}
            this.behaviors = []
            this.parent = null
            this.children = []
            this.visible = true

            this.backgroundColor = 'Cyan'
            this.borderColor = 'Magenta'
            this.borderWidth = 0
        }

        get absoluteX() { return this.parent ? this.x + this.parent.x : this.x }

        get absoluteY() { return this.parent ? this.y + this.parent.y : this.y }

        add(component) {
            if (!(component instanceof Component)) throw new TypeError(`${component} is not a Component`)

            this.children.push(component)

            component.parent = this
        }

        on(event, behavior) {
            if (typeof event !== 'string') throw new TypeError(`${event} is not a string`)
            if (typeof behavior !== 'function') throw new TypeError(`${behavior} is not a function`);

            (this.behaviors[event] || (this.behaviors[event] = [])).push(behavior)
        }

        fireEvent(event, value) {
            const behaviors = this.behaviors[event]

            if (behaviors && behaviors.length > 0)
                for (const behavior of behaviors)
                    behavior(value)
        }

        isPointed(x, y) {
            const { absoluteX, absoluteY } = this

            return absoluteX <= x && x <= absoluteX + this.width
                && absoluteY <= y && y <= absoluteY + this.height
        }

        mouseMove(event) {
            if (this.visible) {
                if (this.isPointed(event.x, event.y)) {
                    this.fireEvent('MouseMove', event)

                    if (this.mouse.pressed) {
                        this.mouse.dragging = true
                        this.fireEvent('MouseDrag', event)
                    }
                } else if (this.mouse.dragging)
                    this.fireEvent('MouseDrag', event)

                if (this.children.length > 0)
                    for (const child of this.children)
                        child.mouseMove(event)
            }
        }

        mouseDown(event) {
            if (this.visible) {
                if (this.isPointed(event.x, event.y)) {
                    this.mouse.pressed = true
                    this.fireEvent('MouseDown', event)
                }

                if (this.children.length > 0)
                    for (const child of this.children)
                        child.mouseDown(event)
            }
        }

        mouseUp(event) {
            this.releaseMouse()

            if (this.visible) {
                if (this.isPointed(event.x, event.y))
                    this.fireEvent('MouseUp', event)

                if (this.children.length > 0)
                    for (const child of this.children)
                        child.mouseUp(event)
            }
        }

        releaseMouse() {
            this.mouse.pressed = false
            this.mouse.dragging = false

            if (this.children.length > 0)
                for (const child of this.children)
                    child.releaseMouse()
        }

        mouseClick(event) {
            if (this.visible) {
                if (this.isPointed(event.x, event.y))
                    this.fireEvent('MouseClick', event)

                if (this.children.length > 0)
                    for (const child of this.children)
                        child.mouseClick(event)
            }
        }

        keyDown(event) {
            if (this.visible) {
                this.fireEvent('KeyDown', event)

                if (this.children.length > 0)
                    for (const child of this.children)
                        child.keyDown(event)
            }
        }

        keyUp(event) {
            if (this.visible) {
                this.fireEvent('KeyUp', event)

                if (this.children.length > 0)
                    for (const child of this.children)
                        child.keyUp(event)
            }
        }

        keyPress(event) {
            if (this.visible) {
                this.fireEvent('KeyPress', event)

                if (this.children.length > 0)
                    for (const child of this.children)
                        child.keyPress(event)
            }
        }

        triggerRender(context) {
            context.translate(this.x, this.y)

            this.render(context)

            if (this.children.length > 0)
                for (const child of this.children)
                    child.triggerRender(context)

            context.translate(-this.x, -this.y)
        }

        render(context) {
            context.beginPath()
            context.rect(0, 0, this.width, this.height)
            context.fillStyle = this.backgroundColor
            context.fill()

            if (this.borderWidth) {
                context.lineWidth = this.borderWidth
                context.strokeStyle = this.borderColor
                context.stroke()
            }
        }
    }

    class MouseEvent {
        constructor(element, event) {
            const rect = element.getBoundingClientRect()

            this.x = event.clientX - rect.left
            this.y = event.clientY - rect.top
        }
    }

    class KeyEvent {
        constructor(event) {
            this.key = event.which || event.keyCode
        }
    }

    class View extends Component {
        constructor(canvas) {
            super()

            this.width = canvas.width
            this.height = canvas.height

            this.context = canvas.getContext('2d')

            window.requestAnimFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame || function (callback) {
                        window.setTimeout(callback, 1000 / 600)
                    }
            })()

            window.addEventListener('mousemove', event => {
                this.mouseMove(new MouseEvent(canvas, event))
                this.refresh()
            })

            window.addEventListener('mousedown', event => {
                this.mouseDown(new MouseEvent(canvas, event))
                this.refresh()
            })

            window.addEventListener('mouseup', event => {
                this.mouseUp(new MouseEvent(canvas, event))
                this.refresh()
            })

            window.addEventListener('click', event => {
                this.mouseClick(new MouseEvent(canvas, event))
                this.refresh()
            })

            window.addEventListener('keydown', event => {
                this.keyDown(new KeyEvent(event))
                this.refresh()
            })

            window.addEventListener('keyup', event => {
                this.keyUp(new KeyEvent(event))
                this.refresh()
            })

            window.addEventListener('keypress', event => {
                this.keyPress(new KeyEvent(event))
                this.refresh()
            })

            setTimeout(() => {
                this.refresh()
            }, 100)
        }

        refresh() {
            window.requestAnimFrame(() => {
                this.context.clearRect(0, 0, self.width, self.height)
                super.triggerRender(this.context)
            })
        }
    }

    return {
        Component,
        View
    }
})()

module.exports = Wings