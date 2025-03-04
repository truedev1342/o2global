import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import styles from './Account.module.scss';
import { WarningCircle } from '@phosphor-icons/react';

const LegacyContactView: React.FC = () => {
    return (
        <div className={`${styles.accountSetting} ${styles.legacyBox} ${styles.commonBoxCard}`}> 
            <div className={`${styles.titleBar}`}>
                <h3>Legacy Contact</h3>
            </div>
            <div className={`${styles.enrollAnouncmenBox} enrollAnouncmenBox`}>
                <p className={`${styles.anPBox} anPBox`}>
                    <WarningCircle weight="fill" size={24} />
                    Please enter the information for who will own your O2 Global Affiliate position if something happens to you. We will contact  and transfer ownership to them.
                </p>
            </div>
            <Form>
                <Row className={styles.rowLines}>
                    <Form.Group className={`${styles.wFullXsm} col-6`}>
                        <Form.Label htmlFor="FirstName">First Name</Form.Label>
                        <Form.Control id="FirstName"
                            type="text"
                            placeholder="Enter First Name"
                        />
                    </Form.Group>
                    <Form.Group className={`${styles.wFullXsm} col-6`}>
                        <Form.Label htmlFor="LastName">Last Name</Form.Label>
                        <Form.Control id="LastName"
                            type="text"
                            placeholder="Enter Last Name"
                        />
                    </Form.Group>
                </Row>
                <Row className={styles.rowLines}>
                    <Form.Group className={`${styles.wFullXsm} col-6`}>
                        <Form.Label htmlFor="dob">Date of Birth</Form.Label>
                        <Form.Control id="dob" type="date" />
                    </Form.Group>
                    <Form.Group className={`${styles.wFullXsm} col-6`}>
                        <Form.Label htmlFor="LastName">Relationship</Form.Label>
                        <Form.Control id="LastName"
                            type="text"
                            placeholder="Enter Last Name"
                        />
                    </Form.Group>
                </Row>
            </Form>
            <div className={`${styles.switchBoxesWrapper} d-flex justify-content-end`}>
                <div className={styles.rightWrapper}>
                    <Button variant="outline-primary" className={`${styles.saveBtn} commonActionOutlineBtn`}>Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default LegacyContactView;
