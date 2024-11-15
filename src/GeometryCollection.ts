import Envelope from "./Envelope";
import Geometry from "./Geometry";
import WktVisitor from "./WktVisitor";
import GeometryVisitor from "./GeometryVisitor";
import EnvelopeBuilder from "./EnvelopeBuilder";
import { AbstractGeometry } from "./AbstractGeometry";

export default class GeometryCollection extends AbstractGeometry {
  private geometries: Array<Geometry>;

  constructor(geometries: Array<Geometry> = []) {
    super();
    this.geometries = geometries;
  }

  getType(): string {
    return "GeometryCollection";
  }

  isEmpty(): boolean {
    return this.geometries.length === 0;
  }

  translate(dx: number, dy: number): void {
    for (const p of this.geometries) {
      p.translate(dx, dy);
    }
  }

  clone(): Geometry {
    const clonedGeometries = this.geometries.map(geometry => geometry.clone());
    return new GeometryCollection(clonedGeometries);
  }

  accept(visitor: GeometryVisitor): void {
    visitor.visitGeometryCollection(this);
  }

  getNumGeometries(): number {
    return this.geometries.length;
  }

  getGeometryN(n: number): Geometry {
    return this.geometries[n];
  }
}
