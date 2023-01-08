import BasicLayout from "../components/Layouts/BasicLayout";

import {Provider} from "react-redux";
import {store} from "../app/store";

import '../styles/globals.css'


function MyApp({Component, pageProps}) {

    return <Provider store={store}>
        <BasicLayout>
            <Component {...pageProps} />
        </BasicLayout>
    </Provider>

}

export default MyApp
