/**
 * A box that moves with the keyboard: 'W' moves UP, 'S' moves DOWN, 'A' moves LEFT, and 'D' moves RIGHT
 */
{
    const { View, Component } = Wings

    const view = new View(document.getElementById('movable-box'))

    const movableBox = new class extends Component {
        constructor() {
            super()

            this.width = this.height = 70
            this.backgroundColor = 'white'
            this.borderColor = 'transparent'

            this.textHeight = 12
            this.text = 'MOVE ME'

            const step = 5

            this.on('KeyDown', event => {
                if (event.key) {
                    const key = String.fromCharCode(event.key)

                    switch (key.toUpperCase()) {
                        case 'W':
                            this.text = 'UP ↑'
                            this.y -= step
                            break
                        case 'S':
                            this.text = 'DOWN ↓'
                            this.y += + step
                            break
                        case 'A':
                            this.text = '← LEFT'
                            this.x -= step
                            break
                        case 'D':
                            this.text = 'RIGHT →'
                            this.x += step
                            break
                    }
                }
            })
        }

        paint(context) {
            context.fillStyle = this.backgroundColor
            context.fillRect(0, 0, this.width, this.height)
            context.fillStyle = 'black'
            context.font = this.textHeight + 'px verdana'

            const width = context.measureText(this.text).width

            context.fillText(this.text, (this.width - width) / 2, (this.height + this.textHeight) / 2)
        }
    }

    movableBox.x = (view.width - movableBox.width) / 2
    movableBox.y = (view.height - movableBox.height) / 2

    view.add(movableBox)
}
