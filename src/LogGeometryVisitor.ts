import Point from './Point'; 
import LineString from './LineString';
import GeometryVisitor from './GeometryVisitor';
import GeometryCollection from './GeometryCollection';

export class LogGeometryVisitor implements GeometryVisitor {
  private out: Console;

  constructor(out: Console = console) {
    this.out = out;
  }

  visitPoint(point: Point): void {
    if (point.isEmpty()) {
      this.out.log("Je suis un point vide.");
    } else {
      const [x, y] = point.getCoordinate();
      this.out.log(`Je suis un point avec x=${x} et y=${y}`);
    }
  }

  visitLineString(lineString: LineString): void {
    if (lineString.isEmpty()) {
      this.out.log("Je suis une polyligne vide.");
    } else {
      const numPoints = lineString.getNumPoints();
      this.out.log(`Je suis une polyligne définie par ${numPoints} point(s)`);
    }
  }

  visitGeometryCollection(geometryCollection: GeometryCollection): void {
    if (geometryCollection.isEmpty()) {
      this.out.log("Je suis une géométrie multiple vide.");
    } else {
      const numGeometries = geometryCollection.getNumGeometries();       
      this.out.log(`Je suis une géométrie multiple contenant ${numGeometries} géométrie(s)`);
    }
  }
}

