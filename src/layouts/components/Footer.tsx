import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {t("footer.privacyPolicy")}
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {t("footer.termsOfService")}
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {t("footer.contactSupport")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
