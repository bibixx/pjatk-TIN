import classNames from 'classnames';
import { useAuth } from 'hooks/useAuth/useAuth';
import logoPath from 'images/logo.png';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

const guestIds = ['trips', 'hotels'] as const;
const participantIds = ['trip-payments', 'trips', 'hotels'] as const;
const adminIds = ['participants', 'trip-payments', 'trips', 'hotels'] as const;

export const Header = () => {
  const { t } = useTranslation();
  const { isLoggedIn, isParticipant } = useAuth();

  const ids = useMemo(() => {
    if (!isLoggedIn) {
      return [...guestIds, 'login'] as const;
    }

    if (isParticipant) {
      return [...participantIds, 'logout'] as const;
    }

    return [...adminIds, 'logout'] as const;
  }, [isLoggedIn, isParticipant]);

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
