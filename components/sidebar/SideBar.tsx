
'use client'
import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import { Collapse } from "react-bootstrap";
// @ts-ignore
import { CaretDown, Lifebuoy } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import LgLogo from '@/public/images/lgLogo.svg'
import SmLogo from '@/public/images/smLogo.svg'
import LgLogohm from '@/public/images/logo-full.png'
import SmLogohm from '@/public/images/logosml.png'
import Image from "next/image";
import Link from "next/link";
import MenuArrow from "./menuArrow";
interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();

  // Check if the path includes 'customerHome/'
  const isCustomerHome: boolean = pathname?.includes('customerHome/');
  const isHome: boolean = pathname?.includes('home/');
  const isHoldingTanks: boolean = pathname?.includes('holdingTanks/');

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

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

  const closeSubmenu = () => {
    setOpenMenu(null); // Close all open submenus
  };

  // Handle sidebar hover to close submenu when hovering outside
  const handleMouseLeaveSidebar = () => {
    if (collapsed) {
      closeSubmenu(); // Close submenu only when sidebar is collapsed
    }
    setHovered(false);
  };

  // Close submenu when the sidebar is collapsed
  useEffect(() => {
    if (collapsed) {
      setOpenMenu(null); // Close submenu when sidebar collapses
    }
  }, [collapsed]);
  const isActive = (href: string) => pathname?.startsWith(href);
  const handleLinkClick = () => {
    if (isMobile) {
      Sidebar({ collapsed: true });
    }
  };

  return (

    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : styles.opened} ${hovered && styles.hovered}`} onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeaveSidebar}>
      <div className={styles.header}>
        <Link href={'/home'} className={styles.logoLink}>
          {(!collapsed || hovered) || isMobile ? (
            <Image
              src={isHome ? LgLogohm : LgLogo}
              alt="O2 Global Full Logo"
              width={150}
              height={56}
            />
          ) : (
            <Image
              src={isHome ? SmLogohm : SmLogo}
              alt="O2 Global Small Logo"
              width={47}
              height={50}
            />
          )}
        </Link>
      </div>
      <div className={`navBox`} >
        <nav className={`${styles.nav} `} >
          <Link href="/home" className={`${styles.menuItem} ${isActive('/home') ? styles.active : ''}`}
            onClick={handleLinkClick}
          >
            <span className={styles.leftItem}>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 14.7532H14V21.7532H21V14.7532Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 14.7532H3V21.7532H10V14.7532Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 3.75317H14V10.7532H21V3.75317Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 3.75317H3V10.7532H10V3.75317Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {!isMobile ? (
                <>
                  {!collapsed || hovered ? "Dashboard" : null}
                </>
              ) : (
                <>
                  Dashboard
                </>
              )}
            </span>
          </Link>
          {(isHome || isHoldingTanks) &&
            <>
              <button
                className={styles.menuItem}
                onClick={() => toggleMenu("TeamStructure")}
              >
                <span className={styles.leftItem}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0001 15.8369C19.456 16.5683 20.7042 17.742 21.6153 19.2096C21.7957 19.5003 21.886 19.6456 21.9172 19.8468C21.9805 20.2558 21.7009 20.7585 21.32 20.9204C21.1326 21 20.9218 21 20.5001 21M16.0001 11.5322C17.4818 10.7959 18.5001 9.26686 18.5001 7.5C18.5001 5.73314 17.4818 4.20411 16.0001 3.46776M14.0001 7.5C14.0001 9.98528 11.9854 12 9.50008 12C7.0148 12 5.00008 9.98528 5.00008 7.5C5.00008 5.01472 7.0148 3 9.50008 3C11.9854 3 14.0001 5.01472 14.0001 7.5ZM2.55931 18.9383C4.15362 16.5446 6.66945 15 9.50008 15C12.3307 15 14.8465 16.5446 16.4409 18.9383C16.7901 19.4628 16.9648 19.725 16.9446 20.0599C16.929 20.3207 16.758 20.64 16.5496 20.7976C16.282 21 15.9139 21 15.1777 21H3.82244C3.08625 21 2.71816 21 2.45052 20.7976C2.24213 20.64 2.07117 20.3207 2.05551 20.0599C2.03541 19.725 2.21004 19.4628 2.55931 18.9383Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {!isMobile ? (
                    <>
                      {!collapsed || hovered ? "Team Structure" : null}
                    </>
                  ) : (
                    <>
                      Team Structure
                    </>
                  )}
                </span>
                <MenuArrow open={openMenu === "TeamStructure"} isMobile={isMobile} hovered={hovered} collapsed={collapsed} />
              </button>
              <Collapse in={openMenu === "TeamStructure"}>
                <div className={styles.subMenu}>
                  <Link href="/sponserTree" className={`${styles.menuItem}`}>Sponsor Tree</Link>
                  <Link href="/sponsorList" className={`${styles.menuItem}`}>Sponsor List</Link>
                  <Link href="/legacyTree" className={`${styles.menuItem}`}>Legacy Tree</Link>
                  <Link href="/legacyList" className={`${styles.menuItem}`}>Legacy List</Link>
                  <Link href="/holdingTanks" className={`${styles.menuItem} ${isActive('/holdingTanks') ? styles.active : ''}`} onClick={handleLinkClick}>Holding Tank</Link>
                </div>
              </Collapse>
              <Link href="/teamSales" className={`${styles.menuItem}`}>
                <span className={styles.leftItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M164.44,105.34l-48-32A8,8,0,0,0,104,80v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,129.05V95l25.58,17ZM216,40H40A16,16,0,0,0,24,56V168a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,128H40V56H216V168Zm16,40a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,208Z"></path></svg>
                  {!isMobile ? (
                    <>
                      {!collapsed || hovered ? "Training" : null}
                    </>
                  ) : (
                    <>
                      Training
                    </>
                  )}
                </span>
              </Link>
              <button
                className={styles.menuItem}
                onClick={() => toggleMenu("CompanyNews")}
              >
                <span className={styles.leftItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M88,112a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H96A8,8,0,0,1,88,112Zm8,40h80a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM232,64V184a24,24,0,0,1-24,24H32A24,24,0,0,1,8,184.11V88a8,8,0,0,1,16,0v96a8,8,0,0,0,16,0V64A16,16,0,0,1,56,48H216A16,16,0,0,1,232,64Zm-16,0H56V184a23.84,23.84,0,0,1-1.37,8H208a8,8,0,0,0,8-8Z"></path></svg>
                  {!isMobile ? (
                    <>
                      {!collapsed || hovered ? "Company News" : null}
                    </>
                  ) : (
                    <>
                      Company News
                    </>
                  )}
                </span>
                <MenuArrow open={openMenu === "CompanyNews"} isMobile={isMobile} hovered={hovered} collapsed={collapsed} />
              </button>
              <Collapse in={openMenu === "CompanyNews"}>
                <div className={styles.subMenu}>
                  <Link href="/teamSales" className={`${styles.menuItem}`}>CEO calls</Link>
                  <Link href="/overviewCalls" className={`${styles.menuItem}`}>Overview Calls</Link>
                  <Link href="/notification" className={`${styles.menuItem}`}>Notifications</Link>
                </div>
              </Collapse>
            </>
          }
          <button className={styles.menuItem} onClick={() => toggleMenu("MyAccount")}>
            <span className={styles.leftItem}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0001 15C8.83002 15 6.01089 16.5306 4.21609 18.906C3.8298 19.4172 3.63665 19.6728 3.64297 20.0183C3.64785 20.2852 3.81546 20.6219 4.02546 20.7867C4.29728 21 4.67396 21 5.42733 21H18.5729C19.3262 21 19.7029 21 19.9747 20.7867C20.1847 20.6219 20.3523 20.2852 20.3572 20.0183C20.3635 19.6728 20.1704 19.4172 19.7841 18.906C17.9893 16.5306 15.1702 15 12.0001 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.0001 12C14.4854 12 16.5001 9.98528 16.5001 7.5C16.5001 5.01472 14.4854 3 12.0001 3C9.51481 3 7.5001 5.01472 7.5001 7.5C7.5001 9.98528 9.51481 12 12.0001 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {!isMobile ? (
                <>
                  {!collapsed || hovered ? "My Account" : null}
                </>
              ) : (
                <>
                  My Account
                </>
              )}
            </span>
            <MenuArrow open={openMenu === "MyAccount"} isMobile={isMobile} hovered={hovered} collapsed={collapsed} />
          </button>
          <Collapse in={openMenu === "MyAccount"}>
            <div className={styles.subMenu}>
              <Link href="/membership" className={`${styles.menuItem}`}>Memberships</Link>
              {(!isCustomerHome) &&
                <>
                  <Link href="/payout" className={`${styles.menuItem}`}>Payout Options</Link>
                  <Link href="/account" className={`${styles.menuItem}`}>Account Settings</Link>
                  {/* <Link href="/payout" className={`${styles.menuItem}`}>Earnings</Link> */}
                </>
              }
              <Link href="/orderHistory" className={`${styles.menuItem}`}>Order History</Link>
            </div>
          </Collapse>
          {(isHome) &&
            <>
              <button
                className={styles.menuItem}
                onClick={() => toggleMenu("eWallet")}
              >
                <span className={styles.leftItem}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.76837 4.93109C2.13649 5.56298 1.78149 6.42 1.78149 7.31363V16.6864C1.78149 17.58 2.13649 18.437 2.76837 19.0689C3.40026 19.7008 4.25729 20.0558 5.15091 20.0558H18.8496C19.7432 20.0558 20.6002 19.7008 21.2321 19.0689C21.864 18.437 22.219 17.58 22.219 16.6864V7.31363C22.219 6.42 21.864 5.56298 21.2321 4.93109C20.6002 4.2992 19.7432 3.94421 18.8496 3.94421H5.15091C4.25729 3.94421 3.40026 4.2992 2.76837 4.93109ZM3.96477 6.12749C4.27936 5.81291 4.70602 5.63617 5.15091 5.63617H18.8496C19.2945 5.63617 19.7211 5.81291 20.0357 6.12749C20.3503 6.44207 20.527 6.86874 20.527 7.31363V8.2701H3.47346V7.31363C3.47346 6.86874 3.65019 6.44207 3.96477 6.12749ZM3.96477 17.8725C3.65019 17.558 3.47346 17.1313 3.47346 16.6864V9.96207H20.527V16.6864C20.527 17.1313 20.3503 17.558 20.0357 17.8725C19.7211 18.1871 19.2945 18.3639 18.8496 18.3639H5.15091C4.70602 18.3639 4.27936 18.1871 3.96477 17.8725ZM17.7681 14.038H15.6052C15.3808 14.038 15.1656 14.1271 15.007 14.2857C14.8483 14.4444 14.7592 14.6596 14.7592 14.8839C14.7592 15.1083 14.8483 15.3235 15.007 15.4821C15.1656 15.6408 15.3808 15.7299 15.6052 15.7299H17.7681C17.9925 15.7299 18.2076 15.6408 18.3663 15.4821C18.525 15.3235 18.6141 15.1083 18.6141 14.8839C18.6141 14.6596 18.525 14.4444 18.3663 14.2857C18.2076 14.1271 17.9925 14.038 17.7681 14.038Z" fill="currentColor" stroke="currentColor" strokeWidth="0.25" />
                  </svg>

                  {!isMobile ? (
                    <>
                      {!collapsed || hovered ? "E-Wallet" : null}
                    </>
                  ) : (
                    <>
                      E-Wallet
                    </>
                  )}
                </span>
                <MenuArrow open={openMenu === "eWallet"} isMobile={isMobile} hovered={hovered} collapsed={collapsed} />
              </button>
              <Collapse in={openMenu === "eWallet"}>
                <div className={styles.subMenu}>
                  <Link href="/commissionWallet" className={`${styles.menuItem}`}>Commissions</Link>
                  <Link href="/creditWallet" className={`${styles.menuItem}`}>Credit Wallet</Link>
                  <Link href="/teamSales" className={`${styles.menuItem}`}>Reward Points</Link>
                </div>
              </Collapse>
            </>
          }
          <button
            className={styles.menuItem}
            onClick={() => toggleMenu("MyWebsites")}
          >
            <span className={styles.leftItem}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 9H2M2 7.8L2 16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27977 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3L6.8 3C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {!isMobile ? (
                <>
                  {!collapsed || hovered ? "My Websites" : null}
                </>
              ) : (
                <>
                  My Websites
                </>
              )}
            </span>
            <MenuArrow open={openMenu === "MyWebsites"} isMobile={isMobile} hovered={hovered} collapsed={collapsed} />
          </button>
          <Collapse in={openMenu === "MyWebsites"}>
            <div className={styles.subMenu}>
              <Link href="/replicateWebsite" className={`${styles.menuItem}`}>Replicated sites</Link>
            </div>
          </Collapse>
          <Link href="https://escapetrips.com/tripList" target="_blank" className={`${styles.menuItem}`}>
            <span className={styles.leftItem}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 6.07003 16 5.60504 15.8978 5.22354C15.6204 4.18827 14.8117 3.37962 13.7765 3.10222C13.395 3 12.93 3 12 3C11.07 3 10.605 3 10.2235 3.10222C9.18827 3.37962 8.37962 4.18827 8.10222 5.22354C8 5.60504 8 6.07003 8 7M12.8 17.5H17.7C17.98 17.5 18.12 17.5 18.227 17.4455C18.3211 17.3976 18.3976 17.3211 18.4455 17.227C18.5 17.12 18.5 16.98 18.5 16.7V14.3C18.5 14.02 18.5 13.88 18.4455 13.773C18.3976 13.6789 18.3211 13.6024 18.227 13.5545C18.12 13.5 17.98 13.5 17.7 13.5H12.8C12.52 13.5 12.38 13.5 12.273 13.5545C12.1789 13.6024 12.1024 13.6789 12.0545 13.773C12 13.88 12 14.02 12 14.3V16.7C12 16.98 12 17.12 12.0545 17.227C12.1024 17.3211 12.1789 17.3976 12.273 17.4455C12.38 17.5 12.52 17.5 12.8 17.5ZM6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V11.8C22 10.1198 22 9.27976 21.673 8.63803C21.3854 8.07354 20.9265 7.6146 20.362 7.32698C19.7202 7 18.8802 7 17.2 7H6.8C5.11984 7 4.27976 7 3.63803 7.32698C3.07354 7.6146 2.6146 8.07354 2.32698 8.63803C2 9.27976 2 10.1198 2 11.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {!isMobile ? (
                <>
                  {!collapsed || hovered ? "Escape Trips" : null}
                </>
              ) : (
                <>
                  Escape Trips
                </>
              )}
            </span>
          </Link>
          {(!collapsed || hovered) && (
            <Link href="/payout" className={`${styles.menuItem}`}>
              <span className={styles.leftItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.7273 14.7273C18.6063 15.0015 18.5702 15.3056 18.6236 15.6005C18.6771 15.8954 18.8177 16.1676 19.0273 16.3818L19.0818 16.4364C19.2509 16.6052 19.385 16.8057 19.4765 17.0265C19.568 17.2472 19.6151 17.4838 19.6151 17.7227C19.6151 17.9617 19.568 18.1983 19.4765 18.419C19.385 18.6397 19.2509 18.8402 19.0818 19.0091C18.913 19.1781 18.7124 19.3122 18.4917 19.4037C18.271 19.4952 18.0344 19.5423 17.7955 19.5423C17.5565 19.5423 17.3199 19.4952 17.0992 19.4037C16.8785 19.3122 16.678 19.1781 16.5091 19.0091L16.4545 18.9545C16.2403 18.745 15.9682 18.6044 15.6733 18.5509C15.3784 18.4974 15.0742 18.5335 14.8 18.6545C14.5311 18.7698 14.3018 18.9611 14.1403 19.205C13.9788 19.4489 13.8921 19.7347 13.8909 20.0273V20.1818C13.8909 20.664 13.6994 21.1265 13.3584 21.4675C13.0174 21.8084 12.5549 22 12.0727 22C11.5905 22 11.1281 21.8084 10.7871 21.4675C10.4461 21.1265 10.2545 20.664 10.2545 20.1818V20.1C10.2475 19.7991 10.1501 19.5073 9.97501 19.2625C9.79991 19.0176 9.55521 18.8312 9.27273 18.7273C8.99853 18.6063 8.69437 18.5702 8.39947 18.6236C8.10456 18.6771 7.83244 18.8177 7.61818 19.0273L7.56364 19.0818C7.39478 19.2509 7.19425 19.385 6.97353 19.4765C6.7528 19.568 6.51621 19.6151 6.27727 19.6151C6.03834 19.6151 5.80174 19.568 5.58102 19.4765C5.36029 19.385 5.15977 19.2509 4.99091 19.0818C4.82186 18.913 4.68775 18.7124 4.59626 18.4917C4.50476 18.271 4.45766 18.0344 4.45766 17.7955C4.45766 17.5565 4.50476 17.3199 4.59626 17.0992C4.68775 16.8785 4.82186 16.678 4.99091 16.5091L5.04545 16.4545C5.25503 16.2403 5.39562 15.9682 5.4491 15.6733C5.50257 15.3784 5.46647 15.0742 5.34545 14.8C5.23022 14.5311 5.03887 14.3018 4.79497 14.1403C4.55107 13.9788 4.26526 13.8921 3.97273 13.8909H3.81818C3.33597 13.8909 2.87351 13.6994 2.53253 13.3584C2.19156 13.0174 2 12.5549 2 12.0727C2 11.5905 2.19156 11.1281 2.53253 10.7871C2.87351 10.4461 3.33597 10.2545 3.81818 10.2545H3.9C4.2009 10.2475 4.49273 10.1501 4.73754 9.97501C4.98236 9.79991 5.16883 9.55521 5.27273 9.27273C5.39374 8.99853 5.42984 8.69437 5.37637 8.39947C5.3229 8.10456 5.18231 7.83244 4.97273 7.61818L4.91818 7.56364C4.74913 7.39478 4.61503 7.19425 4.52353 6.97353C4.43203 6.7528 4.38493 6.51621 4.38493 6.27727C4.38493 6.03834 4.43203 5.80174 4.52353 5.58102C4.61503 5.36029 4.74913 5.15977 4.91818 4.99091C5.08704 4.82186 5.28757 4.68775 5.50829 4.59626C5.72901 4.50476 5.96561 4.45766 6.20455 4.45766C6.44348 4.45766 6.68008 4.50476 6.9008 4.59626C7.12152 4.68775 7.32205 4.82186 7.49091 4.99091L7.54545 5.04545C7.75971 5.25503 8.03183 5.39562 8.32674 5.4491C8.62164 5.50257 8.9258 5.46647 9.2 5.34545H9.27273C9.54161 5.23022 9.77093 5.03887 9.93245 4.79497C10.094 4.55107 10.1807 4.26526 10.1818 3.97273V3.81818C10.1818 3.33597 10.3734 2.87351 10.7144 2.53253C11.0553 2.19156 11.5178 2 12 2C12.4822 2 12.9447 2.19156 13.2856 2.53253C13.6266 2.87351 13.8182 3.33597 13.8182 3.81818V3.9C13.8193 4.19253 13.906 4.47834 14.0676 4.72224C14.2291 4.96614 14.4584 5.15749 14.7273 5.27273C15.0015 5.39374 15.3056 5.42984 15.6005 5.37637C15.8954 5.3229 16.1676 5.18231 16.3818 4.97273L16.4364 4.91818C16.6052 4.74913 16.8057 4.61503 17.0265 4.52353C17.2472 4.43203 17.4838 4.38493 17.7227 4.38493C17.9617 4.38493 18.1983 4.43203 18.419 4.52353C18.6397 4.61503 18.8402 4.74913 19.0091 4.91818C19.1781 5.08704 19.3122 5.28757 19.4037 5.50829C19.4952 5.72901 19.5423 5.96561 19.5423 6.20455C19.5423 6.44348 19.4952 6.68008 19.4037 6.9008C19.3122 7.12152 19.1781 7.32205 19.0091 7.49091L18.9545 7.54545C18.745 7.75971 18.6044 8.03183 18.5509 8.32674C18.4974 8.62164 18.5335 8.9258 18.6545 9.2V9.27273C18.7698 9.54161 18.9611 9.77093 19.205 9.93245C19.4489 10.094 19.7347 10.1807 20.0273 10.1818H20.1818C20.664 10.1818 21.1265 10.3734 21.4675 10.7144C21.8084 11.0553 22 11.5178 22 12C22 12.4822 21.8084 12.9447 21.4675 13.2856C21.1265 13.6266 20.664 13.8182 20.1818 13.8182H20.1C19.8075 13.8193 19.5217 13.906 19.2778 14.0676C19.0339 14.2291 18.8425 14.4584 18.7273 14.7273Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {!isMobile ? (
                  <>
                    {!collapsed || hovered ? "Escapetrips Gear" : null}
                  </>
                ) : (
                  <>
                    Escapetrips Gear
                  </>
                )}
              </span>
            </Link>
          )}
          {(isHome) &&
            <>
              <button
                className={styles.menuItem}
                onClick={() => toggleMenu("TeamTools")}
              >
                <span className={styles.leftItem}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.7273 14.7273C18.6063 15.0015 18.5702 15.3056 18.6236 15.6005C18.6771 15.8954 18.8177 16.1676 19.0273 16.3818L19.0818 16.4364C19.2509 16.6052 19.385 16.8057 19.4765 17.0265C19.568 17.2472 19.6151 17.4838 19.6151 17.7227C19.6151 17.9617 19.568 18.1983 19.4765 18.419C19.385 18.6397 19.2509 18.8402 19.0818 19.0091C18.913 19.1781 18.7124 19.3122 18.4917 19.4037C18.271 19.4952 18.0344 19.5423 17.7955 19.5423C17.5565 19.5423 17.3199 19.4952 17.0992 19.4037C16.8785 19.3122 16.678 19.1781 16.5091 19.0091L16.4545 18.9545C16.2403 18.745 15.9682 18.6044 15.6733 18.5509C15.3784 18.4974 15.0742 18.5335 14.8 18.6545C14.5311 18.7698 14.3018 18.9611 14.1403 19.205C13.9788 19.4489 13.8921 19.7347 13.8909 20.0273V20.1818C13.8909 20.664 13.6994 21.1265 13.3584 21.4675C13.0174 21.8084 12.5549 22 12.0727 22C11.5905 22 11.1281 21.8084 10.7871 21.4675C10.4461 21.1265 10.2545 20.664 10.2545 20.1818V20.1C10.2475 19.7991 10.1501 19.5073 9.97501 19.2625C9.79991 19.0176 9.55521 18.8312 9.27273 18.7273C8.99853 18.6063 8.69437 18.5702 8.39947 18.6236C8.10456 18.6771 7.83244 18.8177 7.61818 19.0273L7.56364 19.0818C7.39478 19.2509 7.19425 19.385 6.97353 19.4765C6.7528 19.568 6.51621 19.6151 6.27727 19.6151C6.03834 19.6151 5.80174 19.568 5.58102 19.4765C5.36029 19.385 5.15977 19.2509 4.99091 19.0818C4.82186 18.913 4.68775 18.7124 4.59626 18.4917C4.50476 18.271 4.45766 18.0344 4.45766 17.7955C4.45766 17.5565 4.50476 17.3199 4.59626 17.0992C4.68775 16.8785 4.82186 16.678 4.99091 16.5091L5.04545 16.4545C5.25503 16.2403 5.39562 15.9682 5.4491 15.6733C5.50257 15.3784 5.46647 15.0742 5.34545 14.8C5.23022 14.5311 5.03887 14.3018 4.79497 14.1403C4.55107 13.9788 4.26526 13.8921 3.97273 13.8909H3.81818C3.33597 13.8909 2.87351 13.6994 2.53253 13.3584C2.19156 13.0174 2 12.5549 2 12.0727C2 11.5905 2.19156 11.1281 2.53253 10.7871C2.87351 10.4461 3.33597 10.2545 3.81818 10.2545H3.9C4.2009 10.2475 4.49273 10.1501 4.73754 9.97501C4.98236 9.79991 5.16883 9.55521 5.27273 9.27273C5.39374 8.99853 5.42984 8.69437 5.37637 8.39947C5.3229 8.10456 5.18231 7.83244 4.97273 7.61818L4.91818 7.56364C4.74913 7.39478 4.61503 7.19425 4.52353 6.97353C4.43203 6.7528 4.38493 6.51621 4.38493 6.27727C4.38493 6.03834 4.43203 5.80174 4.52353 5.58102C4.61503 5.36029 4.74913 5.15977 4.91818 4.99091C5.08704 4.82186 5.28757 4.68775 5.50829 4.59626C5.72901 4.50476 5.96561 4.45766 6.20455 4.45766C6.44348 4.45766 6.68008 4.50476 6.9008 4.59626C7.12152 4.68775 7.32205 4.82186 7.49091 4.99091L7.54545 5.04545C7.75971 5.25503 8.03183 5.39562 8.32674 5.4491C8.62164 5.50257 8.9258 5.46647 9.2 5.34545H9.27273C9.54161 5.23022 9.77093 5.03887 9.93245 4.79497C10.094 4.55107 10.1807 4.26526 10.1818 3.97273V3.81818C10.1818 3.33597 10.3734 2.87351 10.7144 2.53253C11.0553 2.19156 11.5178 2 12 2C12.4822 2 12.9447 2.19156 13.2856 2.53253C13.6266 2.87351 13.8182 3.33597 13.8182 3.81818V3.9C13.8193 4.19253 13.906 4.47834 14.0676 4.72224C14.2291 4.96614 14.4584 5.15749 14.7273 5.27273C15.0015 5.39374 15.3056 5.42984 15.6005 5.37637C15.8954 5.3229 16.1676 5.18231 16.3818 4.97273L16.4364 4.91818C16.6052 4.74913 16.8057 4.61503 17.0265 4.52353C17.2472 4.43203 17.4838 4.38493 17.7227 4.38493C17.9617 4.38493 18.1983 4.43203 18.419 4.52353C18.6397 4.61503 18.8402 4.74913 19.0091 4.91818C19.1781 5.08704 19.3122 5.28757 19.4037 5.50829C19.4952 5.72901 19.5423 5.96561 19.5423 6.20455C19.5423 6.44348 19.4952 6.68008 19.4037 6.9008C19.3122 7.12152 19.1781 7.32205 19.0091 7.49091L18.9545 7.54545C18.745 7.75971 18.6044 8.03183 18.5509 8.32674C18.4974 8.62164 18.5335 8.9258 18.6545 9.2V9.27273C18.7698 9.54161 18.9611 9.77093 19.205 9.93245C19.4489 10.094 19.7347 10.1807 20.0273 10.1818H20.1818C20.664 10.1818 21.1265 10.3734 21.4675 10.7144C21.8084 11.0553 22 11.5178 22 12C22 12.4822 21.8084 12.9447 21.4675 13.2856C21.1265 13.6266 20.664 13.8182 20.1818 13.8182H20.1C19.8075 13.8193 19.5217 13.906 19.2778 14.0676C19.0339 14.2291 18.8425 14.4584 18.7273 14.7273Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {!isMobile ? (
                    <>
                      {!collapsed || hovered ? "Team Tools" : null}
                    </>
                  ) : (
                    <>
                      Team Tools
                    </>
                  )}
                </span>
                <MenuArrow open={openMenu === "TeamTools"} isMobile={isMobile} hovered={hovered} collapsed={collapsed} />
              </button>
              <Collapse in={openMenu === "TeamTools"}>
                <div className={styles.subMenu}>
                  <Link href="/teamResource" className={`${styles.menuItem}`}>Team Resources</Link>
                </div>
              </Collapse>
              <button
                className={styles.menuItem}
                onClick={() => toggleMenu("BusinessReports")}
              >
                <span className={styles.leftItem}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.76121C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7363 6.95991 21.2388 8.17317C21.7413 9.38643 22 10.6868 22 12M12 2V12M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5229 22 12M12 2C17.5228 2 22 6.47716 22 12M22 12L12 12M22 12C22 13.5781 21.6265 15.1338 20.9101 16.5399C20.1936 17.946 19.1546 19.1626 17.8779 20.0902L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {!isMobile ? (
                    <>
                      {!collapsed || hovered ? "Business Reports" : null}
                    </>
                  ) : (
                    <>
                      Business Reports
                    </>
                  )}
                </span>
                <MenuArrow open={openMenu === "BusinessReports"} isMobile={isMobile} hovered={hovered} collapsed={collapsed} />
              </button>
              <Collapse in={openMenu === "BusinessReports"}>
                <div className={styles.subMenu}>
                  <Link href="/teamSales" className={`${styles.menuItem}`}>Team Sales</Link>
                </div>
              </Collapse>
              <Link href="/payout" className={`${styles.menuItem}`}>
                <span className={styles.leftItem}>
                  {/* <User size={24} /> */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0001 15C8.83002 15 6.01089 16.5306 4.21609 18.906C3.8298 19.4172 3.63665 19.6728 3.64297 20.0183C3.64785 20.2852 3.81546 20.6219 4.02546 20.7867C4.29728 21 4.67396 21 5.42733 21H18.5729C19.3262 21 19.7029 21 19.9747 20.7867C20.1847 20.6219 20.3523 20.2852 20.3572 20.0183C20.3635 19.6728 20.1704 19.4172 19.7841 18.906C17.9893 16.5306 15.1702 15 12.0001 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.0001 12C14.4854 12 16.5001 9.98528 16.5001 7.5C16.5001 5.01472 14.4854 3 12.0001 3C9.51481 3 7.5001 5.01472 7.5001 7.5C7.5001 9.98528 9.51481 12 12.0001 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {!isMobile ? (
                    <>
                      {!collapsed || hovered ? "O2 Global Gear" : null}
                    </>
                  ) : (
                    <>
                      O2 Global Gear
                    </>
                  )}
                </span>
              </Link>
            </>
          }
          <Link href="/support" className={`${styles.menuItem}`}>
            <span className={styles.leftItem}>
              <Lifebuoy size={24} />
              {!isMobile ? (
                <>
                  {!collapsed || hovered ? "Support" : null}
                </>
              ) : (
                <>
                  Support
                </>
              )}
            </span>
          </Link>
        </nav>
      </div>
      {(!collapsed && isCustomerHome) ?
        <button className={styles.upgradeButton}>
          <Image src="./../images/upgradeAc.svg" alt="upgradeAc" width={22} height={23} className={styles.upgradeAc} />
          Upgrade Account
        </button>
        : (
          ''
        )}
    </div>
  );
};

export default Sidebar;