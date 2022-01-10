interface Props {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: Props) => {
  return (
    <div className="content-wrapper">
      <main className="content-card">{children}</main>
    </div>
  );
};
