import Coordinate from "./Coordinate";
import Geometry from "./Geometry";

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
