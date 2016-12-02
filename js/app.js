'use strict';

System.register(['./coordinatesystem.js', './robot.js'], function (_export, _context) {
    "use strict";

    var CoordinateSystem, Robot;
    return {
        setters: [function (_coordinatesystemJs) {
            CoordinateSystem = _coordinatesystemJs.CoordinateSystem;
        }, function (_robotJs) {
            Robot = _robotJs.Robot;
        }],
        execute: function () {

            $(document).ready(function () {
                var _ref = [$(window).width(), $(window).height() - $(".top-bar").outerHeight()],
                    WIDTH = _ref[0],
                    HEIGHT = _ref[1];


                $("#canvas").width(WIDTH);
                $("#canvas").height(HEIGHT);
                $("#canvas").attr("width", WIDTH);
                $("#canvas").attr("height", HEIGHT);

                paper.setup($("#canvas").get(0));

                var cs = new CoordinateSystem(WIDTH, HEIGHT);
                cs.autoSetFromWidth(50);
                cs.calculateTransformation();

                var t = cs.transform;
                paper.project.activeLayer.transformContent = false;
                paper.project.activeLayer.matrix = new paper.Matrix(t.sx, 0, 0, t.sy, t.tx, t.ty);

                var r = new Robot(paper.project.activeLayer);

                var keyboard = new paper.Tool();
                keyboard.onKeyDown = function (event) {
                    if (event.key == 'left') {
                        r.move("L");
                    } else if (event.key == 'right') {
                        r.move("R");
                    }
                };
            });
        }
    };
});