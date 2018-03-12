import lokijs from "lokijs";

describe("lokijs", () => {
  it("works", () => {
    const db = new lokijs("test");

    const col = db.addCollection("tests");

    col.insert({ foo: "bar" });
    const entity = col.find({ foo: "bar" })[0];
    expect(entity.foo).toBe("bar");
  });
});
