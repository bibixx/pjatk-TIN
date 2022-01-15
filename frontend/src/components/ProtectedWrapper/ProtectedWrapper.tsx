import { UserType } from '@s19192/shared';
import { withProtection } from 'components/withProtection/withProtection';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
  userGroups?: UserType[];
}

export const ProtectedWrapper = ({ userGroups }: Props) => {
  const Component = useMemo(
    () => withProtection(userGroups)(() => <Outlet />),
    [userGroups],
  );

  return <Component />;
};
