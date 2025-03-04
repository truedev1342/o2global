'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from "./payoutPage.module.scss";
import { Badge, Button, Form, Row } from 'react-bootstrap';
import { CaretDown } from '@phosphor-icons/react';
import Link from 'next/link';
import { useOutsideClick } from '@/hooks/useOutsideClick';


const PayoutOptionPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectDropdownRef = useRef<HTMLDivElement | null>(null)
    const selectBtnRef = useRef<HTMLButtonElement | null>(null)
    const [showSelect, setShowSelect] = useState(false)

    useOutsideClick<
        HTMLButtonElement,
        HTMLDivElement,
        boolean
    >({
        buttonRef: selectBtnRef,
        dropdownRef: selectDropdownRef,
        setState: setShowSelect
    })
    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <section className={styles.mainBox}>
            <div className={`${styles.commonBoxCard} commonBoxCardDark `}>
                <h2>
                    Global eWallet
                    <Badge className={`${styles.badgeBox}`}>Active</Badge>
                </h2>
                <p>
                    Powered by i-payout <br />
                    O2 Global offers its members a new fast, secure and cost effective payment method.
                    Available withdrawal methods:
                </p>
                <div className={`${styles.btnWrperBox}`}>
                    <Button variant="outline-primary" className={`${styles.commonBtn} outLineBtn`}>
                        Wire Transfer
                    </Button>
                    <Button variant="outline-primary" className={`${styles.commonBtn} outLineBtn`}>
                        Paper Checks
                    </Button>
                </div>
                <Form>
                    <Row className="mb-3">
                        <Form.Group className="col-sm-4 col-12" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" />
                        </Form.Group>
                        <Form.Group className="col-sm-4 col-12" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" />
                        </Form.Group>
                        <Form.Group className="col-sm-4 col-12" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group className="col-sm-4 col-12" >
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group className="col-sm-4 col-12" >
                            <div className={styles.formGroupBox}>
                                <Form.Label>Country</Form.Label>
                                <Button ref={selectBtnRef} variant="outline-primary" className={`${styles.dropDownBtn} dropDownCustom`} onClick={() => setShowSelect((prev) => !prev)} >
                                    <span>
                                        United States
                                    </span>
                                    <CaretDown size={24} />
                                </Button>
                                {showSelect &&
                                    <div ref={selectDropdownRef} className={`${styles.dropDownOuter} dropDownOuter`}>
                                        <ul className={styles.dropUl}>
                                            <li className={styles.dropItem}>
                                                <Link href="" className={`${styles.itemLink} notificationItems`}>
                                                    <span className={styles.titleB}>USA</span>
                                                </Link>
                                            </li>
                                            <li className={styles.dropItem}>
                                                <Link href="" className={`${styles.itemLink} notificationItems`}>
                                                    <span className={styles.titleB}>INDIA</span>
                                                </Link>
                                            </li>
                                            <li className={styles.dropItem}>
                                                <Link href="" className={`${styles.itemLink} notificationItems`}>
                                                    <span className={styles.titleB}>CANADA</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        </Form.Group>
                        <Form.Group className="col-sm-4 col-12 text-center" >
                            <Button type="submit" className={styles.fullWbutton}>Activate</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
            <div className={`${styles.commonBoxCard} commonBoxCardDark`}>
                <h2>
                    Direct Deposit - USA Only
                    <Badge className={`${styles.badgeBox}`}>Active</Badge>
                </h2>
                <p>
                    Please provide your bank account information.
                </p>
                <Form>
                    <Row className="mb-3">
                        <Form.Group className="col-12" >
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter Account Number" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group className="col-12" >
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Bank Name" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group className="col-12" >
                            <Form.Label>Routing Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter Routing Number" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group className="col-12" >
                            <Form.Label>Name on Account</Form.Label>
                            <Form.Control type="number" placeholder="Enter Name on Account" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <div className={`${styles.bottomBox}`}>
                            <Form.Group className={`${styles.leftBox}`}>
                                <Form.Label>Account Type*</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        label="Checking"
                                        name="group1"
                                        type="radio"
                                        id="id1"
                                        className={`${styles.radioBtn}`}
                                        defaultChecked
                                    />
                                    <Form.Check
                                        inline
                                        label="Savings"
                                        name="group1"
                                        type="radio"
                                        id="id2"
                                        className={`${styles.radioBtn}`}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className={`${styles.rightBox}`}>
                                <Button type="submit" className={`${styles.fullWbutton} ${styles.smBtn}`}>Activate</Button>
                            </Form.Group>
                        </div>
                    </Row>
                </Form>
            </div>
        </section>
    );
};


export default PayoutOptionPage;