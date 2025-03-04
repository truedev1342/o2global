'use client';

import React from 'react';
import styles from "./TeamSales.module.scss";
import { Image } from 'react-bootstrap';

const TeamSalesPage: React.FC = () => {
    return (
        <section className={styles.mainBox}>
            <div className={styles.imgBox}>
                <Image src="./../images/coming-soon.png" alt="banner" width={640} height={640} className={styles.imgComingSoon} />
            </div>
        </section>
    );
};

export default TeamSalesPage;
