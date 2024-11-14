import Coordinate from "./Coordinate";

export default class Envelope  {
  private bottomLeft?: Coordinate;
  private topRight?: Coordinate;

  constructor(bottomLeft:Coordinate = [Number.NaN, Number.NaN], topRight:Coordinate = [Number.NaN, Number.NaN]) {
    this.bottomLeft = bottomLeft;
    this.topRight = topRight;
  }


  isEmpty(): boolean {
    return isNaN(this.bottomLeft[0]) || isNaN(this.bottomLeft[1]) || isNaN(this.topRight[0]) || isNaN(this.topRight[1]);
  }

  getXmin(): number {
    return this.bottomLeft[0];
  }

  getYmin(): number {
    return this.bottomLeft[1];
  }

  getXmax(): number {
    return this.topRight[0];
  }

  getYmax(): number {
    return this.topRight[1];
  }
    
  toString(): string {
    return `${this.getXmin()},${this.getYmin()},${this.getXmax()},${this.getYmax()}`;
  }   
}




