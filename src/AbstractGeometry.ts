import Envelope from "./Envelope";
import Geometry from "./Geometry";
import WktVisitor from "./WktVisitor";
import GeometryVisitor from "./GeometryVisitor";

export abstract class AbstractGeometry implements Geometry {

 abstract getType(): string;
 abstract isEmpty(): boolean;
 abstract translate(dx: number, dy: number): void;
 abstract clone(): Geometry;
 abstract getEnvelope(): Envelope;

 abstract accept(visitor: GeometryVisitor): void;

 asText(): string {
   const visitor = new WktVisitor();
   this.accept(visitor);
   return visitor.getResult();
 }
}
