import Envelope from "./Envelope";
import Geometry from "./Geometry";
import Point from "./Point";
import EnvelopeBuilder from "./EnvelopeBuilder";
import GeometryVisitor from "./GeometryVisitor";
import { AbstractGeometry } from "./AbstractGeometry";

export default class LineString  extends AbstractGeometry {
  private points?: Array<Point>;

  constructor(points?: Array<Point>) {
    super();
    this.points = points || [];
  }

  getType(): string {
    return "LineString";
  }

  isEmpty(): boolean {
    return this.points.length === 0;
  }

  translate(dx: number, dy: number) {
    for (const p of this.points) {
      p.translate(dx, dy);
    }
  }

  clone(): LineString {
    const clonedPoints = this.points.map((point) => point.clone());
    return new LineString(clonedPoints);
  }
   
  accept(visitor: GeometryVisitor): void {
    visitor.visitLineString(this); 
  }

  getNumPoints(): number {
    return this.points.length;
  }

  getPointN(n: number): Point {
    return this.points[n - 1];
  }
}
