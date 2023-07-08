/* eslint-disable react-refresh/only-export-components */
import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export interface OnBoardingCardProps extends PropsWithChildren {
  title: string;
  description: string;
  image: string;
}

const OnBoardingCard: React.FC<OnBoardingCardProps> = ({
  title,
  description,
  image,
  children,
}) => {
  return (
    <div className="card">
      <div className="flex justify-center p-5">
        <img className="w-9/12" src={image} alt={title} />
      </div>
      <div className="px-4 pb-8 text-center sm:px-5">
        <h4 className="text-lg font-semibold text-slate-700 dark:text-navy-100">
          {title}
        </h4>
        <p className="pt-3">{description}</p>
        {children}
      </div>
    </div>
  );
};

export interface OnBoardingCTAProps extends PropsWithChildren {
  href: string;
}

const OnBoardingCTA: React.FC<OnBoardingCTAProps> = ({ href, children }) => {
  return (
    <Link
      to={href}
      className="btn mt-8 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:shadow-accent/50 dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
    >
      {children}
    </Link>
  );
};

export default Object.assign(OnBoardingCard, {
  CTA: OnBoardingCTA,
});
