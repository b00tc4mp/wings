/**
 * An infinitely rotating image
 */
{
    const { View, Component } = Wings

    const view = new View(document.getElementById('rotating-image'))

    const image = new class extends Component {
        constructor(url, speed, view) {
            super()

            this.image = new Image()
            this.image.src = url
            this.image.onload = () => {
                this.image.loaded = true
            }

            this.angle = 0

            setInterval(() => {
                this.angle++

                if (this.angle > 360)
                    this.angle = 0

                view.refresh()
            }, 1 / speed)

        }

        render(context) {
            if (this.image && this.image.loaded) {
                context.save()
                context.rotate(this.angle * Math.PI / 180)
                context.drawImage(this.image, -this.image.width / 2, -this.image.height / 2)
                context.restore()
            }
        }
    }('images/wheel.png', 1 / 10, view)

    image.x = view.width / 2
    image.y = view.height / 2

    view.add(image)
}
