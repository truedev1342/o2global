'use client';

import React, {useState} from 'react';
import styles from './auth.module.scss';
import { Button, Form, Image, Row, Alert } from 'react-bootstrap';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { authApi } from "@/utils/services/api/authApi";


const SignInView: React.FC = () => {

    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (!username || !password) {
          setError("Username and password are required.");
          return;
        }
        setError("");
        try {
            const response = await authApi.login({username, password});
            if (response.success) {
              localStorage.setItem("ubo-auth", JSON.stringify(response.data));
              localStorage.setItem("auth-token", response.data.token.replace(/^"|"$/g, ''));
              setSuccess('Login successful!');
              router.push("/");
            } else {
              setError(error || 'Unknown error occurred');
            }
        } catch (err) {
          setError('An unexpected error occurred');
        }
      };

    return (
        <section className={`${styles.mainBox} ${styles.authBox}`}>
            <div className={`${styles.imgBox}`}>
                <Image src="./../images/loginBanner.jpg" alt="banner" width={640} height={640} className={styles.loginBanner} />
            </div>
            <div className={`${styles.formBox}`}>
                <Image src="./../images/logoBlue.svg" alt="logo" width={267} height={100} className={styles.logoWrps} />
                <div className={styles.formWrapper}>
                    <h2>Sign In</h2>
                    <p>Explore, discover, enjoy!</p>
                    <Form onSubmit={handleSubmit}>
                        {error && <p className="text-danger">{error}</p>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-12`}>
                                <Form.Control id="username" type="text" placeholder="Email or User ID" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-12`}>
                                <Form.Control id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Link href="/forgotPassword" className={styles.forgotLink}>Forgot Password?</Link>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Button type='submit' className={`${styles.loginBtn} commonBtn`}>Sign In</Button>
                        </Row>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default SignInView;
