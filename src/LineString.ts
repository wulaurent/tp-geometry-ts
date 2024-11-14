import Geometry from "./Geometry";
import Point from "./Point";

export default class LineString implements Geometry{
  private points?:Array<Point>;

  constructor(points?:Array<Point>) {
    this.points = points;
  }
  
  getType(): string {
    return "LineString"; 
  }

  getNumPoints():number {
    return this.points ? this.points.length : 0;
  }

  getPointN(n : number):Point {
    return this.points[n - 1];  
  }
}
