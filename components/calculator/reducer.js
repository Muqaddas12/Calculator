export const initialState = {
  currentValue: "0",     // what's being typed for the current operand; becomes "" after operator press
  operator: null,
  previousValue: null,   // first operand
  equationLeft: "",      // e.g., "45 + " (for the equation line)
};

// helpers
const compute = (a, op, b) => {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (op === "/" && y === 0) return "Error";
  switch (op) {
    case "/": return String(x / y);
    case "*": return String(x * y);
    case "+": return String(x + y);
    case "-": return String(x - y);
    default:  return null;
  }
};

const handleNumber = (digit, state) => {
  const curr = state.currentValue ?? "";
  // prevent multiple decimals
  if (digit === "." && curr.includes(".")) return state;

  // if just pressed operator, currentValue may be ""
  if (curr === "0" && digit !== ".") {
    return { ...state, currentValue: digit };
  }
  if (curr === "" && digit !== ".") {
    return { ...state, currentValue: digit };
  }
  if (curr === "" && digit === ".") {
    return { ...state, currentValue: "0." };
  }
  return { ...state, currentValue: curr + digit };
};

const handleOperator = (op, state) => {
  // If there's already an operator and user is changing it (no second operand typed yet)
  if (state.operator && (state.currentValue === "" || state.currentValue === "0")) {
    return {
      ...state,
      operator: op,
      equationLeft: `${state.previousValue} ${op} `,
    };
  }

  // Move currentValue to previousValue, keep it visible in equationLeft
  return {
    ...state,
    operator: op,
    previousValue: state.currentValue,
    currentValue: "", // ready for second operand input (but first stays visible in equation line)
    equationLeft: `${state.currentValue} ${op} `,
  };
};

const handleEqual = (state) => {
  const { previousValue, operator, currentValue } = state;
  if (!previousValue || !operator || currentValue === "" || currentValue == null) return state;
  const result = compute(previousValue, operator, currentValue);
  return {
    ...initialState,
    currentValue: String(result),
  };
};

const handlePosNeg = (state) => {
  const target = state.currentValue === "" ? "0" : state.currentValue;
  return { ...state, currentValue: String(parseFloat(target) * -1) };
};

const handlePercent = (state) => {
  const target = state.currentValue === "" ? "0" : state.currentValue;
  return { ...state, currentValue: String(parseFloat(target) * 0.01) };
};

const handleClear = () => ({ ...initialState });

const handleLoadEquation = (entry) => ({
  currentValue: entry.current ?? "",
  operator: entry.operator ?? null,
  previousValue: entry.prev ?? null,
  equationLeft: entry.prev && entry.operator ? `${entry.prev} ${entry.operator} ` : "",
});

// reducer
const calculatorReducer = (action, state) => {
  const { type, value } = action;
  switch (type) {
    case "number":      return handleNumber(value, state);
    case "operator":    return handleOperator(value, state);
    case "equal":       return handleEqual(state);
    case "posneg":      return handlePosNeg(state);
    case "percentage":  return handlePercent(state);
    case "clear":       return handleClear();
    case "load_equation": return handleLoadEquation(value);
    default:            return state;
  }
};

export default calculatorReducer;
