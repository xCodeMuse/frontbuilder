import "../styles/globals.css";
import "./Global.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

export const config = {
  runtime: "experimental-edge",
};
