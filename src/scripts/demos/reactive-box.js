/**
 * Reactive box demo.
 */
(function() {
    'use strict';

    Wings.run(function() {

        var view = new Wings.View(document.getElementById('reactive-box'));

        view.color('cyan');
        view.borderColor('transparent');

        /**
         * ReactiveBox
         * 
         * A box that reacts when mouse is clicked on it.
         * 
         */
        var ReactiveBox = Wings.Panel.extend({
            init: function ReactiveBox(msg) {
                this._super();
                this.size(50, 50);
                this.color('magenta');
                this.add(new Wings.MouseDown(function() {
                    alert(msg);
                }));
            },
            draw: function(ctx) {
                ctx.beginPath();
                ctx.lineWidth = '5';
                ctx.strokeStyle = this.color();
                ctx.rect(0, 0, this.width(), this.height());
                ctx.stroke();
            }

        });

        var box = new ReactiveBox('hey! you clicked on me!');
        box.location((view.width() - box.width()) / 2, (view.height() - box
            .height()) / 2);

        view.add(box);

    });
})();
