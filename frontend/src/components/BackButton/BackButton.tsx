import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';

type Props = Omit<Omit<React.ComponentProps<typeof Button>, 'onClick'>, 'type'>;

export const BackButton = (props: Props) => {
  const navigate = useNavigate();

  const onClick = () => navigate(-1);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Button {...props} onClick={onClick} type="button" />;
};
