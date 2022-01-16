import loaderPath from 'images/loader.svg';

export const Loader = () => {
  return (
    <div className="loader-wrapper">
      <img src={loaderPath} alt="Loading..." />
    </div>
  );
};
