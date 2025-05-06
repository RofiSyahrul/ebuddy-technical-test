import { createSlice } from '@reduxjs/toolkit';

import type { UpdateUserPayload, UserResponseItem } from '@repo/dto/user';

interface UsersSliceState {
  current: UserResponseItem;
  data: UserResponseItem[];
  updated: {
    current: UpdateUserPayload | null;
    dataMap: Partial<Record<string, UpdateUserPayload>>;
  };
}

const initialState: UsersSliceState = {
  current: {
    email: '',
    id: '',
    lastActive: '',
    name: '',
  },
  data: [],
  updated: {
    current: null,
    dataMap: {},
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: (creation) => ({
    replaceData: creation.reducer<UserResponseItem[]>((draft, action) => {
      draft.data = action.payload;
      draft.updated.dataMap = {};
    }),
    updateCurrentUser: creation.reducer<UpdateUserPayload>((draft, action) => {
      const { name } = action.payload;
      if (name && name !== draft.current.name) {
        draft.updated.current = { name };
      } else {
        draft.updated.current = null;
      }
    }),
  }),
  selectors: {
    hasUnsavedChangesSelector: (state) => {
      return !!(
        state.updated.current || Object.keys(state.updated.dataMap).length
      );
    },
    selectCurrentUserId: (state) => {
      return state.current.id;
    },
    selectCurrentUserName: (state) => {
      return state.updated.current?.name ?? state.current.name;
    },
    selectUsers: (state) => {
      return state.data;
    },
    selectUpdatedUser: (state, id: string) => {
      return state.updated.dataMap[id];
    },
  },
});

export const {
  hasUnsavedChangesSelector,
  selectCurrentUserId,
  selectCurrentUserName,
  selectUsers,
  selectUpdatedUser,
} = usersSlice.selectors;

const { replaceData, updateCurrentUser } = usersSlice.actions;

export { replaceData as replaceUsersData, updateCurrentUser };
