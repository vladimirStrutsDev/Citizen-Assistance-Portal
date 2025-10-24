import type { RouteObject } from "react-router-dom";
import ApplicationLayout from "../layouts/ApplicationLayout";
import RequestSubmissionSuccess from "../features/assistance-request/components/request-submission-success/RequestSubmissionSuccess";
import AssistanceRequestStepper from "../features/assistance-request/components/AssistanceRequestStepper";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <ApplicationLayout />,
    children: [
      {
        index: true,
        element: <AssistanceRequestStepper />,
        handle: {
          title: "Assistance Request",
          description: "Submit your assistance request",
        },
      },
      {
        path: "success",
        element: <RequestSubmissionSuccess />,
        handle: {
          title: "Request Submitted",
          description: "Your request has been successfully submitted",
        },
      },
    ],
  },
];
