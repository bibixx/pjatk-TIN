import { LANG_KEY } from 'constants/localStorage';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { i18n, t } = useTranslation();

  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;

    i18n.changeLanguage(newLanguage);
    localStorage.setItem(LANG_KEY, newLanguage);
  };

  return (
    <footer className="footer">
      <span>{t('footer.text')}</span>
      <select
        onChange={onLanguageChange}
        value={i18n.language}
        className="footer__select"
      >
        <option value="pl">🇵🇱</option>
        <option value="en-GB">🇬🇧</option>
        <option value="cimode">🧑‍💻</option>
      </select>
    </footer>
  );
};
