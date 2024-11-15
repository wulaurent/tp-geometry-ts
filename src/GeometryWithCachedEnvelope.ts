import Geometry from "./Geometry";
import Envelope from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";

export default class GeometryWithCachedEnvelope implements Geometry{
  public original: Geometry;
  public cachedEnvelope: Envelope;

  constructor(original: Geometry) {
    this.original = original;
  }

  getType(): string {
    return this.original.getType();
  }

  isEmpty(): boolean {
    return this.original.isEmpty();
  }

  translate(dx: number, dy: number) {
    this.original.translate(dx, dy);
    this.cachedEnvelope = undefined;
  }

  clone(): Geometry {
     return new GeometryWithCachedEnvelope(this.original.clone());
  }

  getEnvelope(): Envelope {
    if (!this.cachedEnvelope) {
      this.cachedEnvelope = this.original.getEnvelope();
    }
    return this.cachedEnvelope;
  }

  accept(visitor: GeometryVisitor): void {
    this.original.accept(visitor);
  }
}
