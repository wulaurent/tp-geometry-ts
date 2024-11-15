import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import GeometryWithCachedEnvelope from "../src/GeometryWithCachedEnvelope";
import GeometryVisitor from "../src/GeometryVisitor";

describe('GeometryWithCachedEnvelope', () => {

  const point = new Point([3.0, 3.0]);
  const geometryWithCache = new GeometryWithCachedEnvelope(point);

  describe("getEnvelope()", () => {
    
    it('should cache the envelope after the first calculation', () => {
      const firstEnvelope = geometryWithCache.getEnvelope();
      const secondEnvelope = geometryWithCache.getEnvelope();
      expect(firstEnvelope).to.equal(secondEnvelope);
    });
  });

  describe("translate()", () => {

    it('should invalidate the cache when translated', () => {
      const firstEnvelope = geometryWithCache.getEnvelope();
      geometryWithCache.translate(10, 20);
      const secondEnvelope = geometryWithCache.getEnvelope();
      expect(firstEnvelope).to.not.equal(secondEnvelope);
    });
  })

  describe("getType()", () => {

    it('should return the correct type', () => {
      expect(geometryWithCache.getType()).to.equal('Point');
    });
  })

  describe("isEmpty()", () => {

    it('should return the correct isEmpty status', () => {
      expect(geometryWithCache.isEmpty()).to.be.false;
    });
  })

  describe("clone()", () => {

     it('should clone the original geometry', () => {
      const clone = geometryWithCache.clone();
      expect(clone).to.be.instanceOf(GeometryWithCachedEnvelope);
    });
  })

  describe("accept()", () => {

     it('should accept a visitor', () => {                              
       const point = new Point([3.0, 4.0]);    
       const geometryWithCache = new GeometryWithCachedEnvelope(point);
       const mockVisitor = {
         visitPointCalled: false,
         visitPoint(p) {
           this.visitPointCalled = true;
           expect(p).to.equal(point);
         },
         visitLineString() {},
         visitGeometryCollection() {}
       };
       geometryWithCache.accept(mockVisitor);
       expect(mockVisitor.visitPointCalled).to.be.true;                 
     });                                                                
  });


});



