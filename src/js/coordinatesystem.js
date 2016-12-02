export class CoordinateSystem {
	constructor(realWidth, realHeight) {
		this.realWidth = realWidth;
		this.realHeight = realHeight;

		this.maxX = 10;
		this.minX = -10;
		this.maxY = 10;
		this.minY = -10;
	}

	autoSetFromWidth(width) {
		// Sets left, top, width, and height such that the resultant coordinate system has the origin in the middle of the screen,
		// the desired width given, and a height determined from the width such that the aspect ratio is 1:1

		this.minX = (-width) / 2;
		this.maxX = width / 2;

		var h = (width / this.realWidth) * this.realHeight;

		this.maxY = h / 2;
		this.minY = -h / 2;
	}

	calculateTransformation() {
		var left = this.minX;
		var top = this.maxY;
		var width = this.maxX - this.minX;
		var height = -(this.maxY - this.minY);

		var tx = ((0 - left) / width) * this.realWidth;
		var ty = ((0 - top) / height) * this.realHeight;

		var sx = (1 / width) * this.realWidth;
		var sy = (1 / height) * this.realHeight;

		this.transform = {sx, sy, tx, ty};
	}

	coordToPixels(p) {
		return [
			this.transform.tx + this.transform.sx * p[0],
			this.transform.ty + this.transform.sy * p[1]
		]
	}

	pixelsToCoord(p) {
		return [
			(-1.0 * this.transform.tx/this.transform.sx) + (1.0/this.transform.sx) * p[0],
			(-1.0 * this.transform.ty/this.transform.sy) + (1.0/this.transform.sy) * p[1]
		]
	}

	inBounds(p) {
		return p[0] > this.minX && p[0] < this.maxX && p[1] > this.minY && p[1] < this.maxY;
	}

	inRealBounds(p) {
		return p[0] > 0 && p[0] < this.realWidth && p[1] > 0 && p[1] < this.realHeight;
	}
}
