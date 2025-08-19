import React, { createContext, useContext, useReducer } from "react";

const CalculatorContext = createContext();

const initialState = {
  currentValue: "0",
  previousValue: null,
  operator: null,
  history: "", // <-- keep equation history here
};

function reducer(state, action) {
  switch (action.type) {
    case "number": {
      if (state.currentValue === "0" && action.value !== ".") {
        return { ...state, currentValue: action.value };
      }
      if (action.value === "." && state.currentValue.includes(".")) {
        return state;
      }
      return { ...state, currentValue: state.currentValue + action.value };
    }

    case "operator": {
      return {
        ...state,
        operator: action.value,
        previousValue: state.currentValue,
        currentValue: "0",
        history: `${state.currentValue} ${action.value}`, // build equation
      };
    }

    case "equal": {
      const { previousValue, operator, currentValue } = state;
      if (!previousValue || !operator) return state;

      const a = parseFloat(previousValue);
      const b = parseFloat(currentValue);
      let result = 0;

      if (operator === "/" && b === 0) {
        return { ...initialState, currentValue: "Error" };
      }

      switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = a / b; break;
        default: return state;
      }

      return {
        currentValue: String(result),
        previousValue: null,
        operator: null,
        history: `${previousValue} ${operator} ${currentValue} =`, // show full equation
      };
    }

    case "clear":
      return initialState;

    case "posneg":
      return { ...state, currentValue: String(parseFloat(state.currentValue) * -1) };

    case "percentage":
      return { ...state, currentValue: String(parseFloat(state.currentValue) * 0.01) };

    default:
      return state;
  }
}

export const CalculatorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePress = (type, value) => {
    dispatch({ type, value });
  };

  return (
    <CalculatorContext.Provider value={{ state, handlePress }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
