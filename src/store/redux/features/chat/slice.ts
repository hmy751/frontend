import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChatContent {
  id: bigint;
  speaker: "user" | "bot";
  content: string;
}

interface ChatState {
  contents: ChatContent[];
}

const initialState: ChatState = {
  contents: [],
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initializeChat: (state, action: PayloadAction<ChatContent[]>) => {
      if (action.payload?.length) {
        state.contents = [...action.payload];
      }
    },
    addContent: (state, action: PayloadAction<ChatContent>) => {
      state.contents.push(action.payload);
    },
  },
});

export const { initializeChat, addContent } = slice.actions;
export default slice.reducer;
