'use client';

import React from 'react';
import styles from './auth.module.scss';
import { Button, Container, Image } from 'react-bootstrap';
import { CaretLeft } from '@phosphor-icons/react';


const SuccessView: React.FC = () => {
    return (
        <section className={`${styles.mainBox} ${styles.authBox}`}>
            <div className={`${styles.signUpWrapper}`}>
                <div className={`${styles.bubbleWrpper}`}></div>
                <div className={`${styles.bubbleWrpper} ${styles.bubble2}`}></div>

                <Container className={`${styles.containBox}`}>
                    <div className={`${styles.headerBoxLine}`}>
                        <Image src="./../images/logo-white.svg" alt="logo" width={132} height={50} className={styles.logoWrps} />
                        <Button variant='link' href='/home' className={`${styles.linkBtn} commonBtn`}>
                            <CaretLeft size={24} weight="bold" />
                            Back to the site
                        </Button>
                    </div>
                    <div className={`${styles.signUpBox} ${styles.successBox}`}>
                        <Image src="./../images/oc-hi-five.svg" alt="banner" width={220} height={237} className={styles.imgSuccess} />
                        <h1>
                            Thank you for joining O2 Global
                        </h1>
                        <p>
                            A welcome email is on its way to you with your login information.
                        </p>
                        <Button className={`${styles.commonBtn} commonBtn`}>
                            Welcome Aboard
                        </Button>
                    </div>
                </Container>

            </div>
        </section>
    );
};

export default SuccessView;
