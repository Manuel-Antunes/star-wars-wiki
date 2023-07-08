import clsx from "clsx";
import React from "react";

interface WithLabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  text?: string;
  wrapperClassName?: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const WithLabel: React.FC<WithLabelProps> = ({
  text,
  wrapperClassName,
  children,
  ...rest
}) => (
  <label
    className={clsx(
      wrapperClassName,
      "w-full flex flex-col gap-0.5 items-start text-navy-100"
    )}
    {...rest}
  >
    {text && <span className="font-normal text-sm">{text}</span>}
    {children}
  </label>
);

export default WithLabel;
