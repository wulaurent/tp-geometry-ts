import "mocha";
import { expect } from 'chai';
import Envelope from "../src/Envelope.ts"; 
import Coordinate from "../src/Coordinate.ts";

describe("Envelope Tests", () => {
  
  it("test default constructor", () => {                   
      const env = new Envelope();                                              
      expect(env.isEmpty()).to.be.true;
    });
  
    it("test default constructor with values", () => {    
      const env = new Envelope([0, 1], [2, 3]);                                        
      expect(env.isEmpty()).to.be.false;                                       
    });                                                                        
  
    it("should get correct min and max values", () => {                        
      const env = new Envelope([0, 1], [2, 3]);
  
      expect(env.getXmin()).to.equal(0);                                     
      expect(env.getXmax()).to.equal(2);                                     
      expect(env.getYmin()).to.equal(1);                                     
      expect(env.getYmax()).to.equal(3);                                     
  });
  
  it("should convert envelope to string", () => {
    const env = new Envelope([0, 1], [2, 3]);
  
    expect(env.toString()).to.equal("0,1,2,3");                      
  });
  
  it("should handle NaN values correctly", () => {
    const env = new Envelope([NaN, 1], [2, NaN]);
    expect(env.isEmpty()).to.be.true;                                        
  });                                                                        
 });     
