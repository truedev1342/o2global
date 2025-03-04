import React, { useEffect, useRef, useState } from 'react';
import styles from './Account.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Form } from 'react-bootstrap';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Link from 'next/link';
import { CaretDown } from '@phosphor-icons/react';


const SponsoringPreferencesView: React.FC = () => {
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
        <div className={`${styles.dropDownCommonBox} ${styles.commonBoxCard}`}>
               <div className={`${styles.titleBar}`}>
                <h2>Sponsoring Preferences</h2>
            </div>
            <div className={styles.dropDownMainBox}>
                {/* <Form.Label className={styles.userLabel}>Sponsoring Preferences</Form.Label> */}
                <Button ref={selectBtnRef} variant="outline-primary" className={`${styles.dropDownBtn} dropDownCustom`} onClick={() => setShowSelect((prev) => !prev)} >
                    <span>
                        Selected Value be here
                    </span>
                    <CaretDown size={24} />
                </Button>

                {showSelect &&
                    <div ref={selectDropdownRef} className={`${styles.dropDownOuter} dropDownOuter`}>
                        <ul className={styles.dropUl}>
                            <li className={styles.dropItem}>
                                <Link href="" className={`${styles.itemLink} notificationItems`}>
                                    <span className={styles.titleB}>Holding Tank</span>
                                </Link>
                            </li>
                            <li className={styles.dropItem}>
                                <Link href="" className={`${styles.itemLink} notificationItems`}>
                                    <span className={styles.titleB}>Front Line</span>
                                </Link>
                            </li>
                            <li className={styles.dropItem}>
                                <Link href="" className={`${styles.itemLink} notificationItems`}>
                                    <span className={styles.titleB}>Project build leg System</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
};

export default SponsoringPreferencesView;
