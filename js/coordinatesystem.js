"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, CoordinateSystem;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export("CoordinateSystem", CoordinateSystem = function () {
				function CoordinateSystem(realWidth, realHeight) {
					_classCallCheck(this, CoordinateSystem);

					this.realWidth = realWidth;
					this.realHeight = realHeight;

					this.maxX = 10;
					this.minX = -10;
					this.maxY = 10;
					this.minY = -10;
				}

				_createClass(CoordinateSystem, [{
					key: "autoSetFromWidth",
					value: function autoSetFromWidth(width) {
						// Sets left, top, width, and height such that the resultant coordinate system has the origin in the middle of the screen,
						// the desired width given, and a height determined from the width such that the aspect ratio is 1:1

						this.minX = -width / 2;
						this.maxX = width / 2;

						var h = width / this.realWidth * this.realHeight;

						this.maxY = h / 2;
						this.minY = -h / 2;
					}
				}, {
					key: "calculateTransformation",
					value: function calculateTransformation() {
						var left = this.minX;
						var top = this.maxY;
						var width = this.maxX - this.minX;
						var height = -(this.maxY - this.minY);

						var tx = (0 - left) / width * this.realWidth;
						var ty = (0 - top) / height * this.realHeight;

						var sx = 1 / width * this.realWidth;
						var sy = 1 / height * this.realHeight;

						this.transform = { sx: sx, sy: sy, tx: tx, ty: ty };
					}
				}, {
					key: "coordToPixels",
					value: function coordToPixels(p) {
						return [this.transform.tx + this.transform.sx * p[0], this.transform.ty + this.transform.sy * p[1]];
					}
				}, {
					key: "pixelsToCoord",
					value: function pixelsToCoord(p) {
						return [-1.0 * this.transform.tx / this.transform.sx + 1.0 / this.transform.sx * p[0], -1.0 * this.transform.ty / this.transform.sy + 1.0 / this.transform.sy * p[1]];
					}
				}, {
					key: "inBounds",
					value: function inBounds(p) {
						return p[0] > this.minX && p[0] < this.maxX && p[1] > this.minY && p[1] < this.maxY;
					}
				}, {
					key: "inRealBounds",
					value: function inRealBounds(p) {
						return p[0] > 0 && p[0] < this.realWidth && p[1] > 0 && p[1] < this.realHeight;
					}
				}]);

				return CoordinateSystem;
			}());

			_export("CoordinateSystem", CoordinateSystem);
		}
	};
});