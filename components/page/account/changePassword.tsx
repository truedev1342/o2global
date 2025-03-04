import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import styles from './Account.module.scss';
import { Eye } from '@phosphor-icons/react';

const ChangePasswordView: React.FC = () => {
    return (
        <div className={`${styles.accountSetting} ${styles.commonBoxCard}`}>
            <Form>
                <Row className={styles.rowLines}>
                    <Form.Group className="col-6">
                        <Form.Label htmlFor="password">Current Password</Form.Label>
                        <span className={styles.inputWithIcon}>
                            <Form.Control id="password"
                                type="password"
                                placeholder="Enter Current Password"
                            />
                            <Eye size={24} className={styles.inputIcon} />
                        </span>
                    </Form.Group>
                    <Form.Group className="col-6">
                        <Form.Label htmlFor="password">New Password</Form.Label>
                        <span className={styles.inputWithIcon}>
                            <Form.Control id="password"
                                type="password"
                                placeholder="Enter New Password"
                            />
                            <Eye size={24} className={styles.inputIcon} />
                        </span>
                    </Form.Group>
                </Row>
            </Form>
            <div className={`${styles.switchBoxesWrapper} d-flex justify-content-end`}>
                <div className={styles.rightWrapper}>
                    <Button variant="outline-primary" className={`${styles.saveBtn} commonActionOutlineBtn`}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordView;
