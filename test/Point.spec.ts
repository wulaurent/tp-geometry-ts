import "mocha";
import { expect } from "chai";
import Point from "../src/Point";

describe("test Point", () => {

  it("test default constructor", () => {

    const p = new Point();
    const coord = p.getCoordinate();

    expect(Number.isNaN(coord[0])).to.be.true;
    expect(Number.isNaN(coord[1])).to.be.true;
    
    expect(p.getType()).to.equal("Point");
    
    expect(Number.isNaN(p.x())).to.be.true;
    expect(Number.isNaN(p.y())).to.be.true;
    expect(p.isEmpty()).to.be.true;
  });

  it("test constructor with coordinates", () => {
      const p = new Point([3.0,4.0]);
      expect(p.getCoordinate()).to.deep.equal([3.0,4.0]);
      expect(p.x()).to.equal(3.0);
      expect(p.y()).to.equal(4.0);
      expect(p.isEmpty()).to.be.false;
  });

  it("should clone a point and check the equality", () => {
    const p = new Point([3, 4]);
    const clone = p.clone();
    
    expect(clone).to.not.equal(p);
    clone.translate(1, 1);

    expect(clone.getCoordinate()).to.deep.equal([4, 5]);
    expect(p.getCoordinate()).to.deep.equal([3, 4]);
  });

});

