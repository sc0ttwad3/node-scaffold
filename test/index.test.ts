import {} from 'jest';
// need to import file.

describe("Testing index file", () => {
  it("should log to console", () => {
      expect("Test").toEqual("Test");
  });
});
