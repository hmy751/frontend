import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { StatusType } from "@/store/redux/type";

interface ChatContent {
  id: bigint | null;
  speaker: "user" | "bot";
  content: string;
}

interface ChatState {
  contents: ChatContent[];
  currentChat: {
    status: StatusType;
    id: bigint | null;
    speaker: "user" | "bot";
    content: string;
  };
}

const initialState: ChatState = {
  contents: [],
  currentChat: {
    status: "idle",
    id: null,
    speaker: "user",
    content: "",
  },
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

      state.currentChat = initialState.currentChat;
    },
    initializeCurrentChat: (state) => {
      state.currentChat = initialState.currentChat;
    },
  },
});

export const { initializeChatState, initializeCurrentChat } = slice.actions;
export default slice.reducer;
