import "mocha";
import { expect } from "chai";
import LineString from "../src/LineString";
import Point from "../src/Point";

describe("LineString", () => {

  describe("Default Constructor", () => {
    const line = new LineString();

    it("should have type 'LineString'", () => {
      expect(line.getType()).to.equal("LineString");
    });

    it("should be empty with zero points", () => {
      expect(line.getNumPoints()).to.equal(0);
      expect(line.isEmpty()).to.be.true;
    });
  });

  describe("Constructor with Points", () => {
    const points = [new Point([1, 2]), new Point([3, 4])];
    const line = new LineString(points);

    it("should initialize with given points", () => {
      expect(line.getNumPoints()).to.equal(2);
      expect(line.isEmpty()).to.be.false;
    });

    it("should return the correct point at a given index", () => {
      expect(line.getPointN(1)).to.equal(points[0]);
      expect(line.getPointN(2)).to.equal(points[1]);
    });
  });

  describe("translate()", () => {
    const p1 = new Point([1, 2]);
    const p2 = new Point([3, 4]);
    const line = new LineString([p1, p2]);

    it("should correctly translate all points", () => {
      line.translate(1, 1);
      expect(line.getPointN(1).getCoordinate()).to.deep.equal([2, 3]);
      expect(line.getPointN(2).getCoordinate()).to.deep.equal([4, 5]);
    });
  });

  describe("clone()", () => {
    const points = [new Point([1, 2]), new Point([3, 4]), new Point([5, 6])];
    const line = new LineString(points);
    const clone = line.clone();

    it("should create a distinct clone with identical points", () => {
      expect(clone).to.not.equal(line);
      expect(clone.getNumPoints()).to.equal(line.getNumPoints());
      points.forEach((point, i) => {
        expect(clone.getPointN(i + 1).getCoordinate()).to.deep.equal(point.getCoordinate());
      });
    });

    it("should not affect the original line when translated", () => {
      clone.translate(1, 1);
      expect(clone.getPointN(1).getCoordinate()).to.deep.equal([2, 3]);
      expect(clone.getPointN(2).getCoordinate()).to.deep.equal([4, 5]);
      expect(clone.getPointN(3).getCoordinate()).to.deep.equal([6, 7]);
      expect(line.getPointN(1).getCoordinate()).to.deep.equal([1, 2]);
      expect(line.getPointN(2).getCoordinate()).to.deep.equal([3, 4]);
      expect(line.getPointN(3).getCoordinate()).to.deep.equal([5, 6]);
    });
  });

  describe("getEnvelope()", () => {
    it("should return correct bounding box for all points", () => {
      const points = [new Point([1, 2]), new Point([3, 4]), new Point([5, 6])];
      const line = new LineString(points);
      const envelope = line.getEnvelope();

      expect(envelope.getXmin()).to.equal(1);
      expect(envelope.getYmin()).to.equal(2);
      expect(envelope.getXmax()).to.equal(5);
      expect(envelope.getYmax()).to.equal(6);
    });

    it("should return an empty bounding box when no points", () => {
      const line = new LineString();
      const envelope = line.getEnvelope();

      expect(envelope.isEmpty()).to.be.true;
    });
  });

});
