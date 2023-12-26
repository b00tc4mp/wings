/**
 * An infinitely rotating cube
 */
{
    const { View, Component } = Wings

    const view = new View(document.getElementById('rotating-cube'))

    const cube = new class extends Component {
        constructor(view) {
            super()

            const cube = this

            cube.points = [
                [],
                []
            ]

            let pts = cube.points[0]

            pts.push(new Tri.Point(0, 0, 0))
            pts.push(new Tri.Point(0, 50, 0))
            pts.push(new Tri.Point(50, 50, 0))
            pts.push(new Tri.Point(50, 0, 0))

            Tri.points.translate(-25, -25, -25, pts)

            pts = cube.points[1]

            pts.push(new Tri.Point(0, 0, 50))
            pts.push(new Tri.Point(0, 50, 50))
            pts.push(new Tri.Point(50, 50, 50))
            pts.push(new Tri.Point(50, 0, 50))

            Tri.points.translate(-25, -25, -25, pts)

            setInterval(function () {
                for (const i in cube.points) {
                    pts = cube.points[i]
                    Tri.points.rotateX(1, pts)
                    Tri.points.rotateY(-1, pts)
                    Tri.points.rotateZ(1, pts)
                }

                view.refresh()
            }, 10)

        }

        render(context) {
            context.save()
            context.beginPath()

            for (const j in this.points) {
                const pts = this.points[j]
                const pti = pts[0]
                let pt

                context.moveTo(pti.x, pti.y)

                for (const i in pts) {
                    pt = pts[i]
                    context.lineTo(pt.x, pt.y)
                }

                context.lineTo(pti.x, pti.y)
            }

            const pts0 = this.points[0],
                pts1 = this.points[1]

            for (const k in pts0) {
                const pt0 = pts0[k]
                const pt1 = pts1[k]
                context.moveTo(pt0.x, pt0.y)
                context.lineTo(pt1.x, pt1.y)
            }

            context.lineWidth = 2
            context.strokeStyle = 'white'
            context.stroke()
            context.restore()
        }
    }(view)

    cube.x = (view.width - cube.width) / 2
    cube.y = (view.height - cube.height) / 2

    view.add(cube)
}