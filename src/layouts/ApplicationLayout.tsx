import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const ApplicationLayout: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: "en" | "ar") => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t("appTitle")}
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  {t("appSubtitle")}
                </p>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 hidden sm:inline">
                Language:
              </span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    i18n.language === "en"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("ar")}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    i18n.language === "ar"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} Citizen Assistance Portal. All
                rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Providing essential support services to our community
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApplicationLayout;
