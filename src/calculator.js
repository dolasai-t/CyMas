const MAX_OPERAND = 1_000_000;

function parseOperand(input) {
  const text = input.trim();
  if (!/^[+-]?[0-9]+$/.test(text)) {
    return { error: "Enter a whole number, such as 12 or -7." };
  }

  const value = Number(text);
  if (!Number.isSafeInteger(value) || Math.abs(value) > MAX_OPERAND) {
    return { error: "Enter a number from -1,000,000 to 1,000,000." };
  }

  return { value };
}

/** Validate two input strings, then return their exact integer sum or field errors. */
export function calculateSum(firstInput, secondInput) {
  const first = parseOperand(firstInput);
  const second = parseOperand(secondInput);
  const errors = {};
  if (first.error) errors.first = first.error;
  if (second.error) errors.second = second.error;
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const sum = first.value + second.value;
  return { ok: true, value: sum === 0 ? 0 : sum };
}
