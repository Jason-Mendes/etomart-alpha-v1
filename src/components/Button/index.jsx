import React from "react";
import PropTypes from "prop-types";

const shapes = { round: "rounded-[45px]" };
const variants = {
  fill: {
    white_A700: "bg-white-A700 text-blue_gray-900",
    amber_700: "bg-amber-700 text-white-A700",
  },
};
const sizes = { xs: "p-[23px] sm:px-5", sm: "p-[29px] sm:px-5" };

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "",
  variant = "",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["white_A700", "amber_700"]),
};

export { Button };
