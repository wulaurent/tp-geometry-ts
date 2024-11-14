import "mocha";
import { expect } from "chai";
import LineString from "../src/LineString";
import Point from "../src/Point";

describe("test LineString", ()=> {
  
  it("test default constructor", () => {
    const linestring = new LineString();
    expect(linestring.getType()).to.equal("LineString");
    expect(linestring.getNumPoints()).to.equal(0);
    expect(linestring.isEmpty()).to.be.true;
  });
  
  it("test constructor with points", () => {
    const p1 = new Point([1, 2]);                                           
    const p2 = new Point([3, 4]);                                           
    const linestring = new LineString([p1, p2]);                                
    expect(linestring.getNumPoints()).to.equal(2);
    expect(linestring.isEmpty()).to.be.false;
  });

  it('return correct point at a given index', () => {          
    const p1 = new Point([1, 2]);                                           
    const p2 = new Point([3, 4]);                                           
    const line = new LineString([p1, p2]);                                
    expect(line.getPointN(1)).to.equal(p1);                               
    expect(line.getPointN(2)).to.equal(p2);                               
  });  

});


