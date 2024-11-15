import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import WktVisitor from "../src/WktVisitor";
import LineString from "../src/LineString";

describe("WktVisitor", () => {
  const visitor = new WktVisitor();

  describe("visitPoint()", () => {
    
    it("should have empty point", () => {
      const p = new Point();
      p.accept(visitor);
      expect(visitor.getResult()).to.be.equal("POINT EMPTY");
    });

    it("should have coordinates point", () => {
      const p = new Point([3.0, 4.0]);
      p.accept(visitor);
      expect(visitor.getResult()).to.be.equal("POINT(3.0 4.0)");
    });
  });
  
  describe("visitLineString()", () => {
    it("should have no lineString", () => {
      const linestring = new LineString();
      linestring.accept(visitor);
      expect(visitor.getResult()).to.be.equal("LINESTRING EMPTY");
    });

    it("should have coordinates in linestring", () => {
      const linestring = new LineString([
        new Point([0.0, 0.0]), 
        new Point([1.0, 1.0]), 
        new Point([5.0, 5.0])
      ]);
      linestring.accept(visitor);
      expect(visitor.getResult()).to.be.equal("LINESTRING(0.0 0.0,1.0 1.0,5.0 5.0)");
    });
  });
});
