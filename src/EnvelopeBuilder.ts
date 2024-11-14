import Coordinate from './Coordinate';
import Envelope from './Envelope';

export default class EnvelopeBuilder {
  private xVals: number[] = [];
  private yVals: number[] = [];

  constructor() {}

  insert(coordinate: Coordinate): void {
    this.xVals.push(coordinate[0]);
    this.yVals.push(coordinate[1]);
  }

  build(): Envelope {
    if (this.xVals.length > 0 && this.yVals.length > 0) {
      const xmin = Math.min(...this.xVals);
      const xmax = Math.max(...this.xVals);
      const ymin = Math.min(...this.yVals);
      const ymax = Math.max(...this.yVals);

      const bottomLeft: Coordinate = [xmin, ymin];
      const topRight: Coordinate = [xmax, ymax];

      return new Envelope(bottomLeft, topRight);
    } else {
      return new Envelope([NaN, NaN], [NaN, NaN]);
    }
  }
 }

