/**
 * A body with draggable parts
 */
{
    const { View, Component } = Wings

    const view = new View(document.getElementById('draggable-body'))

    const body = new class extends Component {
        constructor(view) {
            super()

            this.width = 20
            this.height = 200

            this.backgroundColor = 'black'
            this.borderColor = 'transparent'

            const diff = { x: 0, y: 0 }

            this.on('MouseDown', event => {
                diff.x = event.x - this.absoluteX
                diff.y = event.y - this.absoluteY
            })

            this.on('MouseDrag', event => {
                this.x = event.x - diff.x
                this.y = event.y - diff.y
            })

            class Eye extends Component {
                constructor() {
                    super()

                    const eye = this

                    eye.width = eye.height = 50
                    eye.backgroundColor = 'white'
                    eye.borderColor = 'transparent'

                    const diff = { x: 0, y: 0 }

                    eye.on('MouseDown', event => {
                        diff.x = event.x - this.x
                        diff.y = event.y - this.y
                    })

                    eye.on('MouseDrag', event => {
                        eye.x = event.x - diff.x
                        eye.y = event.y - diff.y
                    })

                    const iris = new Component()

                    iris.y = 30
                    iris.width = iris.height = 20
                    iris.backgroundColor = 'black'
                    iris.borderColor = 'transparent'

                    const x = iris.x

                    let i = 0,
                        step = 1

                    setInterval(function () {
                        iris.x = x + i

                        view.refresh()

                        i += step

                        if (i === eye.width - iris.width)
                            step = -1
                        else if (i === -1)
                            step = 1
                    }, 30)

                    eye.add(iris)

                    return eye
                }

            }

            let eye = new Eye()

            eye.x = -eye.width + this.width / 3
            eye.y = eye.height

            this.add(eye)

            eye = new Eye()

            eye.x = this.width * 2 / 3
            eye.y = eye.height / 2

            this.add(eye)


            const mouth = new class extends Component {
                constructor() {
                    super()

                    this.width = this.height = 50
                    this.backgroundColor = 'transparent'
                    this.borderColor = 'transparent'

                    const diff = { x: 0, y: 0 }

                    this.on('MouseDown', event => {
                        diff.x = event.x - this.x
                        diff.y = event.y - this.y
                    })

                    this.on('MouseDrag', event => {
                        this.x = event.x - diff.x
                        this.y = event.y - diff.y
                    })

                    const mouth = this

                    class Lip extends Component {
                        constructor() {
                            super()

                            this.width = mouth.width
                            this.height = mouth.height / 3

                            this.backgroundColor = 'magenta'
                            this.borderColor = 'transparent'
                        }

                    }

                    let lip = new Lip()

                    lip.x = (-lip.width + this.width) / 2

                    this.add(lip)

                    lip = new Lip()

                    lip.x = (-lip.width + this.width) / 2
                    lip.y = this.height - lip.height

                    const height = this.height

                    let step = -1, i = 0

                    this.add(lip)

                    setInterval(() => {
                        this.height = height + i

                        lip.x = (-lip.width + this.width) / 2
                        lip.y = this.height - lip.height

                        view.refresh()

                        i += step

                        if (i < -lip.height)
                            step = 1
                        else if (i > 0)
                            step = -1
                    }, 20)
                }

            }

            mouth.x = this.width / 2
            mouth.y = this.height - mouth.height * 3 / 2

            this.add(mouth)
        }
    }(view)

    body.x = (view.width - body.width) / 2
    body.y = (view.height - body.height) / 2

    view.add(body)
}
