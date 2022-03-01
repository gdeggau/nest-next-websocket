import { SocketProvider } from "../context/socket";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
