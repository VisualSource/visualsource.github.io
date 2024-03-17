const ErrorComponent: React.FC<{
  title: string;
  subHeading: string;
  errorMessage: string;
}> = ({ title, subHeading, errorMessage }) => {
  return (
    <div className="mx-auto px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto text-center">
        <h1 className="text-7xl tracking-tight lg:text-9xl">{title}</h1>
        <p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          {subHeading}
        </p>
        <p className="mb-4 text-lg opacity-80">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
