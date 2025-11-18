import StsLogo from "@/assets/StsLogo";

type Props = {
  title: string;
};

const LogoHeader = (props: Props) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex w-full justify-center">
        <StsLogo/>
      </div>
      <div className="divider d-flex align-items-center my-6">
        <p className="text-center text-3xl font-bold text-black">
          {props.title}
        </p>
      </div>
    </div>
  );
};

export default LogoHeader;
