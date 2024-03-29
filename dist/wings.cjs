/**
 * Wings
 * 
 * Object-Oriented Component-based UI Library for Canvas built in JavaScript (inspired by Java Swing)
 * 
 * @author manuelbarzi
 * @version 2.0.1
 */
const Wings = (() => {
    class Component {
        constructor() {
            this.x = this.y = this.width = this.height = 0
            this.mouse = {
                entered: false,
                pressed: false,
                dragging: false
            }
            this.behaviors = []
            this.parent = null
            this.children = []
            this.visible = true

            this.backgroundColor = null
            this.borderColor = null
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
                    if (!this.mouse.entered) {
                        this.mouse.entered = true
                        this.fireEvent('MouseEnter', event)
                    }

                    this.fireEvent('MouseMove', event)

                    if (this.mouse.pressed) {
                        this.mouse.dragging = true
                        this.fireEvent('MouseDrag', event)
                    }
                } else {
                    if (this.mouse.entered) {
                        this.mouse.entered = false
                        this.fireEvent('MouseLeave', event)
                    }

                    if (this.mouse.dragging)
                        this.fireEvent('MouseDrag', event)
                }

                if (this.children.length > 0)
                    for (const child of this.children)
                        child.mouseMove(event)
            }
        }

        mouseDown(event) {
            if (this.visible) {
                if (this.isPointed(event.x, event.y)) {
                    event.originalEvent.preventDefault()
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

        beforePaint(context) {
            context.translate(this.x, this.y)
        }

        paint(context) {
            context.beginPath()

            if (this.backgroundColor) {
                context.rect(0, 0, this.width, this.height)
                context.fillStyle = this.backgroundColor
                context.fill()
            }

            if (this.borderColor) {
                context.rect(0, 0, this.width, this.height)
                context.lineWidth = this.borderWidth
                context.strokeStyle = this.borderColor
                context.stroke()
            }
        }

        afterPaint(context) {
            context.translate(-this.x, -this.y)
        }

        paintAll(context) {
            this.beforePaint(context)

            this.paint(context)

            if (this.children.length > 0)
                for (const child of this.children)
                    child.paintAll(context)

            this.afterPaint(context)
        }
    }

    class MouseEvent {
        constructor(element, event) {
            const rect = element.getBoundingClientRect()

            this.x = event.clientX - rect.left
            this.y = event.clientY - rect.top

            this.originalEvent = event
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
            this.backgroundColor = 'cyan'

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
                super.paintAll(this.context)
            })
        }
    }

    return {
        Component,
        View
    }
})()

module.exports = Wings