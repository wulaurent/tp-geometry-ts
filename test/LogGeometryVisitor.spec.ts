
import { expect } from 'chai';
import Point from './../src/Point';
import LineString from './../src/LineString';
import { LogGeometryVisitor } from './../src/LogGeometryVisitor';

describe("LogGeometryVisitor", () => {
  describe("visitPoint()", () => {

    it("should log 'Je suis un point vide.' for an empty point", () => {
      const point = new Point();
      const visitor = new LogGeometryVisitor();

      let consoleOutput = "";
      const originalLog = console.log;
      console.log = (message: string) => {
        consoleOutput = message;
      };

      visitor.visitPoint(point);

      expect(consoleOutput).to.equal("Je suis un point vide.");

      console.log = originalLog; 
    });

    it("should log coordinates for a non-empty point", () => {
      const point = new Point([3.0, 4.0]);
      const visitor = new LogGeometryVisitor();

      let consoleOutput = "";
      const originalLog = console.log;
      console.log = (message: string) => {
        consoleOutput = message;
      };

      visitor.visitPoint(point);

      expect(consoleOutput).to.equal("Je suis un point avec x=3 et y=4");

      console.log = originalLog;
    });

    it("should log 'Je suis une polyligne vide.' for an empty linestring", () => {
      const lineString = new LineString();
      const visitor = new LogGeometryVisitor();

      let consoleOutput = "";
      const originalLog = console.log;
      console.log = (message: string) => {
        consoleOutput = message;
      };

      visitor.visitLineString(lineString);

      expect(consoleOutput).to.equal("Je suis une polyligne vide.");

      console.log = originalLog;
    });

    it("should log number of points for a non-empty linestring", () => {
      const points = [new Point([0, 0]), new Point([1, 1]), new Point([2, 2])];
      const lineString = new LineString(points);
      const visitor = new LogGeometryVisitor();

      let consoleOutput = "";
      const originalLog = console.log;
      console.log = (message: string) => {
        consoleOutput = message;
      };

      visitor.visitLineString(lineString);

      expect(consoleOutput).to.equal("Je suis une polyligne définie par 3 point(s)");

      console.log = originalLog;
    });
  });
});
