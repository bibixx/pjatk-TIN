import { LinkButton } from 'components/LinkButton/LinkButton';

interface Props {
  info: string;
  buttonText: string;
}

export const EmptyState = ({ info, buttonText }: Props) => {
  return (
    <div className="empty-state">
      <span className="material-icons empty-state__icon">cancel</span>
      <h2 className="empty-state__text">{info}</h2>
      <LinkButton to="./create" icon="add">
        {buttonText}
      </LinkButton>
    </div>
  );
};
