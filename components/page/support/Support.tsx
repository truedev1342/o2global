'use client';

import React from 'react';
import styles from "./Support.module.scss";
import { Image } from 'react-bootstrap';
import { ChatsCircle, Envelope, MapPin } from '@phosphor-icons/react';

const SupportPage: React.FC = () => {
    interface InfoCardProps {
        title: string;
        content: string;
        icon: React.ReactNode;
    }
    const infoItems = [
        {
            title: "Phone",
            content: "1-877-466-6730",
            icon: <ChatsCircle size={36} />,
        },
        {
            title: "Home Office",
            content: "871 Coronado Center Drive, Henderson, NV 89052",
            icon: <MapPin size={36} />,
        },
        {
            title: "Email",
            content: "Support@o2global.com",
            icon: <Envelope size={36} />,
        },
    ];

    const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon }) => {
        return (
            <div className={styles.boxesWrpper}>
                <div className={styles.iconWrppar}>
                    {icon}
                </div>
                <h3 className={styles.boxTitle}>{title}</h3>
                <p className={styles.boxPara}>{content}</p>
            </div>
        );
    };
    return (
        <section className={styles.mainBox}>
            <div className={styles.bannerBox}>
                <Image src="./../images/supportBanner.png" alt="banner" width={1280} height={640} className={styles.bannerImg} />
            </div>
            <div className={styles.cardBox}>
                <Image src="./../images/US.png" alt="banner" width={24} height={24} className={styles.flgIcon} />
                <h1 className={styles.titleMain}>
                    USA Home Office
                </h1>
                <div className={styles.boxOuter}>
                    {infoItems.map((item, index) => (
                        <InfoCard
                            key={index}
                            title={item.title}
                            content={item.content}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.cardBox}>
                <h2 className={styles.titleMain}>
                    Stay Connected
                </h2>
                <div className={styles.socialIconWrapper}>
                    <Image src="./../images/fbIcn.svg" alt="social icon" width={50} height={50} className={styles.socialIcon} />
                    <Image src="./../images/teleIcon.svg" alt="social icon" width={50} height={50} className={styles.socialIcon} />
                    <Image src="./../images/ytIcon.svg" alt="social icon" width={50} height={50} className={styles.socialIcon} />
                </div>
            </div>
        </section>
    );
};

export default SupportPage;
