/**
 * Emojis party
 */
{
    const { View, Component } = Wings

    const view = new View(document.getElementById('emojis-party'))

    const SIZE = 100

    class Circle extends Component {
        constructor(size, color) {
            super()

            this.width = this.height = size
            this.radius = this.width / 2
            this.backgroundColor = color
        }

        beforePaint(context) {
            super.beforePaint(context)

            context.translate(-this.width / 2, -this.height / 2)
        }

        afterPaint(context) {
            super.afterPaint(context)

            context.translate(this.width / 2, this.height / 2)
        }

        paint(context) {
            context.beginPath()
            context.arc(this.width / 2, this.height / 2, this.radius, 0, 2 * Math.PI, false)
            context.fillStyle = this.backgroundColor
            context.fill()
        }
    }

    class Emoji extends Circle {
        constructor() {
            super(SIZE, 'gold')

            const eye = new Eye(this.width / 4)
            eye.x = this.width / 3
            eye.y = this.height / 2
            this.add(eye)

            const eye2 = new Eye(this.width / 4)
            eye2.x = this.width * 2 / 3
            eye2.y = this.width / 2
            this.add(eye2)
        }

        paint(context) {
            super.paint(context)

            context.fillStyle = 'black'
            context.font = '36px verdana'
            const width = context.measureText('?').width
            context.fillText('?', (this.width - width) / 2, -10)
        }
    }

    class Eye extends Circle {
        constructor(size) {
            super(size, 'white')

            const iris = new Iris(this.width, this.width * 2 / 5)
            iris.x = this.width / 2
            iris.y = this.height / 2
            this.add(iris)

            this.add(new Lid(size))
        }
    }

    class Iris extends Circle {
        constructor(eyeSize, size) {
            super(size, 'black')

            const step = size / 5
            let phase = 0

            setInterval(() => {
                if (phase === 0) {
                    this.x += step

                    if (this.x > eyeSize - step * 3) {
                        this.x = eyeSize - step * 3
                        phase++
                    }

                    view.refresh()
                } else if (phase === 1) {
                    setTimeout(() => phase++, 3000)

                    phase++
                } else if (phase === 3) {
                    this.x -= step

                    if (this.x < eyeSize / 2) {
                        this.x = eyeSize / 2
                        phase++
                    }

                    view.refresh()
                } else if (phase === 4) {
                    setTimeout(() => phase++, 4000)

                    phase++
                } else if (phase === 6) {
                    this.x -= step

                    if (this.x < step * 3) {
                        this.x = step * 3
                        phase++
                    }

                    view.refresh()
                } else if (phase === 7) {
                    setTimeout(() => phase++, 3000)

                    phase++
                } else if (phase === 9) {
                    this.x += step

                    if (this.x > eyeSize / 2) {
                        this.x = eyeSize / 2
                        phase++
                    }

                    view.refresh()
                } else if (phase === 10) {
                    setTimeout(() => phase = 0, 3000)

                    phase++
                }
            }, 50)
        }
    }

    class Lid extends Component {
        constructor(size) {
            super()

            this.backgroundColor = 'gold'

            this.width = size
            this.height = 0

            const step = size / 5
            let phase = 0

            setInterval(() => {
                if (phase === 0) {
                    this.height += step

                    if (this.height > size - 1) {
                        this.height = size
                        phase++
                    }

                    view.refresh()
                } else if (phase === 1) {
                    this.height -= step

                    if (this.height < 1) {
                        this.height = 0
                        phase++
                    }

                    view.refresh()
                } else if (phase === 2) {
                    setTimeout(() => phase = 0, 3000)

                    phase++
                }
            }, 20)
        }
    }

    const emoji = new Emoji

    emoji.x = view.width / 2
    emoji.y = view.height / 2

    view.add(emoji)

    // const circle = new Circle(50, 'red')

    // circle.x = circle.width / 2
    // circle.y = circle.height / 2

    // view.add(circle)
}