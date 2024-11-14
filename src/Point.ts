import Coordinate from "./Coordinate";
import Envelope from "./Envelope";
import Geometry from "./Geometry";
import LineString from "./LineString";
import EnvelopeBuilder from "./EnvelopeBuilder";

export default class Point implements Geometry{
  private coordinate?: Coordinate;

  constructor(coordinate: Coordinate = [Number.NaN, Number.NaN]) {
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

  getEnvelope(): Envelope {
    const builder = new EnvelopeBuilder();
    builder.insert(this.coordinate);
    const result = builder.build();
    return result;
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
