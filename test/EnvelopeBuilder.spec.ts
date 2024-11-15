import { expect } from 'chai';
import EnvelopeBuilder from './../src/EnvelopeBuilder';
import Envelope from './../src/Envelope';
import Coordinate from './../src/Coordinate';
import GeometryCollection from '../src/GeometryCollection';
import Point from '../src/Point';
import LineString from '../src/LineString';

describe("EnvelopeBuilder", () => {
  
  describe("Default Constructor", () => {

    it("should create an empty envelope", () => {
      const builder = new EnvelopeBuilder();
      const envelope = builder.build();
      expect(envelope.isEmpty()).to.be.true;
    });
    
    it("should return NaN values in the envelope by default", () => {
      const builder = new EnvelopeBuilder();
      const envelope = builder.build();
      expect(envelope.toString()).to.equal("NaN,NaN,NaN,NaN");
    });
  });

  describe("Constructor with Coordinates", () => {
    
    it("should create a non-empty envelope with multiple coordinates", () => {
      const builder = new EnvelopeBuilder();
      builder.insert([1, 2]);
      builder.insert([3, 4]);
      builder.insert([0, 5]);
      const envelope = builder.build();

      expect(envelope.isEmpty()).to.be.false;
      expect(envelope.getXmin()).to.equal(0);
      expect(envelope.getXmax()).to.equal(3);
      expect(envelope.getYmin()).to.equal(2);
      expect(envelope.getYmax()).to.equal(5);
    });

    it("should handle a single coordinate insertion correctly", () => {
      const builder = new EnvelopeBuilder();
      builder.insert([2, 3]);
      const envelope = builder.build();

      expect(envelope.isEmpty()).to.be.false;
      expect(envelope.getXmin()).to.equal(2);
      expect(envelope.getXmax()).to.equal(2);
      expect(envelope.getYmin()).to.equal(3);
      expect(envelope.getYmax()).to.equal(3);
    });
  });
    
  describe("toString()", () => {

    it("should convert envelope to string correctly", () => {
      const builder = new EnvelopeBuilder();
      builder.insert([1, 2]);
      builder.insert([3, 4]);
      const envelope = builder.build();
      expect(envelope.toString()).to.equal("1,2,3,4");
    });
  });

  describe("throw error", () => {

    it("should convert envelope to string correctly", () => {
      const builder = new EnvelopeBuilder();
      builder.insert([1, 2]);
      builder.insert([3, 4]);
      const envelope = builder.build();
      expect(envelope.toString()).to.equal("1,2,3,4");
    });
  });
  
  describe("visitGeometry()", () => {
    
    it("should correctly build an envelope for a GeometryCollection", () => {
      const point1 = new Point([1, 2]);
      const point2 = new Point([3, 4]);
      const lineString = new LineString([
        new Point([0, 0]),
        new Point([5, 5])
      ]);
      const geometryCollection = new GeometryCollection([point1, lineString]);
      const envelopeBuilder = new EnvelopeBuilder();
      geometryCollection.accept(envelopeBuilder);
      const envelope = envelopeBuilder.build();
      expect(envelope.isEmpty()).to.be.false;
      expect(envelope.getXmin()).to.equal(0);
      expect(envelope.getXmax()).to.equal(5);
      expect(envelope.getYmin()).to.equal(0);
      expect(envelope.getYmax()).to.equal(5);
    }); 

    it("should return an empty envelope for an empty GeometryCollection", () => {
      const emptyCollection = new GeometryCollection();
      const envelopeBuilder = new EnvelopeBuilder();
      emptyCollection.accept(envelopeBuilder);
      const envelope = envelopeBuilder.build();
      expect(envelope.isEmpty()).to.be.true;
      expect(envelope.toString()).to.equal("NaN,NaN,NaN,NaN");         
     });

    it("should throw an error if a geometry in the collection is invalid", () => {
      const invalidGeometry = {};
      const geometryCollection = new GeometryCollection([invalidGeometry as any]);
      const envelopeBuilder = new EnvelopeBuilder();
      expect(() => geometryCollection.accept(envelopeBuilder)).to.throw(
        Error, "Invalid geometry at index 0");    
    });      
  });
});





