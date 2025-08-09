export const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null
};

export const handleNumber = (value, state) => {
  // Prevent multiple decimals
  if (value === "." && state.currentValue.includes(".")) {
    return state;
  }

  // Replace 0 if starting fresh
  if (state.currentValue === "0" && value !== ".") {
    return { currentValue: `${value}` };
  }

  return {
    currentValue: `${state.currentValue}${value}`
  };
};

export const handleEqual = (state) => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = {
    operator: null,
    previousValue: null
  };

  if (operator === "/" && current === 0) {
    return {
      currentValue: "Error", // Division by zero
      ...resetState
    };
  }

  let result = 0;
  switch (operator) {
    case "/":
      result = previous / current;
      break;
    case "*":
      result = previous * current;
      break;
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    default:
      return state;
  }

  return {
    currentValue: `${result}`,
    ...resetState
  };
};

const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);

    case "operator":
      return {
        operator: value,
        previousValue: state.currentValue,
        currentValue: "0"
      };

    case "equal":
      return handleEqual(state);

    case "clear":
      return initialState;

    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`,
        operator: state.operator,
        previousValue: state.previousValue
      };

    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
        operator: state.operator,
        previousValue: state.previousValue
      };

    default:
      return state;
  }
};

export default calculator;
