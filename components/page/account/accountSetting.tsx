import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import styles from './Account.module.scss';
import { LockSimple, UploadSimple } from '@phosphor-icons/react';
import { myaccountApi } from '@/utils/services/api/myaccountApi';
import {profileService} from '@/utils/services/profileService';
import { toast } from 'react-toastify';

const AccountSettingView: React.FC = () => {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [show, setShow] = useState(false);

    const [userInfo, setUserInfo] = useState<any>(null);

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [accountId, setAccountId] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("");
    const [businessName, setBusinessName] = useState<string>("");
    const [recognitionName, setRecognitionName] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");

    const[showContactInfo, setShowContactInfo] = useState<Number>(1);
    const[isSubscribedEmail, setIsSubscribedEmail] = useState<Number>(1);

    const [curPwd, setCurPwd] = useState<string>("");
    const [newPwd, setNewPwd] = useState<string>("");
    const [confirmPwd, setConfirmPwd] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const strUserInfo = localStorage.getItem("ubo-auth");
            const savedUserInfo = JSON.parse(strUserInfo || "");
            setUserInfo(savedUserInfo);
            const curUser = savedUserInfo?.user;
            if (curUser) {
                setFirstName(curUser?.first_name);
                setLastName(curUser?.last_name);
                setUserName(curUser?.username);
                setAccountId(curUser?.uuid);
                setEmail(curUser?.email);
                setPhone(curUser?.phone);
                setBirthday(curUser?.dob?.substring(0, 10));
                setBusinessName(curUser?.business_name);
                setRecognitionName(curUser?.full_name);
                setCompanyName(curUser?.company_name);
                setAvatar(curUser?.image);
                setShowContactInfo(curUser?.show_contact_info);
                setIsSubscribedEmail(curUser?.is_subscribed_email);
            }
        }
    }, []);

    const updateUserInfo = () => {
        if (userInfo?.user) {
            userInfo.user.first_name = firstName;
            userInfo.user.last_name = lastName;
            userInfo.user.username = userName;
            userInfo.user.uuid = accountId;
            userInfo.user.email = email;
            userInfo.user.phone = phone;
            userInfo.user.dob = birthday;
            userInfo.user.business_name = businessName;
            userInfo.user.company_name = companyName;
            userInfo.user.full_name = recognitionName;
            userInfo.user.image = avatar;
        }
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result as string); // Update avatar with the uploaded image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        debugger;
        updateUserInfo();

        try {
            const response = await myaccountApi.setProfile(userInfo.user);
            if (response.success == true) {
                toast.success("User profile updated");
                profileService.updateProfile();
            } else {
                toast.error(response.messege || "Failed to update profile.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred. Please try again.");
        }
    }

    const handleChangePassword = async () => {
        try {
            const params = {
                old_password: curPwd,
                password: newPwd,
                passwordConfirm: confirmPwd
            }
            const response = await myaccountApi.updatePassword(params);
            if (response.success == true) {
                toast.success("Password updated");
            } else {
                toast.error(response.messege || "Failed to update password.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred. Please try again.");
        }
        handleClose();
    }

    const handleShowContactInfo = async (isChecked : boolean) => {
        try {
            const response = await myaccountApi.updateShowContactInfo(isChecked ? 2 : 1);
            if (response.success == true) {
                setShowContactInfo(isChecked ? 2 : 1);
                toast.success("Contact info visibility updated");
                profileService.updateProfile();
            } else {
                toast.error(response.messege || "Failed to update setting.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred. Please try again.");
        }
        handleClose();
    }

    const handleSubscriptionChange = async (isChecked : boolean) => {
        try {
            const response = await myaccountApi.updateIsSubscribeEmail(isChecked ? 2 : 1);
            if (response.success == true) {
                toast.success("Subscribed email setting is updated");
                setIsSubscribedEmail(isChecked ? 2 : 1);
                profileService.updateProfile();
            } else {
                toast.error(response.messege || "Failed to update setting.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred. Please try again.");
        }
        handleClose();
    }

    return (
        <>
            <div className={`${styles.accountSetting} ${styles.commonBoxCard}`}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatarMain}>
                        <div className={styles.avatar}>
                            <img
                                src={avatar ?? '../../images/userAvatar.svg'}
                                alt="Avatar"
                                className={styles.avatarImage}
                            />
                        </div>
                        <div className={styles.uploadButtonContainer}>
                            <label className={styles.uploadButton}>
                                <UploadSimple size={24} />
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={styles.hiddenInput}
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>
                    <p>Allowed *.jpeg, *.jpg, *.png, *.gif <br /> Max size of 3.1 MB</p>
                </div>
                <Form>
                    <Row className={styles.rowLines}>
                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control id="firstName" type="text" placeholder="Enter First Name" value={firstName || ""} onChange={(e) => setFirstName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                            <Form.Label htmlFor="lastName">Last Name</Form.Label>
                            <Form.Control id="lastName" type="text" placeholder="Enter Last Name" value={lastName || ""} onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Row className={styles.rowLines}>
                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                            <Form.Label htmlFor="username">Username</Form.Label>
                            <span className={styles.inputWithIcon}>
                                <Form.Control id="username" type="text" placeholder="Enter Username" disabled value={userName || ""}/>
                                <LockSimple size={24} className={styles.inputIcon} />
                            </span>
                        </Form.Group>
                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                            <Form.Label htmlFor="accountId">Account ID</Form.Label>
                            <span className={styles.inputWithIcon}>
                                <Form.Control
                                    id="accountId"
                                    type="text"
                                    placeholder="Enter Account ID"
                                    disabled
                                    value={accountId || ""}
                                />
                                <LockSimple size={24} className={styles.inputIcon} />
                            </span>
                        </Form.Group>
                    </Row>
                    <Row className={styles.rowLines}>
                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter Email" value={email || ""} onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                            <Form.Label htmlFor="phone">Phone</Form.Label>
                            <Form.Control id="phone" type="tel" placeholder="Enter Phone" value={phone || ""} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Row className={styles.rowLines}>
                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                            <Form.Label htmlFor="dob">Date of Birth</Form.Label>
                            <Form.Control id="dob" type="date"  value={birthday || ""} onChange={(e) => setBirthday(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                            <Form.Label htmlFor="ownershipName">Ownership Name</Form.Label>
                            <span className={styles.inputWithIcon}>
                                <Form.Control
                                    id="ownershipName"
                                    type="text"
                                    placeholder="Enter Ownership Name"
                                    disabled
                                    value={companyName || ""}
                                />
                                <LockSimple size={24} className={styles.inputIcon} />
                            </span>
                        </Form.Group>
                    </Row>
                    <Row className={styles.rowLines}>
                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                            <Form.Label htmlFor="businessName">Business Name</Form.Label>
                            <Form.Control id="businessName" type="text" placeholder="Enter Business Name" value={businessName || ""} onChange={(e) => setBusinessName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                            <Form.Label htmlFor="recognitionName">Recognition Name</Form.Label>
                            <span className={styles.inputWithIcon}>
                                <Form.Control
                                    id="recognitionName"
                                    type="text"
                                    placeholder="Enter Recognition Name"
                                    disabled
                                    value={recognitionName || ""}
                                />
                                <LockSimple size={24} className={styles.inputIcon} />
                            </span>
                        </Form.Group>
                    </Row>
                </Form>
                <div className={styles.switchBoxesWrapper}>
                    <div className={styles.LeftWrapper}>
                        <div className={styles.switchBoxesWrapperInner}>
                            <p >Contact Info Visibility</p>
                            <Form.Switch
                                type="switch"
                                id="visibilitys"
                                label="Show my contact info for the back office and corporate replicated website."
                                className={`${styles.switchBox} switchBox`}
                                checked={showContactInfo === 2}
                                onChange={(e) => handleShowContactInfo(e.target.checked)} 
                            />
                        </div>
                        <div className={styles.switchBoxesWrapperInner}>
                            <p >Subscribe Emails</p>
                            <Form.Switch
                                type="switch"
                                id="emails"
                                label="If you switch off then you will not receive any emails from O2 Global."
                                className={`${styles.switchBox} switchBox`}
                                checked={isSubscribedEmail === 2}
                                onChange={(e) => handleSubscriptionChange(e.target.checked)} 
                            />
                        </div>
                    </div>
                    <div className={styles.rightWrapper}>
                        <Button variant="outline-primary" className={`${styles.saveBtn} commonActionOutlineBtn`} onClick={handleShow}>Change Password</Button>
                        <Button variant="primary" className={`commonActionOutlineBtn`} onClick={handleSubmit}>Save Changes</Button>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} className='commonModal mdModal' aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton className='modalHeaderCommon'>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-12`}>
                                <Form.Control id="" type="password" placeholder="Current Password*" onChange={(e) => setCurPwd(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-12`}>
                                <Form.Control id="" type="password" placeholder="New Password*" onChange={(e) => setNewPwd(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-12`}>
                                <Form.Control id="" type="password" placeholder="Confirm New Password*" onChange={(e) => setConfirmPwd(e.target.value)} />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modalFooterCommon'>
                    <Button variant="outline-primary" className={`${styles.saveBtn} commonActionOutlineBtn`} onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" className={` commonActionOutlineBtn`} onClick={handleChangePassword}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AccountSettingView;
