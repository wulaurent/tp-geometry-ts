import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";
import GeometryCollection from "./GeometryCollection";

export default class WktVisitor implements GeometryVisitor {

  private buffer: string[] = [];
  
  visitPoint(point: Point): void {

    this.buffer = [];

    const coordinate = point.getCoordinate();

    if(point.isEmpty()){
      this.buffer.push("POINT EMPTY");
    } else {
      this.buffer.push(`POINT(${coordinate[0].toFixed(1)} ${coordinate[1].toFixed(1)})`);
    }
  }

  visitLineString(lineString: LineString): void {
    
    this.buffer = [];

    if(lineString.isEmpty()) {
      this.buffer.push("LINESTRING EMPTY");
    } else {
      let res = "LINESTRING(";
      const numPoint = lineString.getNumPoints();
      let first = true;

      for (let i = 0; i < numPoint; i++) {
        const c = lineString.getPointN(i + 1).getCoordinate();
        if (!first) {
          res += ",";
        }
        first = false;
        res += `${c[0].toFixed(1)} ${c[1].toFixed(1)}`; 
      }
      
      res += ")";
      this.buffer.push(res);
    }
  }
  
  visitGeometryCollection(geometryCollection: GeometryCollection): void {
     
    this.buffer = [];
    
    if (geometryCollection.isEmpty()) {
      this.buffer.push("GEOMETRYCOLLECTION EMPTY");
    } else {
      let res = "GEOMETRYCOLLECTION(";
      const numGeometries = geometryCollection.getNumGeometries();
      for (let i = 0; i < numGeometries; i++) {
        const geometry = geometryCollection.getGeometryN(i);
        const visitor = new WktVisitor();
        geometry.accept(visitor);
        res += visitor.getResult();
        if (i < numGeometries - 1) {
          res += ",";
        }
      }
      this.buffer.push(res);
    }
  }

  getResult(): string {
    return this.buffer.toString();
  }
}
