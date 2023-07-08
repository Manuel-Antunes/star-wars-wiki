import React from "react";
import starwars from "~/assets/images/starwars.svg";

export interface AppLogoProps {
  hideName?: boolean;
}

const AppLogo: React.FC<AppLogoProps> = ({ hideName }) => {
  return (
    <>
      <img className="mx-auto h-10 w-10" src={starwars} alt="logo" />
      {!hideName && (
        <p className="dark:text-navy-100 text-xl font-semibold uppercase text-slate-700">
          Star Wars
        </p>
      )}
    </>
  );
};

export default AppLogo;
