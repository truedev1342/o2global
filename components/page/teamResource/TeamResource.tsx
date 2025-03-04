'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './TeamResource.module.scss';
import { Button, Image } from 'react-bootstrap';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Link from 'next/link';
import { CaretDown } from '@phosphor-icons/react';

interface DropdownProps {
    buttonLabel: string;
    options: { label: string; link: string }[];
    buttonRef: React.RefObject<HTMLButtonElement>;
    dropdownRef: React.RefObject<HTMLDivElement>;
    isVisible: boolean;
    toggleVisibility: () => void;
}
interface CardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink?: string;
    isDownload?: boolean;
}
const Dropdown: React.FC<DropdownProps> = ({ buttonLabel, options, buttonRef, dropdownRef, isVisible, toggleVisibility }) => {
    return (
        <div className={styles.dropDownMainBox}>
            <Button ref={buttonRef} variant="outline-primary" className={`${styles.dropDownBtn} dropDownCustom`} onClick={toggleVisibility}>
                <span>{buttonLabel}</span>
                <CaretDown size={24} />
            </Button>

            {isVisible && (
                <div ref={dropdownRef} className={`${styles.dropDownOuter} dropDownOuter`}>
                    <ul className={styles.dropUl}>
                        {options.map(({ label, link }, index) => (
                            <li key={index} className={styles.dropItem}>
                                <Link href={link} className={`${styles.itemLink} notificationItems`}>
                                    <span className={styles.titleB}>{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const InfoCard: React.FC<CardProps> = ({
    title,
    description,
    buttonText,
    buttonLink = "#",
    isDownload = false,
}) => {
    return (
        <div className={`${styles.cardBoxWrp}`}>
            <div className={`${styles.imgWrp}`}>
                <Image
                    src="./../images/bannerImg.jpg"
                    alt="Company Logo"
                    width={300}
                    height={300}
                    className={`${styles.cardImage}`}
                />
            </div>
            <div className={`${styles.cardInfo}`}>
                <h3 className={`${styles.cardTitle} cardTitleLine`}>{title}</h3>
                <p className={`${styles.cardDescription}`}>{description}</p>
                <Button
                    href={buttonLink}
                    className={`${styles.cardBtn}`}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

const TeamResourcePage: React.FC = () => {
    const selectDropdownRef = useRef<HTMLDivElement | null>(null);
    const selectBtnRef = useRef<HTMLButtonElement | null>(null);
    const [showSelect, setShowSelect] = useState(false);

    const brandDropdownRef = useRef<HTMLDivElement | null>(null);
    const brandBtnRef = useRef<HTMLButtonElement | null>(null);
    const [showBrand, setShowBrand] = useState(false);

    const typeDropdownRef = useRef<HTMLDivElement | null>(null);
    const typeBtnRef = useRef<HTMLButtonElement | null>(null);
    const [showType, setShowType] = useState(false);

    useOutsideClick({ buttonRef: selectBtnRef, dropdownRef: selectDropdownRef, setState: setShowSelect });
    useOutsideClick({ buttonRef: brandBtnRef, dropdownRef: brandDropdownRef, setState: setShowBrand });
    useOutsideClick({ buttonRef: typeBtnRef, dropdownRef: typeDropdownRef, setState: setShowType });

    const cardData: CardProps[] = [
        {
            title: "Heading title goes here",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttonText: "Watch Now",
            isDownload: false,
        },
        {
            title: "Heading title goes here",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttonText: "Download",
            isDownload: true,
        },
        {
            title: "Heading title goes here",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttonText: "Download",
            isDownload: true,
        },
        {
            title: "Heading title goes here",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttonText: "Watch Now",
            isDownload: false,
        },
    ];

    return (
        <div className={`${styles.mainBox}`}>
            <div className={`${styles.dropDownCommonBox} ${styles.commonBoxCard}`}>
                <Dropdown
                    buttonLabel="Select Language"
                    options={[
                        { label: 'US - English', link: '#' },
                        { label: 'US - Spanish', link: '#' },
                        { label: 'US - French', link: '#' },
                    ]}
                    buttonRef={selectBtnRef}
                    dropdownRef={selectDropdownRef}
                    isVisible={showSelect}
                    toggleVisibility={() => setShowSelect((prev) => !prev)}
                />

                <Dropdown
                    buttonLabel="All Brands"
                    options={[
                        { label: 'Brands 1', link: '#' },
                        { label: 'Brands 2', link: '#' },
                        { label: 'Brands 3', link: '#' },
                    ]}
                    buttonRef={brandBtnRef}
                    dropdownRef={brandDropdownRef}
                    isVisible={showBrand}
                    toggleVisibility={() => setShowBrand((prev) => !prev)}
                />
                <Dropdown
                    buttonLabel="All Asset Types"
                    options={[
                        { label: 'Business Tool', link: '#' },
                        { label: 'Logo', link: '#' },
                        { label: 'Presentation', link: '#' },
                        { label: 'Product Sheet', link: '#' },
                        { label: 'Video', link: '#' },
                        { label: 'AR', link: '#' },
                    ]}
                    buttonRef={typeBtnRef}
                    dropdownRef={typeDropdownRef}
                    isVisible={showType}
                    toggleVisibility={() => setShowType((prev) => !prev)}
                />
            </div>

            <div className={`${styles.cardBoxMainWrapper}`}>
                {cardData.map((card, index) => (
                    <InfoCard key={index} {...card} />
                ))}
            </div>
        </div>
    );
};

export default TeamResourcePage;
