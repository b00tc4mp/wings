/**
 * Cube 3D demo.
 * 
 */
(function() {
    'use strict';

    Wings.run(function() {

        var view = new Wings.View(document.getElementById('cube-3d'));

        view.backgroundColor('magenta');
        view.borderColor('transparent');

        /**
         * Cube3D
         * 
         * Component that renders a cube in 3D and rotates it.
         * 
         */
        var Cube3D = Wings.Panel.extend({

            init: function Cube3D() {

                this._super.init();

                var cube = this;

                cube._pts = [
                    [],
                    []
                ];

                var pts = cube._pts[0];

                pts.push(new Tri.Point(0, 0, 0));
                pts.push(new Tri.Point(0, 50, 0));
                pts.push(new Tri.Point(50, 50, 0));
                pts.push(new Tri.Point(50, 0, 0));

                Tri.transArray(-25, -25, -25, pts);

                pts = cube._pts[1];

                pts.push(new Tri.Point(0, 0, 50));
                pts.push(new Tri.Point(0, 50, 50));
                pts.push(new Tri.Point(50, 50, 50));
                pts.push(new Tri.Point(50, 0, 50));

                Tri.transArray(-25, -25, -25, pts);

                setInterval(function() {
                    for (var i in cube._pts) {
                        pts = cube._pts[i];
                        Tri.rotArrayX(1, pts);
                        Tri.rotArrayY(-1, pts);
                        Tri.rotArrayZ(1, pts);
                    }
                    view.refresh();
                }, 10);

            },

            draw: function(ctx) {
                ctx.save();
                ctx.beginPath();
                for (var j in this._pts) {
                    var pts = this._pts[j];
                    var pti = pts[0],
                        pt;
                    ctx.moveTo(pti.x, pti.y);
                    for (var i in pts) {
                        pt = pts[i];
                        ctx.lineTo(pt.x, pt.y);
                    }
                    ctx.lineTo(pti.x, pti.y);
                }
                var pts0 = this._pts[0],
                    pts1 = this._pts[1];
                for (var k in pts0) {
                    var pt0 = pts0[k];
                    var pt1 = pts1[k];
                    ctx.moveTo(pt0.x, pt0.y);
                    ctx.lineTo(pt1.x, pt1.y);
                }
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'white';
                ctx.stroke();
                ctx.restore();
            }

        });

        var cube = new Cube3D();

        cube.location((view.width() - cube.width()) / 2, (view.height() - cube
            .height()) / 2);

        view.add(cube);

    });
})();
