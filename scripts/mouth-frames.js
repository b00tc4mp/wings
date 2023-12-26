/**
 * Mouth frames rendered sequentially to produce an animation
 */
{
    const { View, Component } = Wings

    const view = new View(document.getElementById('animated-gif'))

    const frames = [0, 1, 2, 3, 4, 5, 6, 7].map(index => `images/talking-mouth/${index}.gif`)

    const mouth = new class extends Component {
        constructor(urls, view) {
            super()

            this.images = []

            this.count = 0

            const update = () => {
                if (++this.count === urls.length) {
                    this.count = 0

                    this.loaded = true
                }
            }

            urls.forEach((url, index) => {
                const image = new Image()

                image.src = url

                image.onload = update

                this.images[index] = image
            })

            setInterval(() => {
                if (this.loaded) {
                    this.count < this.images.length - 1 ? this.count++ : this.count = 0

                    view.refresh()
                }
            }, 30)
        }

        render(context) {
            if (this.loaded) {
                context.save()

                const image = this.images[this.count]

                const width = image.width / 2
                const height = image.height / 2

                context.drawImage(image, -width / 2, -height / 2, width, height)

                context.restore()
            }
        }
    }(frames, view)

    mouth.x = view.width / 2
    mouth.y = view.height / 2

    view.add(mouth)
}
