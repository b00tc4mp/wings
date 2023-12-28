/**
 * A counter up
 */
{
    const { View, Component } = Wings

    const view = new View(document.getElementById('counter-up'))

    class Counter extends Component {
        constructor() {
            super()

            this.width = this.height = 50

            this.backgroundColor = 'magenta'
            this.borderColor = 'cyan'
            this.borderWidth = 5

            this.count = 0
            this.textHeight = 16

            this.on('MouseClick', () => this.count++)
            this.on('MouseEnter', () => utils.showPointer())
            this.on('MouseLeave', () => utils.hidePointer())
        }

        render(context) {
            super.render(context)

            context.fillStyle = 'white'
            context.font = this.textHeight + 'px verdana'

            const width = context.measureText(this.count).width

            context.fillText(this.count, (this.width - width) / 2, (this.height + this.textHeight) / 2)
        }
    }

    const counter = new Counter

    counter.x = (view.width - counter.width) / 2
    counter.y = (view.height - counter.height) / 2

    view.add(counter)

    // utils

    const utils = {
        showPointer() {
            const cursorStyle = document.createElement('style')
            cursorStyle.innerHTML = '* {cursor: pointer!important}'
            cursorStyle.id = 'cursor-style'
            document.head.appendChild(cursorStyle)
        },

        hidePointer() {
            document.getElementById('cursor-style').remove()
        }
    }
}