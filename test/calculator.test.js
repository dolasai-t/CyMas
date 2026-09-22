import assert from "node:assert/strict";
import test from "node:test";
import { calculateSum } from "../src/calculator.js";

const examples = [
  ["2", "3", 5],
  ["-7", "2", -5],
  ["0", "0", 0],
  ["1000000", "1000000", 2000000],
  ["-1000000", "-1000000", -2000000],
  ["-1000000", "1000000", 0],
  ["-0", "-0", 0],
  ["  +00012  ", "\t-007\n", 5],
];

for (const [first, second, value] of examples) {
  test(`${JSON.stringify(first)} + ${JSON.stringify(second)} gives ${value}`, () => {
    assert.deepEqual(calculateSum(first, second), { ok: true, value });
  });
}

const invalidInputs = [
  "", " \t\n", "1.5", "1.0", "1e3", "1,000", "1_000", "hello",
  "Infinity", "NaN", "2+3", "0x10", "+", "--2", "1 2", "１２", "١٢",
  "1000001", "-1000001", "99999999999999999999999999999999999999",
  "9".repeat(400), "<script>alert(1)</script>",
];

for (const input of invalidInputs) {
  test(`rejects ${JSON.stringify(input.slice(0, 45))} in either operand`, () => {
    for (const name of ["first", "second"]) {
      const result = name === "first" ? calculateSum(input, "1") : calculateSum("1", input);
      assert.equal(result.ok, false);
      assert.deepEqual(Object.keys(result.errors), [name]);
      assert.ok(result.errors[name].length > 0);
      assert.equal("value" in result, false);
    }
  });
}

test("reports both invalid fields together", () => {
  const result = calculateSum("", "1000001");
  assert.equal(result.ok, false);
  assert.deepEqual(Object.keys(result.errors), ["first", "second"]);
  assert.match(result.errors.first, /whole number/);
  assert.match(result.errors.second, /-1,000,000 to 1,000,000/);
});

test("a corrected submission succeeds after an invalid one", () => {
  assert.equal(calculateSum("1.5", "2").ok, false);
  assert.deepEqual(calculateSum("1", "2"), { ok: true, value: 3 });
});
