import "mocha";
import { expect } from "chai";
import LineString from "../src/LineString";
import Point from "../src/Point";

describe("test default class LineString", ()=> {
  
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

  it('should return the correct point at a given index', () => {          
    const p1 = new Point([1, 2]);                                           
    const p2 = new Point([3, 4]);                                           
    const line = new LineString([p1, p2]);                                
    expect(line.getPointN(1)).to.equal(p1);                               
    expect(line.getPointN(2)).to.equal(p2);                               
  });  

  it('should the correct translate point', () => {          
    const p1 = new Point([1, 2]);                                           
    const p2 = new Point([3, 4]);                                           
    const line = new LineString([p1, p2]);                                
    line.translate(1, 1);                                           
    expect(line.getPointN(1).getCoordinate()).to.deep.equal([2, 3]);                               
    expect(line.getPointN(2).getCoordinate()).to.deep.equal([4, 5]);
  });

  it("should clone a lineString and check the equality", () => {
        const p1 = new Point([1, 2]);
        const p2 = new Point([3, 4]);
        const p3 = new Point([5, 6]);

        const points = [p1, p2, p3];
        const line = new LineString(points);

        const clone = line.clone();

        expect(clone).to.not.equal(line);    

        clone.translate(1, 1); 

        expect(clone.getPointN(1).getCoordinate()).to.deep.equal([2, 3]);
        expect(clone.getPointN(2).getCoordinate()).to.deep.equal([4, 5]);
        expect(clone.getPointN(3).getCoordinate()).to.deep.equal([6, 7]);

        expect(line.getPointN(1).getCoordinate()).to.deep.equal([1, 2]);
        expect(line.getPointN(2).getCoordinate()).to.deep.equal([3, 4]);
        expect(line.getPointN(3).getCoordinate()).to.deep.equal([5, 6]);

  });
});


