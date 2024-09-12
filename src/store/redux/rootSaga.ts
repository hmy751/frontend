import { all } from "redux-saga/effects";
import { watchIncrementAsync } from "@/store/redux/features/chat/saga";

export function* helloSaga() {
  console.log("Hello Sagas!");
}

export function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
