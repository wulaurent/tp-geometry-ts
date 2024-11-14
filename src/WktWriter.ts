import LineString from "./LineString";
import Point from "./Point";
import Geometry from "./Geometry";

export default class WktWriter {
  
  public write(geometry: Geometry): string {
    if (geometry instanceof Point) {
      const point = geometry as Point;
      if (point.isEmpty()) {
        return "POINT EMPTY";
      } else {
        const coordinate = point.getCoordinate();
        return `POINT(${coordinate[0].toFixed(1)} ${coordinate[1].toFixed(1)})`;
      }
    } else if (geometry instanceof LineString) {
      const lineString = geometry as LineString;
      if (lineString.isEmpty()) {
        return "LINESTRING EMPTY";
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
        return res;
      }
    } else {
      throw new Error("geometry type not supported");
    }
  }

}
