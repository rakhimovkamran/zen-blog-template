import { type AppType } from "next/app";
import { ThemeProvider } from "next-themes";

import { api } from "~/utils/api";
import "~/styles/globals.css";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      defaultTheme="light"
      attribute="class"
      themes={["light", "dark"]}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default api.withTRPC(App);
