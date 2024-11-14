import "mocha";
import { expect } from 'chai';
import Point from "../src/Point";
import WktWriter from"../src/WktWriter";
import LineString from "../src/LineString";

describe("WktWriter", () => {

  describe("writer()", () => {
  
    const writer = new WktWriter();

    it("should have empty point", () => {
      const p = new Point();
      expect(writer.write(p)).to.equal("POINT EMPTY");
    })

    it("should have point", () => {
      const p = new Point([3.0, 4.0]);
      expect(writer.write(p)).to.equal("POINT(3.0 4.0)");
    })

    it("should have empty linestring", () => {
      const linestring = new LineString();
      expect(writer.write(linestring)).to.equal("LINESTRING EMPTY");
    });

    it("should have linestring", () => {
      const p = [new Point([0.0, 0.0]), new Point([1.0, 1.0]), new Point([5.0, 5.0])];
      const line = new LineString(p);
      expect(writer.write(line)).to.equal("LINESTRING(0.0 0.0,1.0 1.0,5.0 5.0)");
    });

    it("should throw an error if geometry type is not supported", () => {
      const unsupportedGeometry: any = {};
      expect(() => writer.write(unsupportedGeometry)).to.throw(Error, "geometry type not supported");
    });
  });

});
