import React from 'react';

import Header from "../Headers/Header";

import styles from "./styles.module.css";


const BasicLayout = ({children}) => {
    return <>
        <Header className={styles.wrapper}/>
        {children}
        </>
}


export default BasicLayout