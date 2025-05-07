import { createSlice } from '@reduxjs/toolkit';

import type {
  UpdateUserPayload,
  UpdateUserPayloadWithId,
  UserResponseItem,
} from '@repo/dto/user';

interface UsersSliceState {
  current: UserResponseItem;
  dataMap: Record<string, UserResponseItem>;
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
  dataMap: {},
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
      draft.dataMap = Object.fromEntries(
        action.payload.map((user) => [user.id, user]),
      );
    }),
    updateCurrentUser: creation.reducer<UpdateUserPayload>((draft, action) => {
      const { name } = action.payload;
      if (name && name !== draft.current.name) {
        draft.updated.current = { name };
      } else {
        draft.updated.current = null;
      }
    }),
    updateUser: creation.reducer<UpdateUserPayloadWithId>((draft, action) => {
      const { id, name } = action.payload;
      if (id === draft.current.id) {
        usersSlice.caseReducers.updateCurrentUser(
          draft,
          usersSlice.actions.updateCurrentUser({ name }),
        );
        return;
      }
      if (name && name !== draft.dataMap[id]?.name) {
        draft.updated.dataMap[id] = { name };
      } else {
        delete draft.updated.dataMap[id];
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
    selectUsersMap: (state) => {
      return state.dataMap;
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
  selectUsersMap,
  selectUpdatedUser,
} = usersSlice.selectors;

const { replaceData, updateCurrentUser, updateUser } = usersSlice.actions;

export { replaceData as replaceUsersData, updateCurrentUser, updateUser };
