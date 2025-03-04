'use client'

import React from 'react'
import styles from "./banner.module.scss";
import { Image } from 'react-bootstrap';


const BannerSection = () => {
    return (
        <div className={styles.bannerBox}>
            <Image src="./../images/bannerImg.jpg" alt="banner" width={1500} height={416} className={styles.bannerImg} />
            <h2>
                Welcome to O2 Global, <br /> Roger.
            </h2>
        </div>
    )
}

export default BannerSection
