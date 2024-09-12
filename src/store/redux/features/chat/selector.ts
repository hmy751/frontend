import { RootState } from "@/store/redux/rootStore";

export const selectChat = (state: RootState) => state.chat.contents;
