import { Routes, Route } from "react-router-dom";
import ApplicationLayout from "./layouts/ApplicationLayout";
import RequestSubmissionSuccess from "./features/assistance-request/components/request-submission-success/RequestSubmissionSuccess";
import type { FC } from "react";
import AssistanceRequestStepper from "./features/assistance-request/components/AssistanceRequestStepper";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ApplicationLayout />}>
        <Route index element={<AssistanceRequestStepper />} />
        <Route path="success" element={<RequestSubmissionSuccess />} />
      </Route>
    </Routes>
  );
};

export default App;
