import { takeLatest, call, put } from "redux-saga/effects";
import {
  SEND_RECORD,
  triggerChat,
  updateContent,
  removeContent,
} from "./slice";
import { delay } from "../../utils";

interface SendRecordAction {
  type: string;
  payload: {
    id: bigint;
    formData: FormData;
  };
}

interface RequestInterviewAction {
  type: string;
  payload: {
    content: string;
  };
}

function* requestInterviewSaga(action: RequestInterviewAction) {
  try {
    yield put(triggerChat({ speaker: "bot" }));
    yield call(delay, 500);

    // const response: Response = yield call(
    //   fetch,
    //   "localhost:3000/interview/:id/contents",
    //   {
    //     method: "POST"
    //     body: aciton.payload.content
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error("STT API request failed");
    // }

    // const data = yield response.json();

    const text = "테스트테스트테스트테스트";

    if (text) {
      yield put(updateContent({ content: text as unknown as string }));
    } else {
      yield put(removeContent());
    }
  } catch (err) {
    yield put(removeContent());
  }
}

function* speechToTextSaga(
  action: SendRecordAction
): Generator<any, void, Response> {
  try {
    yield put(triggerChat({ speaker: "user" }));
    yield call(delay, 500);

    const response: Response = yield call(fetch, "/api/chat", {
      method: "POST",
      body: action.payload.formData,
    });

    if (!response.ok) {
      throw new Error("STT API request failed");
    }

    const data = yield response.json();

    if (data.text) {
      yield put(updateContent({ content: data.text as unknown as string }));
      yield* requestInterviewSaga({
        type: "REQUEST_INTERVIEW",
        payload: { content: data.text as unknown as string },
      });
    } else {
      yield put(removeContent());
    }
  } catch (err) {
    yield put(removeContent());
  }
}

export function* watchRecord() {
  yield takeLatest(SEND_RECORD, speechToTextSaga);
}
