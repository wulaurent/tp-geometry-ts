import Coordinate from "./Coordinate";
import Envelope from "./Envelope";
import Geometry from "./Geometry";
import LineString from "./LineString";
import EnvelopeBuilder from "./EnvelopeBuilder";
import GeometryVisitor from "./GeometryVisitor";
import { AbstractGeometry } from "./AbstractGeometry";

export default class Point extends AbstractGeometry{
  private coordinate?: Coordinate;

  constructor(coordinate: Coordinate = [Number.NaN, Number.NaN]) {
    super();
    this.coordinate = coordinate;
  }
  
  getType(): string {
    return "Point";    
  }
  
  isEmpty(): boolean {
    return isNaN(this.coordinate[0]) && isNaN(this.coordinate[1]);    
  }

  translate(dx: number, dy: number) {
    this.coordinate[0] += dx;
    this.coordinate[1] += dy;
  }

  clone(): Point {
     return new Point([...this.coordinate]);
  }

  accept(visitor: GeometryVisitor): void {
    visitor.visitPoint(this); 
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }

  x(): number {
    return this.coordinate[0];
  }

  y(): number {
    return this.coordinate[1];
  }

}
