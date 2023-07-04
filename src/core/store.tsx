/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { createContext, useReducer } from "react";

export const createStore = <StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType,
  persistenceKey?: string
) => {
  try {
    initialState =
      JSON.parse(localStorage.getItem(persistenceKey)) || initialState;

    // eslint-disable-next-line no-empty
  } catch {}

  const persistentReducer = (state: StateType, action: ActionType) => {
    const newState: StateType = reducer(state, action);
    if (persistenceKey) {
      localStorage.setItem(persistenceKey, JSON.stringify(newState));
    }
    return newState;
  };

  const defaultDispatch: React.Dispatch<ActionType> = () => initialState;
  const ctx = createContext({
    state: initialState,
    dispatch: defaultDispatch,
  });

  const Provider = (props: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
      persistentReducer,
      initialState
    );
    return <ctx.Provider value={{ state, dispatch }} {...props} />;
  };
  return [ctx, Provider] as const;
};

