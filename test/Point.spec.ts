import "mocha";
import { expect } from "chai";
import Point from "../src/Point";

describe("Point", () => {

  describe("Default Constructor", () => {
    const p = new Point();
    const coord = p.getCoordinate();

    it("should have NaN coordinates", () => {
      expect(coord).to.satisfy(([x, y]) => Number.isNaN(x) && Number.isNaN(y));
    });

    it("should have type 'Point'", () => {
      expect(p.getType()).to.equal("Point");
    });

    it("should have NaN values for x() and y()", () => {
      expect(p.x()).to.be.NaN;
      expect(p.y()).to.be.NaN;
    });

    it("should be empty", () => {
      expect(p.isEmpty()).to.be.true;
    });
  });

  describe("Constructor with Coordinates", () => {
    const p = new Point([3.0, 4.0]);

    it("should set correct coordinates", () => {
      expect(p.getCoordinate()).to.deep.equal([3.0, 4.0]);
    });

    it("should return correct x and y values", () => {
      expect(p.x()).to.equal(3.0);
      expect(p.y()).to.equal(4.0);
    });

    it("should not be empty", () => {
      expect(p.isEmpty()).to.be.false;
    });
  });

  describe("clone()", () => {
    const p = new Point([3, 4]);
    const clone = p.clone();

    it("should clone a point with identical but distinct properties", () => {
      expect(clone).to.not.equal(p);
      expect(clone.getCoordinate()).to.deep.equal(p.getCoordinate());
    });

    it("should not affect original point when translated", () => {
      clone.translate(1, 1);
      expect(clone.getCoordinate()).to.deep.equal([4, 5]);
      expect(p.getCoordinate()).to.deep.equal([3, 4]);
    });
  });

  describe("getEnvelope()", () => {
    it("should return an envelope with the same coordinates as the point", () => {
      const p = new Point([3, 7]);
      const envelope = p.getEnvelope();

      expect(envelope.getXmin()).to.equal(3);
      expect(envelope.getXmax()).to.equal(3);
      expect(envelope.getYmin()).to.equal(7);
      expect(envelope.getYmax()).to.equal(7);
    });

    it("should return an empty envelope for a point with NaN coordinates", () => {
      const p = new Point();
      const envelope = p.getEnvelope();

      expect(envelope.isEmpty()).to.be.true;
    });
  });

});
