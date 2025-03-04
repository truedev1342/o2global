'use client'

import HeaderComp from '@/components/Header/header'
import React, { useEffect, useState } from 'react'
import styles from "./Home.module.scss";
import Sidebar from '@/components/sidebar/SideBar';
import BannerSection from '@/components/banner/banner';
import { Badge, Button, Image, Modal, ProgressBar, Tab, Tabs } from 'react-bootstrap';
import Link from 'next/link';
import CircularProgressBar from '@/components/graphs/CircularProgressBar';
import CircleProgressWoText from '@/components/graphs/CircleProgressWoText';
import { CaretDown, Gear, Question } from '@phosphor-icons/react';
import TagBoxes from '@/components/common/tags/TagBoxes';
import TreeV from '@/public/images/treeV.png'
import rankIcon from '@/public/images/rankIcon.svg'
import activeUsers from '@/public/images/activeUsers.png'
import subs from '@/public/images/subs.png'
import commisions from '@/public/images/commisions.png'
import rp from '@/public/images/rp.svg'
import cw from '@/public/images/cw.svg'
import rc from '@/public/images/rc.svg'
import grp from '@/public/images/grp.svg'
import ap from '@/public/images/ap.svg'
import lap from '@/public/images/lap.svg'
import cm1 from '@/public/images/cm1.svg'
import cm2 from '@/public/images/cm2.svg'
import cm3 from '@/public/images/cm3.svg'
import cm4 from '@/public/images/cm4.svg'
import cm5 from '@/public/images/cm5.svg'

