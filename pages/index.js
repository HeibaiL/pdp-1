import Head from 'next/head'

import GoogleAuth from "../components/Auth/GoogleAuth";
import Messenger from "../components/Messenger/Messenger";

import useAuth from "../hooks/useAuth";

import styles from '../styles/Home.module.css';


export default function Home() {
    const {user, logout, getProfile} = useAuth();
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/pdp-1-FE/public/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {user ?
                    <Messenger/>
                    : <></>
                }
            </main>
            <footer>
            </footer>
        </div>
    )
}
