import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { usersSlice } from './users/users-slice';

const rootReducer = combineSlices(usersSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
