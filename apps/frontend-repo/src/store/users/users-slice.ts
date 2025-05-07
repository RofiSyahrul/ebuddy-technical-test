import { createSlice } from '@reduxjs/toolkit';

import type {
  UpdateUserPayload,
  UpdateUserPayloadWithId,
  UserResponseItem,
} from '@repo/dto/user';

export interface UsersSliceState {
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

    saveAll: creation.reducer((draft) => {
      const { current, dataMap } = draft.updated;

      if (current) {
        draft.current = { ...draft.current, ...current };
        draft.updated.current = null;
      }

      draft.dataMap = Object.fromEntries(
        Object.values(draft.dataMap).map((user) => [
          user.id,
          { ...user, ...dataMap[user.id] },
        ]),
      );

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
  selectCurrentUserId,
  selectCurrentUserName,
  selectUsersMap,
  selectUpdatedUser,
} = usersSlice.selectors;

export const {
  replaceData: replaceUsersData,
  saveAll: saveAllUsersChanges,
  updateCurrentUser,
  updateUser,
} = usersSlice.actions;
