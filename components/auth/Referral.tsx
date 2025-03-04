'use client';

import React, { useState } from 'react';
import styles from './auth.module.scss';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import Link from 'next/link';


const ReferralView: React.FC = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <section className={`${styles.mainBox} ${styles.authBox}`}>
            <div className={`${styles.authWrapper}`}>
                <Button className={`${styles.referalBtn} commonBtn`} variant="light" onClick={handleShow}>
                    Referral ID
                </Button>

                <Modal show={show} onHide={handleClose} className={`${styles.commonModal} ${styles.smModal} commonModal smModal`}aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header closeButton className={`${styles.modalHeaderCommon} modalHeaderCommon`}>
                        <Modal.Title>Who Referred You?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={`${styles.modalBody} modalBody`}>
                        <p>
                            Because O2 Global is a referral based company, <br/>
                            it is essential that every Affiliate or Member  <br/>
                            be paired with their Enroller.
                        </p>
                        <Form>
                            <Row className={styles.rowLines}>
                                <Form.Group className={`${styles.wFullXsm} col-12`}>
                                    <Form.Control id="" type="text"  />
                                </Form.Group>
                            </Row>
                        </Form>
                        <Button variant="primary" className={`${styles.saveBtn} commonActionOutlineBtn`} onClick={handleClose}>
                            Submit
                        </Button>
                        <p className={styles.smallPara}>
                            If you need assistance finding this information, please contact the person who introduced you (Enroller), or if you have found us through a search, <br /> email us at <Link href="mailto: support@o2global.com"> support@o2global.com </Link>
                        </p>
                    </Modal.Body>
                </Modal>
            </div>
        </section>
    );
};

export default ReferralView;
