interface Props {
  header: string;
  children?: React.ReactNode;
}

export const PageContainerHeader = ({ header, children }: Props) => {
  return (
    <header className="content-card__header-container">
      <h1 className="content-card__heading">{header}</h1>
      {children}
    </header>
  );
};
