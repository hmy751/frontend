import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { StatusType } from "@/store/redux/type";

interface ChatContent {
  status: StatusType;
  id: bigint | null;
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
    initializeChatState: (state, action: PayloadAction<ChatContent[]>) => {
      if (action.payload?.length) {
        state.contents = [...action.payload];
      } else {
        state.contents = [];
      }
    },
    triggerChat: () => {},
    pushContent: () => {},
    updateContent: () => {},
    removeContent: () => {},
  },
});

export const { initializeChatState } = slice.actions;

export const SEND_RECORD = "test/GET_CHECK_SESSION" as const;

export default slice.reducer;
