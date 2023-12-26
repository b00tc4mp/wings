/**
 * TriJS.
 * 
 * JavaScript 3D operations.
 * 
 * @author manuelbarzi
 */
const Tri = (() => {
    class Point {
        constructor(x, y, z) {
            this.x = x || 0
            this.y = y || 0
            this.z = z || 0
        }
    }

    function rad(deg) {
        return Math.PI * deg / 180
    }

    function rotation(deg) {
        return {
            sin: Math.sin(rad(deg)),
            cos: Math.cos(rad(deg))
        }
    }

    function rotateX(r, p) {
        var y = p.y,
            z = p.z
        p.y = y * r.cos - z * r.sin
        p.z = y * r.sin + z * r.cos
    }

    function rotateY(r, p) {
        var x = p.x,
            z = p.z
        p.x = x * r.cos + z * r.sin
        p.z = -x * r.sin + z * r.cos
    }

    function rotateZ(r, p) {
        var x = p.x,
            y = p.y
        p.x = x * r.cos - y * r.sin
        p.y = x * r.sin + y * r.cos
    }

    const point = {
        rotateX(deg, p) {
            rotateX(rotation(deg), p)
        },

        rotateY(deg, p) {
            rotateY(rotation(deg), p)
        },

        rotateZ(deg, p) {
            rotateZ(rotation(deg), p)
        },

        translateX(dx, p) {
            p.x += dx
        },

        translateY(dy, p) {
            p.y += dy
        },

        translateZ(dz, p) {
            p.z += dz
        },

        translate(dx, dy, dz, p) {
            this.translateX(dx, p)
            this.translateY(dy, p)
            this.translateZ(dz, p)
        }
    }

    const points = {
        rotateX(deg, points) {
            var rot = rotation(deg)
            for (var i in points)
                rotateX(rot, points[i])
        },

        rotateY(deg, points) {
            var rot = rotation(deg)
            for (var i in points)
                rotateY(rot, points[i])
        },

        rotateZ(deg, points) {
            var rot = rotation(deg)
            for (var i in points)
                rotateZ(rot, points[i])
        },

        translateX(dx, points) {
            for (var i in points)
                point.translateX(dx, points[i])
        },

        translateY(dy, points) {
            for (var i in points)
                point.translateY(dy, points[i])
        },

        translateZ(dz, points) {
            for (var i in points)
                point.translateZ(dz, points[i])
        },

        translate(dx, dy, dz, points) {
            for (var i in points)
                point.translate(dx, dy, dz, points[i])
        }
    }

    return {
        Point,
        point,
        points,
    }
})()
