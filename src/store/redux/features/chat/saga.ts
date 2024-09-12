import { takeLatest, call, put } from "redux-saga/effects";
import { SEND_RECORD } from "./slice";

interface SendRecordAction {
  type: string;
  payload: {
    formData: FormData;
  };
}

function* speechToTextSaga(
  action: SendRecordAction
): Generator<any, void, Response> {
  try {
    const response: Response = yield call(fetch, "/api/chat", {
      method: "POST",
      body: action.payload.formData,
    });

    if (!response.ok) {
      throw new Error("STT API request failed");
    }

    const data = yield response.json();
    console.log("STT Result:", data.text);
  } catch (err) {}
}

export function* watchRecord() {
  yield takeLatest(SEND_RECORD, speechToTextSaga);
}
