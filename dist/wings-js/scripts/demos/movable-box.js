/**
 * Movable box demo.
 * 
 */
(function() {
    'use strict';

    Wings.run(function() {

        var view = new Wings.View(document.getElementById('movable-box'));

        view.backgroundColor('cyan');
        view.borderColor('transparent');

        /**
         * MovableBox
         * 
         * Component that moves with the keyboard: 'W' moves UP, 'S' moves DOWN,
         * 'A' moves LEFT, and 'D' moves RIGHT
         * 
         */
        var MovableBox = Wings.Panel.extend({

            init: function MovableBox() {

                this._super.init();

                var box = this;

                box.size(70, 70);
                box.backgroundColor('white');
                box.borderColor('transparent');

                box._txt = {
                    height: 12,
                    value: 'MOVE ME'
                };

                var step = 5;

                box.add(new Wings.KeyPress(function(event) {
                    if (event.key) {
                        var key = String.fromCharCode(event.key),
                            loc = box
                            .location();
                        switch (key.toUpperCase()) {
                            case 'W':
                                box._txt.value = 'UP ↑';
                                box.location(loc.x, loc.y - step);
                                break;
                            case 'S':
                                box._txt.value = 'DOWN ↓';
                                box.location(loc.x, loc.y + step);
                                break;
                            case 'A':
                                box._txt.value = '← LEFT';
                                box.location(loc.x - step, loc.y);
                                break;
                            case 'D':
                                box._txt.value = 'RIGHT →';
                                box.location(loc.x + step, loc.y);
                                break;
                        }
                    }
                }));

                return box;
            },

            draw: function(ctx) {
                ctx.fillStyle = this.backgroundColor();
                ctx.fillRect(0, 0, this.width(), this.height());
                ctx.fillStyle = 'black';
                ctx.font = this._txt.height + 'px verdana';
                var width = ctx.measureText(this._txt.value).width;
                ctx.fillText(this._txt.value, (this.width() - width) / 2, (this
                    .height() + this._txt.height) / 2);
            }

        });

        var box = new MovableBox();

        box.location((view.width() - box.width()) / 2, (view.height() - box
            .height()) / 2);

        view.add(box);

    });
})();
