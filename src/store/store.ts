import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {selectRiskLevel} from '../redux/reducers';
import {IReduxState} from '../applicationInterfaces'

declare global {
  // eslint-disable-next-line
  interface Window {
    // eslint-disable-next-line no-underscore-dangle
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
}

export const middlewares = [thunk];
export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export const reducers = combineReducers({
  selectRiskLevel
});

const store = createStoreWithMiddleware(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export interface IRootRedux {
  selectRiskLevel? :IReduxState
}

export function getState(): IRootRedux {
  return store.getState() as IRootRedux;
}

export default store;
