import { expect } from 'chai';
import EnvelopeBuilder from './../src/EnvelopeBuilder';
import Envelope from './../src/Envelope';
import Coordinate from './../src/Coordinate';

describe("EnvelopeBuilder Tests", () => {
  
  it("test default constructor", () => {
    const builder = new EnvelopeBuilder();
    const envelope = builder.build();
    expect(envelope.isEmpty()).to.be.true;
  });

  it("test default constructure with inserted coordinates", () => {
    const builder = new EnvelopeBuilder();
    builder.insert([1, 2]);
    builder.insert([3, 4]);
    builder.insert([0, 5]);

    const envelope = builder.build();

    expect(envelope.isEmpty()).to.be.false;
    expect(envelope.getXmin()).to.equal(0);
    expect(envelope.getXmax()).to.equal(3);
    expect(envelope.getYmin()).to.equal(2);
    expect(envelope.getYmax()).to.equal(5);
  });

  it("should handle single coordinate insertion", () => {
    const builder = new EnvelopeBuilder();
    builder.insert([2, 3]);

    const envelope = builder.build();
    expect(envelope.isEmpty()).to.be.false;
    expect(envelope.getXmin()).to.equal(2);
    expect(envelope.getXmax()).to.equal(2);
    expect(envelope.getYmin()).to.equal(3);
    expect(envelope.getYmax()).to.equal(3);
  });

  it("should convert envelope to string correctly", () => {
    const builder = new EnvelopeBuilder();
    builder.insert([1, 2]);
    builder.insert([3, 4]);

    const envelope = builder.build();
    expect(envelope.toString()).to.equal("1,2,3,4");
  });
});
