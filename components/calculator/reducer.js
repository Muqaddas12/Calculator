export const initialState = {
  currentValue: "0",     // number being typed
  operator: null,        // + - * /
  previousValue: null,   // first operand
  equationLeft: "",      // "45 + " etc.
  previewResult: null,   // auto-calculated result shown live
};

// pure math
const compute = (a, op, b) => {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (isNaN(x) || isNaN(y)) return null;
  if (op === "/" && y === 0) return "Error";

  switch (op) {
    case "/": return String(x / y);
    case "*": return String(x * y);
    case "+": return String(x + y);
    case "-": return String(x - y);
    default: return null;
  }
};

// --- handlers ---
const handleNumber = (digit, state) => {
  const curr = state.currentValue ?? "";
  if (digit === "." && curr.includes(".")) return state;

  let newCurr = curr;
  if (curr === "0" && digit !== ".") newCurr = digit;
  else if (curr === "" && digit !== ".") newCurr = digit;
  else if (curr === "" && digit === ".") newCurr = "0.";
  else newCurr = curr + digit;

  // live compute if operator is active
  let preview = null;
  if (state.operator && state.previousValue) {
    preview = compute(state.previousValue, state.operator, newCurr);
  }

  return { ...state, currentValue: newCurr, previewResult: preview };
};

const handleOperator = (op, state) => {
  // if user just changes operator before typing second number
  if (state.operator && (state.currentValue === "" || state.currentValue === "0")) {
    return {
      ...state,
      operator: op,
      equationLeft: `${state.previousValue} ${op} `,
    };
  }

  // Move curr -> prev
  return {
    ...state,
    operator: op,
    previousValue: state.currentValue,
    currentValue: "",
    equationLeft: `${state.currentValue} ${op} `,
    previewResult: null,
  };
};

const handleEqual = (state) => {
  const { previousValue, operator, currentValue } = state;
  console.log('state',state)
  if (!previousValue || !operator || !currentValue) return state;
  const result = compute(previousValue, operator, currentValue);
  console.log('result',result)
  return {
    ...initialState,
    currentValue: String(result),
  };
};

const handlePosNeg = (state) => {
  const target = state.currentValue === "" ? "0" : state.currentValue;
  const flipped = String(parseFloat(target) * -1);

  // live recompute if operator exists
  let preview = state.previewResult;
  if (state.operator && state.previousValue) {
    preview = compute(state.previousValue, state.operator, flipped);
  }

  return { ...state, currentValue: flipped, previewResult: preview };
};

const handlePercent = (state) => {
  const target = state.currentValue === "" ? "0" : state.currentValue;
  const perc = String(parseFloat(target) * 0.01);

  let preview = state.previewResult;
  if (state.operator && state.previousValue) {
    preview = compute(state.previousValue, state.operator, perc);
  }

  return { ...state, currentValue: perc, previewResult: preview };
};

const handleClear = () => ({ ...initialState });

const handleLoadEquation = (entry) => ({
  currentValue: entry.current ?? "",
  operator: entry.operator ?? null,
  previousValue: entry.prev ?? null,
  equationLeft: entry.prev && entry.operator ? `${entry.prev} ${entry.operator} ` : "",
  previewResult: null,
});

// --- reducer ---
const calculatorReducer = (action, state) => {
  const { type, value } = action;
  switch (type) {
    case "number": return handleNumber(value, state);
    case "operator": return handleOperator(value, state);
    case "equal": return handleEqual(state);
    case "posneg": return handlePosNeg(state);
    case "percentage": return handlePercent(state);
    case "clear": return handleClear();
    case "load_equation": return handleLoadEquation(value);
    default: return state;
  }
};

export default calculatorReducer;
