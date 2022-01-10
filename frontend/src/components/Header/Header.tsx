import classNames from 'classnames';
import logoPath from 'images/logo.png';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

const ids = ['participants', 'trip-payments', 'trips', 'hotels'] as const;

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="main-header">
      <Link to="/" className="main-header__logo-link">
        <img
          src={logoPath}
          alt={t('header.logo-alt')}
          className="main-header__logo"
        />
      </Link>
      <nav className="main-nav">
        <ul className="main-nav__list">
          {ids.map((listItemId) => (
            <li key={listItemId}>
              <NavLink
                to={listItemId}
                className={({ isActive }) =>
                  classNames('main-nav__list-link', {
                    'main-nav__list-link--current-page': isActive,
                  })
                }
              >
                {t(`header.${listItemId}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