const HomePage = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Last 2 Months");
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  const options = [
    "Last 3 Months",
    "Last 4 Months",
    "Last 5 Months"
  ]; // Dropdown options

  // Handle screen size changes to determine if it's mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("ubo-auth");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUserInfo(parsed?.user || null);
      }
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOverlayClick = () => {
    toggleSidebar();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.innerSectionWrp}>
      <BannerSection />
      <div className={`${styles.sectionGrids} ${styles.duelGrid}`}>
        <div className={`${styles.cardBox} ${styles.largBox} cardBox`}>
          <div className={`${styles.hightBox}`}>
            <div className={styles.titleLine}>
              Profile
              <Link href="/account" className={`${styles.infoLink} linkAbtn`}>
                {/* <Image src="./../images/settings.svg" alt="settings" width={24} height={24} className={styles.icnImg} /> */}
                <Gear size={24} />
              </Link>
            </div>
            <div className={styles.duelBoxGrid}>
              <div className={`${styles.tagBoxsWrapper} ${styles.duelTagBoxWrapper}`}>
                <div className={styles.clipBoxHead}>
                  <Image src="./../images/largeAvatar.svg" alt="largeAvatar" width={90} height={90} className={styles.avtarImg} />
                  <span>{userInfo?.full_name || 'Demo User'}</span>
                  <p>
                    <code>#624611</code> | demo
                  </p>
                </div>
                <div className={`${styles.clipBoxes} ${styles.smlclipBoxes} smlclipBoxes`}>
                  <TagBoxes topLineText="Current Rank" bottomLineText="Executive" rankIcon={rankIcon.src} />
                  <TagBoxes topLineText="Paid Rank" bottomLineText="Executive" rankIcon={rankIcon.src} />
                  <TagBoxes topLineText="Total Tree Volume" bottomLineText="160" rankIcon={TreeV.src} />
                  <TagBoxes topLineText="Active Users" bottomLineText="1558" rankIcon={activeUsers.src} />
                  <TagBoxes topLineText="Total Subscriptions" bottomLineText="174" rankIcon={subs.src} />
                  <TagBoxes topLineText="Commissions" bottomLineText="$107.42" rankIcon={commisions.src} />
                </div>
              </div>
              <div className={`${styles.tagBoxsWrapper} ${styles.duelTagBoxWrapper}`}>
                <div className={`${styles.clipBoxHead} ${styles.progressHead}`}>
                  <div className={`${styles.imgInnerWrapper}`}>
                    <Image src="./../images/progressHalf.png" alt="progressHalf" width={224} height={224} className={styles.progressImg} />
                    <span>90%</span>
                    <p>
                      Incomplete
                    </p>
                  </div>
                </div>
                <div className={`${styles.clipBoxes} ${styles.fullClipBoxes}`}>
                  <div className={styles.tagBoxs}>
                    <div className={styles.leftMergeBox}>
                      <div className={styles.rightBox}>
                        <span className={styles.iconWrapper}>
                          <Image src="./../images/acDetail.png" alt="icon" width={46} height={46} className={styles.icnImg} />
                        </span>
                      </div>
                      <div className={styles.leftBox}>
                        <span className={styles.topLine}>Account Details</span>
                        <span className={styles.bottomLine}>Complete all of your account details and settings</span>
                      </div>
                    </div>
                    <span className={styles.iconWrapper}>
                      {/* <Image src="./../images/checked.svg" alt="checked" width={21} height={21} className={styles.checkedImg} /> */}
                      <Badge className={`${styles.badge} successBadge`}>Complete</Badge>
                    </span>
                  </div>
                  <div className={styles.tagBoxs}>
                    <div className={styles.leftMergeBox}>
                      <div className={styles.rightBox}>
                        <span className={styles.iconWrapper}>
                          <Image src="./../images/proSetup.png" alt="icon" width={46} height={46} className={styles.icnImg} />
                        </span>
                      </div>
                      <div className={styles.leftBox}>
                        <span className={styles.topLine}>Profile Setup</span>
                        <span className={styles.bottomLine}>Upload a profile image and complete your profile</span>
                      </div>
                    </div>
                    <span className={styles.iconWrapper}>
                      {/* <Image src="./../images/checked.svg" alt="checked" width={21} height={21} className={styles.checkedImg} /> */}
                      <Badge className={`${styles.badge} successBadge`}>Complete</Badge>
                    </span>
                  </div>
                  <div className={styles.tagBoxs}>
                    <div className={styles.leftMergeBox}>
                      <div className={styles.rightBox}>
                        <span className={styles.iconWrapper}>
                          <Image src="./../images/paySetup.png" alt="icon" width={46} height={46} className={styles.icnImg} />
                        </span>
                      </div>
                      <div className={styles.leftBox}>
                        <span className={styles.topLine}>Payment Setup</span>
                        <span className={styles.bottomLine}>Set your payment option</span>
                      </div>
                    </div>
                    <span className={styles.iconWrapper}>
                      <Badge className={`${styles.badge} dangerBadge`}>Incomplete</Badge>
                    </span>
                    {/* <span className={`${styles.iconWrapper} ${styles.progImgWrapper}`}>
                          50%
                          <Image src="./../images/roundProgress.svg" alt="roundProgress" width={48} height={48} className={styles.progressImg} />
                        </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.smallBox}`}>
          <div className={`${styles.hightBox}`}>
            <div className={`${styles.cardBox} cardBox`}>
              <div className={styles.titleLine}>
                Follow Us
              </div>
              <div className={styles.tagBoxsWrapper}>
                <div className={`${styles.tagBoxs} ${styles.centeredTags}`}>
                  <Image src="./../images/insta.png" alt="insta" width={67} height={75} className={styles.progressImg} />
                </div>
                <div className={`${styles.tagBoxs} ${styles.centeredTags}`}>
                  <Image src="./../images/fb.png" alt="fb" width={66} height={75} className={styles.progressImg} />
                </div>
                <div className={`${styles.tagBoxs} ${styles.centeredTags}`}>
                  <Image src="./../images/yt.png" alt="yt" width={58} height={75} className={styles.progressImg} />
                </div>
                <div className={`${styles.tagBoxs} ${styles.centeredTags}`}>
                  <Image src="./../images/telegram.png" alt="telegram" width={62} height={75} className={styles.progressImg} />
                </div>
              </div>
            </div>
            <div className={`${styles.cardBox} cardBox`}>
              <Button className={styles.upgradeBtncta}>
                Register Your Rapid Funnel Account
              </Button>
              <div className={styles.tagBoxsWrapper}>
                <div className={`${styles.tagBoxs} ${styles.centeredTags}`}>
                  <Image src="./../images/appStore.png" alt="appStore" width={65} height={70} className={styles.progressImg} />
                </div>
                <div className={`${styles.tagBoxs} ${styles.centeredTags}`}>
                  <Image src="./../images/gPlay.png" alt="gPlay" width={66} height={69} className={styles.progressImg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.sectionGrids} ${styles.duelGrid}`}>
        <div className={`${styles.cardBox} cardBox`}>
          <div className={styles.titleLine}>
            Points Wallet
            <Button variant='link' className={styles.infoLink} onClick={handleShow}>
              {/* <Image src="./../images/Question.svg" alt="Question" width={24} height={24} className={styles.icnImg} /> */}
              <Question size={24} weight="fill" />
            </Button>
            <Modal show={show} onHide={handleClose} className='commonModal' centered>
              <Modal.Header closeButton>
                <Modal.Title>Points Wallet Terms & Conditions</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </Modal.Body>
            </Modal>
          </div>
          <div className={styles.tagBoxsWrapper}>
            <TagBoxes topLineText="Reward Points" bottomLineText="282.01" rankIcon={rp.src} />
            <TagBoxes topLineText="Credit wallet" bottomLineText="282.01" rankIcon={cw.src} />
            <TagBoxes topLineText="Reward Credits" bottomLineText="10,029.75" rankIcon={rc.src} />
            <TagBoxes topLineText="Gifted Reward points" bottomLineText="282.01" rankIcon={grp.src} />
            <TagBoxes topLineText="Achievement points" bottomLineText="282.01" rankIcon={ap.src} />
            <TagBoxes topLineText="Loyalty advantage Points" bottomLineText="282.01" rankIcon={lap.src} />
          </div>
        </div>
        <div className={`${styles.cardBox} cardBox`}>
          <div className={styles.titleLine}>
            Commissions
          </div>
          <div className={styles.tagBoxsWrapper}>
            <TagBoxes topLineText="Daily" bottomLineText="$18.00" rankIcon={cm1.src} />
            <TagBoxes topLineText="Last 7 days" bottomLineText="$107.42" rankIcon={cm2.src} />
            <TagBoxes topLineText="Last 30 Days" bottomLineText="$10,029.75" rankIcon={cm3.src} />
            <TagBoxes topLineText="Year-To-Date" bottomLineText="$18.42" rankIcon={cm4.src} />
            <TagBoxes topLineText="Lifetime Commissions" bottomLineText="$282.42" rankIcon={cm5.src} />
          </div>
        </div>
      </div>
      <div className={`${styles.sectionGrids} ${styles.duelGrid}`}>
        <div className={`${styles.cardBox} cardBox`}>
          <div className={styles.titleLineWrapper}>
            <div className={styles.titleLine}>
              Fabulous 5
            </div>
            <div className={styles.legandsWrapperMain}>
              {!isMobile ? (
                <div className={styles.legandsWrapper}>
                  <span className={`${styles.legands} ${styles.green}`}>
                    Qualified
                  </span>
                  <span className={`${styles.legands} ${styles.blue}`}>
                    Not Qualified
                  </span>
                  <span className={`${styles.legands} ${styles.cyne}`}>
                    Paying Customer
                  </span>
                  <span className={`${styles.legands} ${styles.red}`}>
                    Cancel
                  </span>
                </div>
              ) : (
                <></>
              )}
              <div className={`${styles.dropdown} dropDown`}>
                <button className={`${styles.dropdownButton} dropDownBtn`} onClick={toggleDropdown}>
                  <span>{selected}</span>
                  <CaretDown size={18} className={`${styles.icon} ${isOpen ? styles.rotate : ""}`} />
                </button>
                {isOpen && (
                  <ul className={styles.dropdownMenu}>
                    {options.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleSelect(option)}
                        className={styles.dropdownItem}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className={styles.graphWrapper}>
            <div className={styles.innerGraphWrps}>
              <span className={styles.upperBox}>
                <CircularProgressBar current={40} total={40} fabulousStatus='blue' />
              </span>
              <svg className={styles.dottedLines}>
                <line x1="50%" y1="20%" x2="20%" y2="80%" />
                <line x1="50%" y1="20%" x2="80%" y2="80%" />
                <line x1="50%" y1="20%" x2="34%" y2="90%" />
                <line x1="50%" y1="20%" x2="67%" y2="90%" />
                <line x1="50%" y1="20%" x2="50%" y2="83%" />
              </svg>
              <span className={styles.lowerBox}>
                <CircularProgressBar current={10} total={40} fabulousStatus='red' />
                <CircularProgressBar current={18} total={40} fabulousStatus='blue' />
                <CircularProgressBar current={40} total={40} fabulousStatus='green' />
                <CircularProgressBar current={36} total={40} fabulousStatus='green' />
                <CircularProgressBar current={24} total={40} fabulousStatus='green' />
              </span>
            </div>
            <div className={styles.horizontalProgressWrapper}>
              <div className={styles.labelWrapper}>
                <span>Progress</span>
                <span>(120/240)</span>
              </div>
              <ProgressBar now={60} className={`${styles.horizontalProgressBar} custom-progress-bar`} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.sectionGrids} ${styles.duelGrid}`}>
        <div className={`${styles.cardBox} cardBox`}>
          <div className={styles.titleLine}>
            Status
          </div>
          <div className={styles.statusWrapperMain}>
            <div className={styles.statusUpper}>
              <div className={styles.leftBox}>
                <div className={styles.innerL}>
                  <span className={styles.labelSpan}>Current Rank</span>
                  <span className={styles.txtSpan}>QGSV</span>
                  <span className={styles.labelSpan}>Current Rank</span>
                  <span className={styles.txtSpan}>QGSV</span>
                </div>
                <div className={styles.innerR}>
                  <CircleProgressWoText current={70} total={100} fabulousStatus='blue' />
                </div>
              </div>
              <div className={styles.rightBox}>
                <div className={styles.innerBoxes}>
                  <span>Current Rank</span>
                  <Image src="./../images/box.svg" alt="box" width={56} height={56} />
                  <span className={styles.bolder}>Current Rank</span>
                </div>
                <div className={styles.innerBoxes}>
                  <span>Next Rank</span>
                  <Image src="./../images/box.svg" alt="box" width={56} height={56} />
                  <span className={styles.bolder}>1K</span>
                </div>
              </div>
            </div>
            <div className={styles.statuslower}>
              <div className={styles.prgWrps}>
                <div className={styles.labelWrapper}>
                  <span>Current QGSV</span>
                  <span>(200/200)</span>
                </div>
                <ProgressBar now={100} className={`${styles.horizontalProgressBar} custom-progress-bar`} />
                <span>Progress</span>
              </div>
              <div className={styles.prgWrps}>
                <div className={styles.labelWrapper}>
                  <span>Current QGSV</span>
                  <span>(200/200)</span>
                </div>
                <ProgressBar now={80} className={`${styles.horizontalProgressBar} custom-progress-bar`} />
                <span>Progress</span>
              </div>
              <div className={styles.prgWrps}>
                <div className={styles.labelWrapper}>
                  <span>Current QGSV</span>
                  <span>(200/200)</span>
                </div>
                <ProgressBar now={60} className={`${styles.horizontalProgressBar} custom-progress-bar`} />
                <span>Progress</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.cardBox} ${styles.cardBoxNoPadding} cardBox`}>
          <Tabs
            defaultActiveKey="sponsortree"
            id="trees"
            className={`${styles.tabCommon} tabCommonBox`}
          >
            <Tab eventKey="sponsortree" title={<>
              {/* <Image src="./../images/sponserTree.svg" alt="box" width={46} height={18} /> */}
              <svg width="46" height="17" viewBox="0 0 46 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M26.2035 2.63611L42.8364 2.6361H43.3636V10.0172H42.9682H42.8364V3.16333H33.4786V10.0428C34.966 10.2365 36.1146 11.5085 36.1146 13.0487C36.1146 14.723 34.7574 16.0802 33.0831 16.0802C31.4089 16.0802 30.0516 14.723 30.0516 13.0487C30.0516 11.4186 31.3382 10.089 32.9514 10.02V3.16333H26.2262C26.1572 4.77644 24.8276 6.06304 23.1975 6.06304C21.5674 6.06304 20.2378 4.77644 20.1688 3.16333H13.3126V10.0428C14.8 10.2365 15.9487 11.5085 15.9487 13.0487C15.9487 14.723 14.5914 16.0802 12.9171 16.0802C11.2429 16.0802 9.88562 14.723 9.88562 13.0487C9.88562 11.4186 11.1722 10.089 12.7854 10.02V3.16333H3.03167V10.0172C4.70586 10.0173 6.06304 11.3745 6.06304 13.0487C6.06304 14.723 4.70578 16.0802 3.03152 16.0802C1.35726 16.0802 0 14.723 0 13.0487C0 11.3744 1.35726 10.0172 3.03152 10.0172H2.50444V2.6361H3.03167V2.63611H20.1915C20.3853 1.14868 21.6573 0 23.1975 0C24.7378 0 26.0097 1.14868 26.2035 2.63611ZM42.9682 10.0172C44.6424 10.0172 45.9997 11.3744 45.9997 13.0487C45.9997 14.723 44.6424 16.0802 42.9682 16.0802C41.2939 16.0802 39.9367 14.723 39.9367 13.0487C39.9367 11.3744 41.2939 10.0172 42.9682 10.0172Z" fill="currentColor" />
              </svg>
              Sponsor Tree</>}>
              <ul className={styles.tabUl}>
                <li className={`${styles.tabLi} ${styles.tabLiTitle} tabLiTitle`}>
                  Type
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Personal Enrolled Volume</span>
                  <span>0</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Active Affiliates</span>
                  <span>39</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Active Customers</span>
                  <span>29</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Total Subscriptions</span>
                  <span>25</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Customer Retention Score</span>
                  <span>65%</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Legacy Tree Volume</span>
                  <span>835</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Total Tree Volume</span>
                  <span>835</span>
                </li>
              </ul>
            </Tab>
            <Tab eventKey="LegacyTreeUnilevel" title={<>
              {/* <Image src="./../images/legacyTree.svg" alt="box" width={46} height={18} /> */}
              <svg width="48" height="18" viewBox="0 0 48 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M26.8517 4.45269C26.5723 4.78204 26.2155 5.04361 25.8093 5.20926L28.7258 12.3681C29.0407 12.2398 29.3851 12.169 29.7461 12.169C31.2396 12.169 32.4504 13.3798 32.4504 14.8733C32.4504 16.3668 31.2396 17.5775 29.7461 17.5775C28.2526 17.5775 27.0419 16.3668 27.0419 14.8733C27.0419 13.902 27.554 13.0503 28.3228 12.5735L25.3776 5.34416C25.188 5.38625 24.991 5.40845 24.7887 5.40845C24.3258 5.40845 23.89 5.29212 23.5091 5.0871L19.5332 12.4905C20.3811 12.947 20.9575 13.8428 20.9575 14.8733C20.9575 16.3668 19.7467 17.5775 18.2532 17.5775C16.7597 17.5775 15.549 16.3668 15.549 14.8733C15.549 13.3798 16.7597 12.169 18.2532 12.169C18.5558 12.169 18.8467 12.2187 19.1183 12.3104L23.1301 4.84019C22.8407 4.61514 22.5982 4.33258 22.4199 4.00966L5.07319 13.5681C5.28685 13.955 5.40845 14.3999 5.40845 14.8733C5.40845 16.3668 4.19773 17.5775 2.70423 17.5775C1.21072 17.5775 0 16.3668 0 14.8733C0 13.3798 1.21072 12.169 2.70423 12.169C3.56218 12.169 4.32682 12.5686 4.82222 13.1917L22.2353 3.59679C22.1376 3.31735 22.0845 3.01699 22.0845 2.70423C22.0845 1.21072 23.2952 0 24.7887 0C26.2822 0 27.493 1.21072 27.493 2.70423C27.493 3.20849 27.3549 3.68052 27.1146 4.08459L42.9698 13.4932C43.4412 12.7003 44.3065 12.169 45.2958 12.169C46.7893 12.169 48.0001 13.3798 48.0001 14.8733C48.0001 16.3668 46.7893 17.5775 45.2958 17.5775C43.8023 17.5775 42.5916 16.3668 42.5916 14.8733C42.5916 14.5301 42.6555 14.2019 42.7721 13.8999L26.8517 4.45269Z" fill="currentColor" />
              </svg>
              Legacy Tree Unilevel</>}>

              <ul className={styles.tabUl}>
                <li className={`${styles.tabLi} ${styles.tabLiTitle} tabLiTitle`}>
                  Type
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Personal Enrolled Volume</span>
                  <span>0</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Active Affairs</span>
                  <span>39</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Active Customers</span>
                  <span>29</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Total Subscriptions</span>
                  <span>25</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Customer Retention Score</span>
                  <span>65%</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Legacy Tree Volume</span>
                  <span>835</span>
                </li>
                <li className={`${styles.tabLi}`}>
                  <span>Total Tree Volume</span>
                  <span>835</span>
                </li>
              </ul>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default HomePage
