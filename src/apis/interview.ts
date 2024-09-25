import { post } from "./index";

interface InterviewData {
  id: number;
}

export const fetchInterview = async ({
  interviewerId,
  reviewerId,
}: {
  interviewerId: number;
  reviewerId: number;
}) => {
  return post<InterviewData>({
    path: "interview",
    body: {
      interviewerId,
      reviewerId,
    },
  });
};
