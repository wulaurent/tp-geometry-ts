import "mocha";
import { expect } from "chai";
import GeometryCollection from "../src/GeometryCollection";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("GeometryCollection", () => {
  
  const p1 = new Point([1.0, 1.0]);
  const p2 = new Point([2.0, 2.0]);
  const linestring = new LineString([p1, p2]);
  const geometry = new GeometryCollection([p1, p2, linestring]);

  describe("Defulat constructor", () => {

    it('should be empty point and linestring', () => {
      const geometry = new GeometryCollection();
      expect(geometry.getNumGeometries()).to.equal(0);
    });

    it("should be not empty point and linestring", () => {


      expect(geometry.getNumGeometries()).to.be.equal(3);
      expect(geometry.getGeometryN(0)).to.be.equal(p1);
      expect(geometry.getGeometryN(1)).to.be.equal(p2);
      expect(geometry.getGeometryN(2)).to.be.equal(linestring);
    });
  });

  describe("getType()", () => {

    it('should return "GeometryCollection"', () => {
      const geometryCollection = new GeometryCollection();
      expect(geometryCollection.getType()).to.equal("GeometryCollection");
    });
  });

  describe("translate()", () => {

    it("should call translate on each geometry", function () {

      p1.translate(1.0, 1.0);
      p2.translate(1.0, 1.0);
      linestring.translate(1.0, 1.0);
      geometry.translate(1.0, 1.0);
      expect(geometry.getGeometryN(0)).to.deep.equal(p1);
      expect(geometry.getGeometryN(1)).to.deep.equal(p2);
      expect(geometry.getGeometryN(2)).to.deep.equal(linestring);
    });
  });

  describe("clone()", function () {

    it("should clone a GeometryCollection", () => {
      
      const clone = geometry.clone();
      expect(clone).to.not.equal(geometry);
    });
  });
  
  describe("getEnvelope()", () => {

    it("should getEnvelope a GeometryCollection", () => {
      
    });
  });


  describe("asText()", () => {
    
    const p1 = new Point([1.0, 1.0]);
    const p2 = new Point([2.0, 2.0]);
    const linestring = new LineString([p1, p2]);
    const geometry = new GeometryCollection([p1, p2, linestring]);
    
    it("should return true text", () => {
      const text = geometry.asText();
      expect(text).to.equal("GEOMETRYCOLLECTION(POINT(1.0 1.0),POINT(2.0 2.0),LINESTRING(1.0 1.0,2.0 2.0)")
    })
  })
});
