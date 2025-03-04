'use client';

import React from 'react';
import styles from './auth.module.scss';
import { Button, Form, Image, Row } from 'react-bootstrap';
import Link from 'next/link';
import { CaretLeft } from '@phosphor-icons/react';


const ForgotPwdView: React.FC = () => {
    return (
        <section className={`${styles.mainBox} ${styles.authBox}`}>
            <div className={`${styles.imgBox}`}>
                <Image src="./../images/loginBanner.jpg" alt="banner" width={640} height={640} className={styles.loginBanner} />
            </div>
            <div className={`${styles.formBox}`}>
                <Image src="./../images/logoBlue.svg" alt="logo" width={267} height={100} className={styles.logoWrps} />
                <div className={styles.formWrapper}>
                    <h2>Forgot Password?</h2>
                    <p>Enter your email to reset your password.</p>
                    <Form>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-12`}>
                                <Form.Control id="" type="email" placeholder="Email or User ID" />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Button className={`${styles.loginBtn} commonBtn`}>Submit</Button>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Button variant='link' className={`${styles.linkBtn} commonBtn`} href='/signIn'>
                                <CaretLeft size={24} /> Back to login
                            </Button>
                        </Row>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPwdView;
