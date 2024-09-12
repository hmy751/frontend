import { RootState } from "@/store/redux/rootStore";

export const selectCount = (state: RootState) => state.counter.value;
