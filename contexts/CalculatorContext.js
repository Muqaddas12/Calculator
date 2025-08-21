import React, { createContext, useContext, useReducer } from "react";

// initial state
export const initialState = {
  expression: "",
  currentValue: "0",
  result: "",
  justEvaluated: false,
};

// safe eval helper
const safeEval = (expr) => {
  try {
    const sanitized = expr.replace(/[^-()\d/*+.]/g, "");
    // eslint-disable-next-line no-new-func
    return Function(`"use strict"; return (${sanitized})`)();
  } catch (e) {
    return null;
  }
};

// reducer
function reducer(state, action) {
  switch (action.type) {
    case "clear":
      return { ...initialState };

    case "backspace": {
      if (state.justEvaluated) {
        return state; // no backspace right after "="
      }
      const updated =
        state.currentValue.length > 1
          ? state.currentValue.slice(0, -1)
          : "0";
      return {
        ...state,
        currentValue: updated,
      };
    }

   case "number": {
  if (state.justEvaluated) {
    // start fresh after "="
    return {
      ...state,
      currentValue: action.value,
      expression: action.value,
      result: "",
      justEvaluated: false,
    };
  }

  // Get the current operand (after the last operator)
  const lastOperand = state.expression.split(/[-+*/]/).pop();

  // Prevent multiple decimals in the same operand
  if (action.value === "." && lastOperand.includes(".")) {
    return state; // ignore extra "."
  }

  const newVal =
    state.currentValue === "0" && action.value !== "."
      ? action.value
      : state.currentValue + action.value;

  return {
    ...state,
    currentValue: newVal,
    expression: state.expression + action.value,
    result: safeEval(state.expression + action.value),
  };
}

    case "operator": {
      const lastChar = state.expression.slice(-1);
      if (/[+\-*/]/.test(lastChar)) {
        // replace last operator
        return {
          ...state,
          expression: state.expression.slice(0, -1) + action.value,
          justEvaluated: false,
        };
      }

      if (state.justEvaluated) {
        // continue from result
        return {
          ...state,
          expression: state.currentValue + action.value,
          justEvaluated: false,
        };
      }

      return {
        ...state,
        expression: state.expression + action.value,
        justEvaluated: false,
      };
    }

    case "equal": {
      const fullExpr = state.expression || state.currentValue;
      const result = safeEval(fullExpr);

      return {
        ...state,
        currentValue: result !== null ? String(result) : "0",
        expression: result !== null ? String(result) : "0",
        result: "",
        justEvaluated: true,
      };
    }

    case "posneg": {
      const val = String(-(parseFloat(state.currentValue) || 0));
      return {
        ...state,
        currentValue: val,
        expression: val,
      };
    }

    case "percentage": {
      const val = String((parseFloat(state.currentValue) || 0) / 100);
      return {
        ...state,
        currentValue: val,
        expression: val,
      };
    }

    default:
      return state;
  }
}

// context
const CalculatorContext = createContext();

export function CalculatorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePress = (type, value) => {
    dispatch({ type, value });
  };

  return (
    <CalculatorContext.Provider value={{ state, handlePress }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  return useContext(CalculatorContext);
}
