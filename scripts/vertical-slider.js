/**
 * A slider that updates the knob value when dragging it
 */
{
    const { View, Component } = Wings

    const view = new View(document.getElementById('vertical-slider'))

    const slider = new class extends Component {
        constructor() {
            super()

            this.width = 50
            this.height = 200

            this.borderWidth = '5'

            const slider = this

            this.add(new class extends Component { // Knob
                constructor() {
                    super()

                    this.width = this.height = slider.width
                    this.backgroundColor = 'white'
                    this.borderColor = 'transparent'

                    this.textHeight = 12
                    this.text = 0

                    const diff = { x: 0, y: 0 }, maxY = slider.height - this.height

                    this.y = maxY

                    this.on('MouseDown', event => {
                        diff.x = event.x - this.x
                        diff.y = event.y - this.y
                    })

                    this.on('MouseDrag', event => {
                        const y = (event.y - diff.y)

                        this.y = (y < 0 ? 0 : y > maxY ? maxY : y)

                        this.text = Math.round((maxY - this.y) * 100 / maxY)
                    })
                }

                render(context) {
                    context.fillStyle = this.backgroundColor
                    context.fillRect(0, 0, this.width, this.height)
                    context.fillStyle = 'black'
                    context.font = this.textHeight + 'px verdana'

                    const width = context.measureText(this.text).width

                    context.fillText(this.text, (this.width - width) / 2, (this.height + this.textHeight) / 2)
                }
            })
        }
    }

    slider.x = (view.width - slider.width) / 2
    slider.y = (view.height - slider.height) / 2

    view.add(slider)
}
