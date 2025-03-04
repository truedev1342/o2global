'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from "./membershipPage.module.scss";
import { Badge, Button, Image, OverlayTrigger, Popover, Tab, Tabs } from 'react-bootstrap';
import { CaretDown, WarningCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import { useOutsideClick } from '@/hooks/useOutsideClick';


const MembershipsPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectDropdownRef = useRef<HTMLDivElement | null>(null)
    const selectBtnRef = useRef<HTMLButtonElement | null>(null)
    const [showSelect, setShowSelect] = useState(false)
    const updateDropdownRef = useRef<HTMLDivElement | null>(null)
    const updateBtnRef = useRef<HTMLButtonElement | null>(null)
    const [showUpdate, setShowUpdate] = useState(false)

    useOutsideClick<
        HTMLButtonElement,
        HTMLDivElement,
        boolean
    >({
        buttonRef: selectBtnRef,
        dropdownRef: selectDropdownRef,
        setState: setShowSelect
    })
    useOutsideClick<
        HTMLButtonElement,
        HTMLDivElement,
        boolean
    >({
        buttonRef: updateBtnRef,
        dropdownRef: updateDropdownRef,
        setState: setShowUpdate
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

    const popover = (
        <Popover id="popover-basic" className={`${styles.popoverMainWrapper} popoverMainWrapper`}>
            <Popover.Header as="h3" className={`${styles.popoverHeader} popoverHeader`}>Are you sure?</Popover.Header>
            <Popover.Body>
                <div className={`${styles.popoverWrapper} popoverWrapper`}>
                <Button variant='primary' href="/checkout" className={styles.popoverBtns}>yes</Button>
                <Button variant='outline-primary' href="" className={styles.popoverBtns}>No</Button>
                </div>
            </Popover.Body>
        </Popover>
    );
    return (
        <section className={styles.mainBox}>
            <Tabs defaultActiveKey="CurrentMembership" className={`${styles.tabCommon} membershipTab tabCommonBox`}>
                <Tab eventKey="CurrentMembership" title="Current Membership">
                    <div className={styles.headSrearch}>
                        <div className={styles.searchTitle}>Preferred Payment Method</div>
                        <div className={styles.btnWrpper}>
                            <Button ref={selectBtnRef} variant="outline-primary" className={`${styles.dropDownBtn} ${styles.searchdropDownBtn} dropDownCustom`} onClick={() => setShowSelect((prev) => !prev)} >
                                <span>
                                    Credit Card
                                </span>
                                <CaretDown size={24} />
                            </Button>
                            {showSelect &&
                                <div ref={selectDropdownRef} className={`${styles.dropDownOuter} dropDownOuter`}>
                                    <ul className={styles.dropUl}>
                                        <li className={styles.dropItem}>
                                            <Link href="" className={`${styles.itemLink} notificationItems`}>
                                                <span className={styles.titleB}>Credit Card</span>
                                            </Link>
                                        </li>
                                        <li className={styles.dropItem}>
                                            <Link href="" className={`${styles.itemLink} notificationItems`}>
                                                <span className={styles.titleB}>Credit Wallet + Credit Card</span>
                                            </Link>
                                        </li>
                                        <li className={styles.dropItem}>
                                            <Link href="" className={`${styles.itemLink} notificationItems`}>
                                                <span className={styles.titleB}>Manual Payment</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            }
                            <Button variant="primary" className={`${styles.searchBtn} searchBtn`}>Save</Button>
                        </div>

                    </div>
                    <div className={`${styles.enrollAnouncmenBox} enrollAnouncmenBox`}>
                        <p>
                            <WarningCircle weight="fill" size={24} />
                            When using this option, your order will be paid by your credit card on file.
                        </p>
                    </div>
                    <div className={`${styles.mainCardBoxWrapper}`}>
                        <h3 className='h3Title'>Failed Payments</h3>
                        <div className={`${styles.cardBoxGrid}`}>
                            <div className={`${styles.commonBoxCard}`}>
                                <div className={`${styles.upperBox}`}>
                                    <Image src="./../images/bannerImg.jpg" alt="banner" width={140} height={94} className={styles.bannerImg} />
                                    <div className={`${styles.rightBox}`}>
                                        <span className={`${styles.lineRow}`}>
                                            <span className={`${styles.titleLine}`}>Elite 400</span>
                                            <Badge className={`${styles.redBadge}`}> Failed</Badge>
                                        </span>
                                        <span className={`${styles.lineRow}`}>
                                            <span className={`${styles.labelBox}`}>Price</span>
                                            <span className={`${styles.priceBox}`}>$19.95</span>
                                        </span>
                                    </div>
                                </div>
                                <div className={`${styles.lineRow}`}>
                                    <span className={`${styles.labelBox} labelBoxTxt`}>Next Bill Date:</span>
                                    <span className={`${styles.priceBox}`}>December 24, 2024</span>
                                </div>
                                <div className={`${styles.lineRow}`}>
                                    <span className={`${styles.labelBox} labelBoxTxt`}>Frequency:</span>
                                    <span className={`${styles.priceBox}`}>Every Month</span>
                                </div>
                                <div className={`${styles.lineRow} ${styles.lineRowGray}`}>
                                    <span className={`${styles.grayBoxed} grayBoxed`}>
                                        <span>Date Created</span>
                                        <span className={`${styles.textBlue} textBlue`}>October 25, 2024</span>
                                    </span>
                                    <span className={`${styles.grayBoxed} grayBoxed`}>
                                        <span>Date Created</span>
                                        <span className={`${styles.textBlue} textBlue`}>October 25, 2024</span>
                                    </span>
                                </div>
                                <div className={`${styles.lineRow} ${styles.relativelineRow}`}>
                                    <Button ref={updateBtnRef} variant="outline-primary" className={`${styles.dropDownBtn} ${styles.blueBtn} dropDownCustom`} onClick={() => setShowUpdate((prev) => !prev)} >
                                        <span>
                                            Update
                                        </span>
                                        <CaretDown size={18} />
                                    </Button>
                                    {showUpdate &&
                                        <div ref={updateDropdownRef} className={`${styles.dropDownOuter} ${styles.blueDropdownOuter} dropDownOuter blueDropdownOuter`}>
                                            <ul className={styles.dropUl}>
                                                <li className={styles.dropItem}>
                                                    <Link href="" className={`${styles.itemLink} notificationItems`}>
                                                        <span className={styles.titleB}>Downgrade to Explorer</span>
                                                    </Link>
                                                </li>
                                                <li className={styles.dropItem}>
                                                    <Link href="" className={`${styles.itemLink} notificationItems`}>
                                                        <span className={styles.titleB}>Downgrade to Insider</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    }
                                     <OverlayTrigger trigger="click" placement="top" overlay={popover} rootClose>
                                        <Button variant="primary" className={`${styles.searchBtn} ${styles.redBtn} searchBtn`}>Resume</Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className={`${styles.commonBoxCard}`}>
                                <div className={`${styles.upperBox}`}>
                                    <Image src="./../images/bannerImg.jpg" alt="banner" width={140} height={94} className={styles.bannerImg} />
                                    <div className={`${styles.rightBox}`}>
                                        <span className={`${styles.lineRow}`}>
                                            <span className={`${styles.titleLine}`}>Elite 400</span>
                                            <Badge className={`${styles.redBadge}`}> Failed</Badge>
                                        </span>
                                        <span className={`${styles.lineRow}`}>
                                            <span className={`${styles.labelBox}`}>Price</span>
                                            <span className={`${styles.priceBox}`}>$19.95</span>
                                        </span>
                                    </div>
                                </div>
                                <div className={`${styles.lineRow}`}>
                                    <span className={`${styles.labelBox} labelBoxTxt`}>Next Bill Date:</span>
                                    <span className={`${styles.priceBox}`}>December 24, 2024</span>
                                </div>
                                <div className={`${styles.lineRow}`}>
                                    <span className={`${styles.labelBox} labelBoxTxt`}>Frequency:</span>
                                    <span className={`${styles.priceBox}`}>Every Month</span>
                                </div>
                                <div className={`${styles.lineRow} ${styles.lineRowGray}`}>
                                    <span className={`${styles.grayBoxed} grayBoxed`}>
                                        <span>Date Created</span>
                                        <span className={`${styles.textBlue} textBlue`}>October 25, 2024</span>
                                    </span>
                                    <span className={`${styles.grayBoxed} grayBoxed`}>
                                        <span>Date Created</span>
                                        <span className={`${styles.textBlue} textBlue`}>October 25, 2024</span>
                                    </span>
                                </div>
                                <div className={`${styles.lineRow} ${styles.relativelineRow}`}>
                                    <OverlayTrigger trigger="click" placement="top" overlay={popover} rootClose>
                                        <Button variant="primary" className={`${styles.searchBtn} ${styles.redBtn} searchBtn`}>Resume</Button>
                                    </OverlayTrigger>
                                </div>
                            </div>

                        </div>
                    </div>
                </Tab>
                <Tab eventKey="PastMembership" title="Past Membership">
                    Past Membership
                </Tab>
            </Tabs>
        </section>
    )
}

export default MembershipsPage;
