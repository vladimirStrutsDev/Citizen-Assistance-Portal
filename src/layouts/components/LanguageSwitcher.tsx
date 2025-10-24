import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: "en" | "ar") => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500 hidden sm:inline">
        {t("language.language")}
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
          {t("language.english")}
        </button>
        <button
          onClick={() => handleLanguageChange("ar")}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
            i18n.language === "ar"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t("language.arabic")}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
