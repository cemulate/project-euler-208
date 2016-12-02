var Vec2 = dcodeIO.JustMath.Vec2;

function pt(v) {
    return new paper.Point(v.x, v.y);
}

function drawDot(v,color) {
    let c = new paper.Shape.Circle(pt(v), 0.2);
    c.strokeWidth = 0.04;
    c.strokeColor = "black";
    c.opacity = 0.7;
    if (color) c.fillColor = color;
    return c;
}

function drawVec(s, v) {
    let e = s.clone().add(v);
    let g = new paper.Group([
        new paper.Path.Line(pt(s), pt(e))
    ]);
    g.strokeWidth = 0.05;
    g.strokeColor = "black";
    return g;
}

function drawArc(a, b, c) {
    let p = new paper.Path.Arc(pt(a), pt(b), pt(c));
    p.strokeWidth = 0.05;
    p.strokeColor = "red";
    return p;
}

export class Robot {

    constructor(paperLayer) {
        this.canvas = paperLayer;
        this.heading = new paper.Group();
        this.canvas.addChild(this.heading);

        this.p = new Vec2(0,0);
        this.f = new Vec2(0,1);

        this.canvas.addChild(drawDot(this.p, "skyblue"));

        this.drawCurrent();
    }

    drawCurrent() {
        this.heading.removeChildren();

        this.heading.addChild(drawDot(this.p));
        this.heading.addChild(drawVec(this.p, this.f));
    }

    move(s) {
        let before = this.p.clone();

        let turn = (s == "L") ? Math.PI/2 : -Math.PI/2;
        let pole = this.p.clone().add(this.f.clone().rotate(turn));

        let arm = this.p.clone().sub(pole);

        let rot = (s == "L") ? 2*Math.PI/5 : -2*Math.PI/5;
        let halfway = arm.clone().rotate(rot/2.0);
        let whole = arm.clone().rotate(rot);

        let passthrough = pole.clone().add(halfway);
        let dest = pole.clone().add(whole);

        this.p = dest;
        this.f.rotate(rot);

        this.canvas.addChild(drawArc(before, passthrough, dest));
        this.canvas.addChild(drawDot(before));

        this.drawCurrent();
    }

}
