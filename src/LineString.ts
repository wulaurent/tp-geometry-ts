import Geometry from "./Geometry";
import Point from "./Point";

export default class LineString implements Geometry {
  private points?: Array<Point>;

  constructor(points?: Array<Point>) {
    this.points = points ? points : [];
  }

  getType(): string {
    return "LineString";
  }

  isEmpty(): boolean {
      return this.points.length === 0;
  }
  
  translate(dx: number, dy: number) {
    for(const p of this.points) {
      p.translate(dx, dy);
    }    
  }
  
  clone(): LineString {
    
    const clonedPoints = this.points.map(point => point.clone());
      return new LineString(clonedPoints);

    //return new LineString([...this.points]);
  }

  getNumPoints(): number {
    return this.points.length;
  }

  getPointN(n: number): Point {
    return this.points[n - 1];
  }
}
