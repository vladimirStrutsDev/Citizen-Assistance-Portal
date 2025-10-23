import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ApplicationLayout from './layouts/ApplicationLayout';
import AssistanceRequestWizard from './features/assistance-request/components/AssistanceRequestWizard';
import RequestSubmissionSuccess from './features/assistance-request/components/RequestSubmissionSuccess';

const App: React.FC = () => {
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
