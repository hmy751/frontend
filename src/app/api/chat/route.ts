const CLIENT_SECRET = "61d0e6ee192c468dafacbe9a0f22b812";
const INVOKE_URL =
  "https://clovaspeech-gw.ncloud.com/external/v1/9004/a5a9d1c6d0ab5535899e9fe5f94da05b0b0d32843fa144ea8f7f9de46e2655fb";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const response = await fetch(`${INVOKE_URL}/recognizer/upload`, {
      method: "POST",
      headers: {
        "X-CLOVASPEECH-API-KEY": CLIENT_SECRET,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("STT API request failed");
    }

    const data = await response.json();
    return new Response(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
