import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/theme";
import { UserProvider } from "@/context/user";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </ThemeProvider>
    </UserProvider>
  );
}
