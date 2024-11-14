import "mocha";
import { expect } from 'chai';
import Envelope from "../src/Envelope.ts"; 
import Coordinate from "../src/Coordinate.ts";

describe("Envelope", () => {
  
  describe("Constructor", () => {
    
    it("should create an empty envelope by default", () => {                   
      const env = new Envelope();                                              
      expect(env.isEmpty()).to.be.true;
    });
  
    it("should create a non-empty envelope with given coordinates", () => {    
      const env = new Envelope([0, 1], [2, 3]);                                        
      expect(env.isEmpty()).to.be.false;                                       
    });     

  });

  describe("getX() and getY()", () => {

    it("should return correct min and max values", () => {                        
      const env = new Envelope([0, 1], [2, 3]);
      expect(env.getXmin()).to.equal(0);                                     
      expect(env.getXmax()).to.equal(2);                                     
      expect(env.getYmin()).to.equal(1);                                     
      expect(env.getYmax()).to.equal(3);                                     
    });

  });

  describe("toString()", () => {

    it("should convert envelope to correct string format", () => {
      const env = new Envelope([0, 1], [2, 3]);
      expect(env.toString()).to.equal("0,1,2,3");                      
    });

  });

  describe("isEmpty()", () => {

    it("should be empty if initialized with NaN values", () => {
      const env = new Envelope([NaN, 1], [2, NaN]);
      expect(env.isEmpty()).to.be.true;                                        
    });

  });

});

