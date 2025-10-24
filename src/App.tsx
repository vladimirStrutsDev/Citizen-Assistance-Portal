import { Routes, Route } from "react-router-dom";
import ApplicationLayout from "./layouts/ApplicationLayout";
import AssistanceRequestWizard from "./features/assistance-request/components/AssistanceRequestWizard";
import RequestSubmissionSuccess from "./features/assistance-request/components/RequestSubmissionSuccess";
import type { FC } from "react";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ApplicationLayout />}>
        <Route index element={<AssistanceRequestWizard />} />
        <Route path="success" element={<RequestSubmissionSuccess />} />
      </Route>
    </Routes>
  );
};

export default App;
