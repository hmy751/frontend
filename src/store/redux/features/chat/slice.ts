import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { StatusType } from "@/store/redux/type";

interface ChatContent {
  status: StatusType;
  speaker: "user" | "bot";
  content: string;
  timeStamp: Date;
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
    triggerChat: (
      state,
      action: PayloadAction<{ speaker: "user" | "bot" }>
    ) => {
      const current = {
        status: "loading" as "loading",
        speaker: action.payload.speaker,
        content: "",
        timeStamp: new Date(),
      };
      state.contents.push(current);
    },
    updateContent: (state, action: PayloadAction<{ content: string }>) => {
      state.contents[state.contents.length - 1].content =
        action.payload.content;
    },
    removeContent: (state) => {
      state.contents.pop();
    },
  },
});

export const {
  initializeChatState,
  triggerChat,
  updateContent,
  removeContent,
} = slice.actions;

export const SEND_RECORD = "test/GET_CHECK_SESSION" as const;

export default slice.reducer;
