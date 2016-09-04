/**
 * Easy HTML manipulation.
 */
var easy;
(function() {
    easy = {

        visible: function(visible, elem) {
            if (visible === undefined)
                return elem.style.display !== 'none';
            var style = elem.style;
            if (style.display !== 'none')
                elem.style._display = style.display;
            if (visible)
                if (elem.style._display && elem.style._display !== 'none') {
                    style.display = elem.style._display;
                } else {
                    style.display = 'block';
                }
            else {
                if (style.display && style.display !== 'none') {
                    elem.style._display = style.display;
                }
                style.display = 'none';
            }
        },

        center: function(elem) {
            var outer = document.createElement('div');
            outer
                .setAttribute('style',
                    'display: table; position: absolute; height: 100%; width: 100%;');
            var middle = document.createElement('div');
            middle.setAttribute('style',
                'display: table-cell; vertical-align: middle;');
            var inner = document.createElement('div');
            inner
                .setAttribute('style',
                    'margin-left: auto; margin-right: auto; width: 100%; text-align: center;');
            elem.parentElement.appendChild(outer);
            outer.appendChild(middle);
            middle.appendChild(inner);
            inner.appendChild(elem);
        }

    };
})();
