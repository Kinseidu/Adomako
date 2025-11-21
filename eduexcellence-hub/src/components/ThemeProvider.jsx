import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import PropTypes from "prop-types";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  attribute: PropTypes.string,
  defaultTheme: PropTypes.string,
  enableSystem: PropTypes.bool,
};
