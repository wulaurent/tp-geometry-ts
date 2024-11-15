import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";

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

  getResult(): string {
    return this.buffer.toString();
  }
}
