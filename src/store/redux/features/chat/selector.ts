import { RootState } from "@/store/redux/rootStore";

export const selectChat = (state: RootState) => state.chat.contents;
export const selectLastBotChatStatus = (state: RootState) => {
  const lastChat = state.chat.contents[state.chat.contents.length - 1];

  if (lastChat?.speaker === "bot") {
    return lastChat.status;
  }

  return null;
};
export const selectChatId = (state: RootState) => {
  state.chat.id;
};
