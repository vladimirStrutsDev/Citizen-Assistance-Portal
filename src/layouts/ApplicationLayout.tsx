import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

const ApplicationLayout: FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default ApplicationLayout;
