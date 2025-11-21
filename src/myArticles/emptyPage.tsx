type EmptyPageProps = {
  component: React.ReactNode;
  name: string;
};

const EmptyPage: React.FC<EmptyPageProps> = ({ component, name }) => {
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-12 px-20">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center text-4xl font-normal text-text md:text-5xl">
          Bienvenue <span className="font-semibold">Foulen ben foulen</span>
        </div>
        <p className="text-1xl text-center text-text md:text-2xl">
          Vous n'avez paramétré aucun{" "}
          <span className="font-semibold">{name}</span> pour le moment.
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-7">
        {component}
      </div>
    </div>
  );
};
export default EmptyPage;
