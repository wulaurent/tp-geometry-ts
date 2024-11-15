import Coordinate from './Coordinate';
import Envelope from './Envelope';
import GeometryVisitor from './GeometryVisitor';
import Point from './Point';
import LineString from './LineString';
import GeometryCollection from './GeometryCollection';

export default class EnvelopeBuilder implements GeometryVisitor {
  private xVals: number[] = [];
  private yVals: number[] = [];

  constructor() {}

  insert(coordinate: Coordinate): void {
    this.xVals.push(coordinate[0]);
    this.yVals.push(coordinate[1]);
  }

  build(): Envelope {
    if (this.xVals.length > 0 && this.yVals.length > 0) {
      const xmin = Math.min(...this.xVals);
      const xmax = Math.max(...this.xVals);
      const ymin = Math.min(...this.yVals);
      const ymax = Math.max(...this.yVals);

      const bottomLeft: Coordinate = [xmin, ymin];
      const topRight: Coordinate = [xmax, ymax];

      return new Envelope(bottomLeft, topRight);
    } else {
      return new Envelope([NaN, NaN], [NaN, NaN]);
    }
  }

  visitPoint(point: Point) {
    this.insert(point.getCoordinate());
  }
  
  
  visitLineString(lineString: LineString): void {
      for (let i = 1; i <= lineString.getNumPoints(); i++) {
        const point = lineString.getPointN(i);
        if (!point || !point.getCoordinate) {
          throw new Error(`Invalid point at index ${i}`);
        }
      this.insert(point.getCoordinate());
      }
    }

  visitGeometryCollection(geometryCollection: GeometryCollection): void { 
    for (let i = 0; i < geometryCollection.getNumGeometries(); i++) {    
      const geometry = geometryCollection.getGeometryN(i);               
      if (!geometry || !geometry.accept) {                               
        throw new Error(`Invalid geometry at index ${i}`);               
      }
      geometry.accept(this); 
    }                                                                    
  }      
}

