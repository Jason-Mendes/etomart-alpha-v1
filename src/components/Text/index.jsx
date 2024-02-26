import React from "react";

const sizeClasses = {
  txtShrikhandRegular45: "font-normal font-shrikhand",
  txtMontserratBold36: "font-bold font-montserrat",
  txtMontserratBold25: "font-bold font-montserrat",
  txtMontserratBold64: "font-bold font-montserrat",
  txtMontserratBold32: "font-bold font-montserrat",
  txtMontserratBold60Gray800: "font-bold font-montserrat",
  txtMontserratRomanBold32: "font-bold font-montserrat",
  txtMontserratSemiBold25: "font-montserrat font-semibold",
  txtMontserratSemiBold25Gray80001: "font-montserrat font-semibold",
  txtMontserratSemiBold20: "font-montserrat font-semibold",
  txtMontserratSemiBold30: "font-montserrat font-semibold",
  txtReemKufiMedium35: "font-medium font-reemkufi",
  txtMontserratBold40: "font-bold font-montserrat",
  txtMontserratBold32Amber700: "font-bold font-montserrat",
  txtMontserratBold30: "font-bold font-montserrat",
  txtMontserratBold60: "font-bold font-montserrat",
  txtMontserratBold32WhiteA700: "font-bold font-montserrat",
  txtMontserratMedium30: "font-medium font-montserrat",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };