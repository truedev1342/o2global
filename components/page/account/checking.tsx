import React, { useState } from 'react';
import styles from './Account.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Form, Image, Modal, Row } from 'react-bootstrap';


const CheckingView: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className={`${styles.shippingAdBox} ${styles.commonBoxCard}`}>
                <div className={`${styles.titleBar}`}>
                    <h2>Checking (0)</h2>
                    <Button className={`${styles.editBtn} commonBtn`} onClick={handleShow}>New Checking</Button>
                </div>
                <div className={`${styles.nodataWrapper}`}>
                    <Image src="./../images/checkingEmpty.svg" alt="noData" width={500} height={500} className={styles.noDataImg} />
                    <p>You do not have a checking account on file with us. </p>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} className='commonModal mdModal' aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton className='modalHeaderCommon'>
                    <Modal.Title>Add Checking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="Contact Email" />
                            </Form.Group>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="phone" placeholder="Contact Phone" />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="First Name" />
                            </Form.Group>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="Last Name" />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="Address Line 1" />
                            </Form.Group>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="Address Line 2" />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="City" />
                            </Form.Group>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="Zip/Postal Code" />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <div className={`position-relative`}>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select Country</option>
                                        <option value="1">USA</option>
                                        <option value="2">CANADA</option>
                                        <option value="3">AUSTRALIA</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <div className={`position-relative`}>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select State</option>
                                        <option value="1">State 1</option>
                                        <option value="2">State 2</option>
                                        <option value="3">State 3</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={`${styles.modalFooterCommon} modalFooterCommon`}>
                    <Button variant="outline-primary" className={`${styles.saveBtn} ${styles.commonFooterBtn} commonActionOutlineBtn`} onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" className={`${styles.filled} ${styles.commonFooterBtn} commonActionOutlineBtn`} onClick={handleClose}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CheckingView;
