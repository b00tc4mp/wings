/**
 * A box that reacts on click
 */
{
    const { View, Component } = Wings

    const view = new View(document.getElementById('reactive-box'))

    const box = new class extends Component {
        constructor(msg) {
            super()

            this.width = this.height = 50
            this.backgroundColor = 'magenta'

            const ouch = new Audio('sounds/ouch.mp3');

            this.on('MouseClick', () => {
                ouch.play()

                alert(msg)
            })
        }

        paint(context) {
            context.beginPath()
            context.lineWidth = '5'
            context.strokeStyle = this.backgroundColor
            context.rect(0, 0, this.width, this.height)
            context.stroke()
        }
    }('Ouch!')

    box.x = (view.width - box.width) / 2
    box.y = (view.height - box.height) / 2

    view.add(box)
}
