import { useNavigate } from "react-router-dom";
import LoginRightBlock from "./LoginRightBlock";
import LogoHeader from "./LogoHeader";

type Props = {
  children: React.ReactNode;
};

const LoginLayout = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full">
      <div className="flex flex-col bg-white lg:relative lg:basis-7/12">
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center p-5 sm:w-1/2">
          <button
            onClick={() => navigate("/login")}
            className="flex cursor-pointer flex-col items-center"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <LogoHeader title={"Bienvenue !"} />
          </button>
          {props.children}
        </div>
      </div>
      <LoginRightBlock />
    </div>
  );
};

export default LoginLayout;
