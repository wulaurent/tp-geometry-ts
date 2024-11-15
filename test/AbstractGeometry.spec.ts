import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("AbstractGeometry", () => {
  
  describe("asText()", () => {
    
    it("should have empty point", () => {
      const p = new Point();
      expect(p.asText()).to.equal("POINT EMPTY");
    });
    
    it("should have coordinates point", () => {
      const p = new Point([3.0, 4.0]);
      expect(p.asText()).to.equal("POINT(3.0 4.0)");
    });

    it("should have empty linestring", () => {
      const linestring = new Point();
      expect(linestring.asText()).to.equal("POINT EMPTY");
    });

    it("should have coordinates linestring", () => {
      const linestring = new LineString([
        new Point([0.0, 0.0]), 
        new Point([1.0, 1.0]), 
        new Point([5.0, 5.0])
      ]);
      expect(linestring.asText()).to.equal("LINESTRING(0.0 0.0,1.0 1.0,5.0 5.0)");
    });

  });
});
