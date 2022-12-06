import UserProvider from "../context/User";
import BasicLayout from "../components/Layouts/BasicLayout";

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return <UserProvider>
    <BasicLayout>
        <Component {...pageProps} />
    </BasicLayout>
  </UserProvider>
}

export default MyApp
