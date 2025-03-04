'use client'
import 'swiper/css';
import 'swiper/css/pagination';
import styles from "./header.module.scss";
import { ArrowLeft, ArrowRight, Bell, Chats, Envelope, List, StarAndCrescent, Sun } from '@phosphor-icons/react';
import { Button, Dropdown, Image, Navbar } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Link from 'next/link';

interface HeaderCompProps {
    collapsed: boolean;
    toggleSidebar: () => void;
}

const HeaderComp: React.FC<HeaderCompProps> = ({ collapsed, toggleSidebar }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const notificationDropdownRef = useRef<HTMLDivElement | null>(null)
    const notificationBtnRef = useRef<HTMLButtonElement | null>(null)
    const [showNotification, setShowNotification] = useState(false)
    const languegeDropdownRef = useRef<HTMLDivElement | null>(null)
    const languegeBtnRef = useRef<HTMLButtonElement | null>(null)
    const [showLanguege, setShowLanguege] = useState(false)
    const userDropdownRef = useRef<HTMLDivElement | null>(null)
    const userBtnRef = useRef<HTMLButtonElement | null>(null)
    const [showUser, setShowUser] = useState(false)

    useOutsideClick<
        HTMLButtonElement,
        HTMLDivElement,
        boolean
    >({
        buttonRef: notificationBtnRef,
        dropdownRef: notificationDropdownRef,
        setState: setShowNotification
    })

    useOutsideClick<
        HTMLButtonElement,
        HTMLDivElement,
        boolean
    >({
        buttonRef: languegeBtnRef,
        dropdownRef: languegeDropdownRef,
        setState: setShowLanguege
    })
    useOutsideClick<
        HTMLButtonElement,
        HTMLDivElement,
        boolean
    >({
        buttonRef: userBtnRef,
        dropdownRef: userDropdownRef,
        setState: setShowUser
    })
    const closeDropdown = () => {
        setIsOpen(false);
    };

    // Apply the dark mode class to the body
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

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

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    // Apply the dark mode class to the body

    // Listen to window resize events
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };

        window.addEventListener('resize', handleResize);

        // Set initial state based on screen size
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <Navbar className={`p-0`}>
            <div className={`${styles.mainNav} mainNav`}>
                <h1 className={`${styles.headerBar} headerBar`}>
                    <Button
                        className={`${styles.toggleButtonMenu} ${collapsed ? styles.collapsedButton : styles.openButton} menuBtnMain`}
                        onClick={toggleSidebar}
                        variant="link"
                    >
                        {isMobile ? <List size={20} /> : collapsed ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                    </Button>
                    Dashboard
                </h1>
                <div className={styles.rightNav}>
                    <div className={styles.innerMenus}>
                        {isMobile ? "" :
                            <div >
                                <Button ref={languegeBtnRef} variant="link" className={styles.menuBtn} onClick={() => setShowLanguege((prev) => !prev)}>
                                    <Image src="./../images/US.png" alt="flag" width={30} height={30} className={styles.flagBox} />
                                </Button>
                                {showLanguege &&
                                    <div ref={languegeDropdownRef} className={`${styles.dropDownOuter} ${styles.dropDownOuterlange} dropDownOuter dropDownOuterlange`}>
                                        <span className={`${styles.dropHeader} dropHeader`}>
                                            Select Languege
                                        </span>
                                        <ul className={`${styles.dropUl} ${styles.dropUlGrid}`}>
                                            <li className={`${styles.dropItem} ${styles.unread} unread `}>
                                                <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                                    <Image src="./../images/US.png" alt="flag" width={18} height={18} className={styles.flagBox} />
                                                    English
                                                </Link>
                                            </li>
                                            <li className={styles.dropItem}>
                                                <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                                    <Image src="./../images/US.png" alt="flag" width={18} height={18} className={styles.flagBox} />
                                                    arebic
                                                </Link>
                                            </li>
                                            <li className={styles.dropItem}>
                                                <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                                    <Image src="./../images/US.png" alt="flag" width={18} height={18} className={styles.flagBox} />
                                                    Hindi
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        }
                        <Button variant="link" className={styles.menuBtn}>
                            <Chats size={30} />
                        </Button>
                        <div >
                            <Button ref={notificationBtnRef} variant="link" className={`${styles.menuBtn} ${styles.notificationBtn} `} onClick={() => setShowNotification((prev) => !prev)} >
                                <span className={styles.bedgeCircle}>8</span>
                                <Bell size={30} />
                            </Button>

                            {showNotification &&
                                <div ref={notificationDropdownRef} className={`${styles.dropDownOuter} dropDownOuter`}>
                                    <div className={`${styles.dropHeader} dropHeader`}>
                                        Notifications
                                        <span className={styles.bedgeCircle}>New 0</span>
                                    </div>
                                    <ul className={styles.dropUl}>
                                        <li className={styles.dropItem}>
                                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.unread} unread notificationItems`}>
                                                <span className={styles.titleB}>Title Notification</span>
                                                <span className={`${styles.discrp} discrp`}>Lorem lipsum Lorem lipsum Lorem lipsum Lorem lipsum </span>
                                            </Link>
                                        </li>
                                        <li className={styles.dropItem}>
                                            <Link href="/points-wallet" className={`${styles.itemLink} notificationItems`}>
                                                <span className={styles.titleB}>Title Notification</span>
                                                <span className={`${styles.discrp} discrp`}>Lorem lipsum Lorem lipsum Lorem lipsum Lorem lipsum </span>
                                            </Link>
                                        </li>
                                        <li className={styles.dropItem}>
                                            <Link href="/points-wallet" className={`${styles.itemLink} notificationItems`}>
                                                <span className={styles.titleB}>Title Notification</span>
                                                <span className={`${styles.discrp} discrp`}>Lorem lipsum Lorem lipsum Lorem lipsum Lorem lipsum </span>
                                            </Link>
                                        </li>
                                    </ul>
                                    <Button variant="link" href='/notifications' className={`${styles.dropDownBtnViewAll} dropAllBtn`}>All Notifications</Button>
                                </div>
                            }
                        </div>
                        {isMobile ? "" :
                            <Button variant="link" className={styles.menuBtn}>
                                <Envelope size={30} />
                            </Button>
                        }
                    </div>
                    {isMobile ? "" :
                        <div className={styles.switchBox}>
                            <input type="checkbox" className={styles.checkbox} id="checkbox" onChange={toggleTheme}
                                checked={isDarkMode} />
                            <label htmlFor="checkbox" className={`${styles.checkboxLabel} checkboxLabelDark`}>
                                <StarAndCrescent size={20} />
                                <Sun size={20} />
                                <span className={`${styles.ball} ballDark`}></span>
                            </label>
                        </div>
                    }
                    <div className={styles.userBox}>
                        <Button ref={userBtnRef} variant="link" className={`${styles.menuBtn} ${styles.userBtn} `} onClick={() => setShowUser((prev) => !prev)} >
                            <Image src="./../images/avatar.png" alt="user" width={40} height={40} className={styles.avatarImg} />
                        </Button>

                        {showUser &&
                            <div ref={userDropdownRef} className={`${styles.dropDownOuter} dropDownOuter`}>
                                <ul className={styles.dropUl}>
                                    <li className={styles.dropItem}>
                                        <Link href="/points-wallet" className={`${styles.itemLink} notificationItems`}>
                                            <span className={styles.titleB}>Subscription</span>
                                        </Link>
                                    </li>
                                    <li className={styles.dropItem}>
                                        <Link href="/points-wallet" className={`${styles.itemLink} notificationItems`}>
                                            <span className={styles.titleB}>Order History</span>
                                        </Link>
                                    </li>
                                    <li className={styles.dropItem}>
                                        <Link href="/points-wallet" className={`${styles.itemLink} notificationItems`}>
                                            <span className={styles.titleB}>Credit Wallet</span>
                                        </Link>
                                    </li>
                                    <li className={styles.dropItem}>
                                        <Link href="/points-wallet" className={`${styles.itemLink} notificationItems`}>
                                            <span className={styles.titleB}>Payment Options</span>
                                        </Link>
                                    </li>
                                    <li className={styles.dropItem}>
                                        <Link href="/points-wallet" className={`${styles.itemLink} notificationItems`}>
                                            <span className={styles.titleB}>Acount Settings</span>
                                        </Link>
                                    </li>
                                    <li className={styles.dropItem}>
                                        <Link href="/points-wallet" className={`${styles.itemLink} notificationItems`}>
                                            <span className={styles.titleB}>Logout</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>                   
                </div>
            </div>
        </Navbar>
    )
}

export default HeaderComp
