'use client'

import styles from "./../home/Home.module.scss";
import BannerSection from '@/components/banner/banner';
import { Badge, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { Gear, Question } from '@phosphor-icons/react';
import TagBoxes from '@/components/common/tags/TagBoxes';
import rp from '@/public/images/rp.svg'
import rc from '@/public/images/rc.svg'
import grp from '@/public/images/grp.svg'
import lap from '@/public/images/lap.svg'

const CustomerHomePage = () => {
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
              <div className={`${styles.tagBoxsWrapper} ${styles.duelTagBoxWrapper}  ${styles.duelColumnWrapper}`}>
                <div className={styles.clipBoxHead}>
                  <Image src="./../images/largeAvatar.svg" alt="largeAvatar" width={90} height={90} className={styles.avtarImg} />
                  <span>Demo User</span>
                  <p>
                    <code>#624611</code> | demo
                  </p>
                </div>
                <Button className={styles.upgradeBtn}>
                  <Image src="./../images/upgradeAc.svg" alt="upgradeAc" width={22} height={23} className={styles.upgradeAc} />
                  Upgrade Account
                </Button>
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
                          <Image src="./../images/ac1.svg" alt="icon" width={46} height={46} className={styles.icnImg} />
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
                          <Image src="./../images/ac2.svg" alt="icon" width={46} height={46} className={styles.icnImg} />
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.smallBox}`}>
          <div className={`${styles.hightBox} ${styles.singleHightBox}`}>
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
          </div>
        </div>
      </div>
      <div className={`${styles.sectionGrids} ${styles.duelGrid}`}>
        <div className={`${styles.cardBox} cardBox`}>
          <div className={styles.titleLine}>
            Points Wallet
            <Link href="/points-wallet" className={styles.infoLink}>
              {/* <Image src="./../images/Question.svg" alt="Question" width={24} height={24} className={styles.icnImg} /> */}
              <Question size={24} weight="fill" />
            </Link>
          </div>
          <div className={styles.tagBoxsWrapper}>
            <TagBoxes topLineText="Reward Points" bottomLineText="282.01" rankIcon={rp.src} />
            <TagBoxes topLineText="Gifted Reward points" bottomLineText="282.01" rankIcon={grp.src} />
            <TagBoxes topLineText="Reward Credits" bottomLineText="10,029.75" rankIcon={rc.src} />
            <TagBoxes topLineText="Loyalty advantage Points" bottomLineText="282.01" rankIcon={lap.src} />
          </div>
        </div>
        <div className={`${styles.cardBox} cardBox`}>
          <div className={`${styles.titleLine} ${styles.centeredTitleLine}`}>
            <Image src="./../images/US.png" alt="icon" width={24} height={24} />
            USA Home Office
          </div>
          <div className={`${styles.tagBoxsWrapper} ${styles.tagBoxsWrapperCol}`}>
            <div className={styles.tagBoxs}>
              <span className={styles.iconWrapper}>
                <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.1" cx="23.946" cy="23" r="23" fill="#00D470" />
                  <g clipPath="url(#clip0_21806_36009)">
                    <path d="M18.0404 22.2288C17.9783 21.8282 17.946 21.4179 17.946 21C17.946 16.5817 21.5513 13 25.9986 13C30.446 13 34.0513 16.5817 34.0513 21C34.0513 21.9981 33.8673 22.9535 33.5312 23.8345C33.4614 24.0175 33.4265 24.109 33.4106 24.1804C33.3949 24.2512 33.3889 24.301 33.3872 24.3735C33.3855 24.4466 33.3954 24.5272 33.4152 24.6883L33.8178 27.9585C33.8614 28.3125 33.8832 28.4895 33.8243 28.6182C33.7727 28.731 33.681 28.8205 33.5671 28.8695C33.4371 28.9254 33.2607 28.8995 32.9078 28.8478L29.7225 28.3809C29.5562 28.3565 29.473 28.3443 29.3973 28.3448C29.3224 28.3452 29.2705 28.3507 29.1972 28.3661C29.1231 28.3817 29.0284 28.4172 28.839 28.4881C27.9557 28.819 26.9985 29 25.9986 29C25.5804 29 25.1697 28.9683 24.7687 28.9073M19.5776 33C22.5425 33 24.946 30.5376 24.946 27.5C24.946 24.4624 22.5425 22 19.5776 22C16.6127 22 14.2092 24.4624 14.2092 27.5C14.2092 28.1106 14.3063 28.6979 14.4856 29.2467C14.5614 29.4787 14.5993 29.5947 14.6117 29.6739C14.6247 29.7567 14.627 29.8031 14.6221 29.8867C14.6175 29.9668 14.5975 30.0573 14.5574 30.2383L13.946 33L16.9408 32.591C17.1043 32.5687 17.186 32.5575 17.2574 32.558C17.3326 32.5585 17.3725 32.5626 17.4462 32.5773C17.5161 32.5912 17.6202 32.6279 17.8283 32.7014C18.3766 32.8949 18.9652 33 19.5776 33Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_21806_36009">
                      <rect width="24" height="24" fill="white" transform="translate(11.946 11)" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span className={styles.bottomLine}>Phone</span>
              <span className={styles.topLine}>1-877-466-6730</span>
            </div>
            <div className={styles.tagBoxs}>
              <span className={styles.iconWrapper}>
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.1" cx="23" cy="23" r="23" fill="#00D470" />
                  <path d="M23 24C24.6569 24 26 22.6569 26 21C26 19.3431 24.6569 18 23 18C21.3431 18 20 19.3431 20 21C20 22.6569 21.3431 24 23 24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23 33C27 29 31 25.4183 31 21C31 16.5817 27.4183 13 23 13C18.5817 13 15 16.5817 15 21C15 25.4183 19 29 23 33Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className={styles.bottomLine}>Home Office</span>
              <span className={styles.topLine}>871 Coronado Center Drive Henderson, NV 89052</span>
            </div>
            <div className={styles.tagBoxs}>
              <span className={styles.iconWrapper}>
                <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.1" cx="23.054" cy="23" r="23" fill="#00D470" />
                  <path d="M13 18L21.1649 23.7154C21.8261 24.1783 22.1567 24.4097 22.5163 24.4993C22.8339 24.5785 23.1661 24.5785 23.4837 24.4993C23.8433 24.4097 24.1739 24.1783 24.8351 23.7154L33 18M17.8 31H28.2C29.8802 31 30.7202 31 31.362 30.673C31.9265 30.3854 32.3854 29.9265 32.673 29.362C33 28.7202 33 27.8802 33 26.2V19.8C33 18.1198 33 17.2798 32.673 16.638C32.3854 16.0735 31.9265 15.6146 31.362 15.327C30.7202 15 29.8802 15 28.2 15H17.8C16.1198 15 15.2798 15 14.638 15.327C14.0735 15.6146 13.6146 16.0735 13.327 16.638C13 17.2798 13 18.1198 13 19.8V26.2C13 27.8802 13 28.7202 13.327 29.362C13.6146 29.9265 14.0735 30.3854 14.638 30.673C15.2798 31 16.1198 31 17.8 31Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className={styles.bottomLine}>Email</span>
              <span className={styles.topLine}>Support@o2global.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerHomePage
