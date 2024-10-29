describe("Example tests should", () => {
  it("be null", () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  it("be zero", () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

  it("calculate correctly", () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(4);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4);
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  it("contain 'stop' on Christoph", () => {
    expect("Christoph").toMatch(/stop/);
  });

  it("contains 'milk' on list", () => {
    const list = ["milk", "bread"];
    expect(list).toContain("milk");
  });
});
