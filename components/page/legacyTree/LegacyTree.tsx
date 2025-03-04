'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './../sponserTree/SponserTree.module.scss';
import { DotsThreeVertical, Eye, MagnifyingGlass, MagnifyingGlassMinus, MagnifyingGlassPlus, X } from '@phosphor-icons/react';
import { Button, Image } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import { usePageContext } from '@/context/PageContext';

interface CardData {
    id: number;
    name: string;
    level: string;
    section: string;
    currentRank: string;
    payRank: string;
    avatarUrl: string;
    status: 'online' | 'offline' | 'away';
}

const cardDataList: CardData[] = [
    {
        id: 1,
        name: 'Albert Flores',
        level: '#6246112134530',
        section: 'Travel',
        currentRank: 'Affiliate',
        payRank: 'Affiliate',
        avatarUrl: './../images/avatar.png',
        status: 'online',
    },
    {
        id: 2,
        name: 'Jenny Wilson',
        level: '#2345678901234',
        section: 'Business',
        currentRank: 'Affiliate',
        payRank: 'Manager',
        avatarUrl: './../images/avatar.png',
        status: 'offline',
    },
    {
        id: 3,
        name: 'Cody Fisher',
        level: '#9876543210123',
        section: 'Finance',
        currentRank: 'Customer',
        payRank: 'Affiliate',
        avatarUrl: './../images/avatar.png',
        status: 'away',
    },
    {
        id: 4,
        name: 'Robert Fox',
        level: '#3456789012345',
        section: 'Sales',
        currentRank: 'Customer',
        payRank: 'Affiliate',
        avatarUrl: './../images/avatar.png',
        status: 'online',
    },
    {
        id: 5,
        name: 'Kristin Watson',
        level: '#8765432101234',
        section: 'Marketing',
        currentRank: 'Customer',
        payRank: 'Affiliate',
        avatarUrl: './../images/avatar.png',
        status: 'away',
    },
    {
        id: 6,
        name: 'Abby Watson',
        level: '#8765432101234',
        section: 'Marketing',
        currentRank: 'Customer',
        payRank: 'Affiliate',
        avatarUrl: './../images/avatar.png',
        status: 'away',
    }
];
interface OptionBoxWrapperProps {
    card: CardData;
    onClose: () => void;
    isDropdownOpen: boolean;
    isMobile?: boolean;
}

const OptionBoxWrapper: React.FC<OptionBoxWrapperProps> = ({ card, onClose, isDropdownOpen, isMobile }) => {
    return (
        isDropdownOpen && (
            <div className={`${styles.treedropDownOuter} treedropDownOuter dropDownOuter ${isMobile ? 'treedropDownOuterMobile' : ''}`}>
                <Button variant='link' className={`${styles.closeBtn} closeBtn`} onClick={onClose}>
                    <X size={24} weight="bold" />
                </Button>
                <div className={`${styles.headBox} headBox`}>
                    <Image
                        src={card.avatarUrl}
                        alt={card.name}
                        width={90}
                        height={90}
                        className={`${styles.avatarImg} avatarImg`}
                    />
                    <span className={`${styles.nameWrapper} nameWrapper`}>
                        <span className={`${styles.name} name`}>{card.name}</span>
                        <span className={`${styles.level} level`}>{card.level}</span>
                    </span>
                </div>
                <div className={`${styles.infoBox} infoBox`}>
                    {['Current Rank', 'Pay Rank', 'Enroller', 'Personal Order', 'Group Volume', 'Join Date'].map((label) => (
                        <span key={label} className={`${styles.linesWrp} linesWrp`}>
                            <span className={`${styles.rankLabel} rankLabel`}>{label}</span>
                            <span className={`${styles.rankName} rankName`}>{card.payRank}</span>
                        </span>
                    ))}
                </div>
            </div>
        )
    );
};

const Card: React.FC<{ card: CardData, onToggleDropdown: (id: number, overlayState?: boolean) => void, isDropdownOpen: boolean, isMobile: boolean }> = ({ card, onToggleDropdown, isDropdownOpen, isMobile }) => {
    return (
        <div key={card.id} className={styles.cardBox}>
            <div className={`${styles.cardBoxInner} cardBoxInner`}>
                <div className={`${styles.cardBoxInnerLine} cardBoxInnerLine`}>
                    <div className={styles.headBar}>
                        <span className={styles.avatarBox}>
                            <Image
                                src={card.avatarUrl}
                                alt={card.name}
                                width={90}
                                height={90}
                                className={styles.avatarImg}
                            />
                            <span className={`${styles.status} ${styles[card.status]}`}></span>
                        </span>
                        <Button
                            variant="link"
                            className={`${styles.dropDownBtn} ${styles.levelInfoBtn} levelInfoBtn dropDownCustom`}
                            onClick={() => onToggleDropdown(card.id, true)}
                        >
                            <DotsThreeVertical size={24} weight="bold" />
                        </Button>
                    </div>
                    <div className={styles.infoBar}>
                        <span className={`${styles.name} labelName`}>{card.name}</span>
                        <span className={`${styles.level} labelLevel`}>{card.level}</span>
                        <span className={`${styles.section} labelSection`}>{card.section}</span>
                    </div>
                    <div className={`${styles.rankBar} rankBar`}>
                        <span className={styles.rankBox}>
                            <span className={`${styles.rankLabel} rankLabel`}>Current Rank</span>
                            <span className={`${styles.rankName} rankName`}>{card.currentRank}</span>
                        </span>
                        <span className={styles.rankBox}>
                            <span className={`${styles.rankLabel} rankLabel`}>Pay Rank</span>
                            <span className={`${styles.rankName} rankName`}>{card.payRank}</span>
                        </span>
                    </div>
                </div>
            </div>
            {!isMobile && (
                <OptionBoxWrapper card={card} isDropdownOpen={isDropdownOpen} onClose={() => onToggleDropdown(card.id, false)} />
            )}
            <Button variant="link" className={`${styles.eyeIcon} eyeIcon`}>
                <Eye size={24} />
            </Button>
        </div>
    );
};

const LegacyTreePage: React.FC<{
}> = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [selectedDropdownId, setSelectedDropdownId] = useState<number | null>(null);
    const [selectedDataForMobile, setSelectedDataForMobile] = useState<any>(null);

    const { setOpenOvarlay, openOverlay } = usePageContext()
    // Listen to window resize events
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1099);
        };

        window.addEventListener('resize', handleResize);

        // Set initial state based on screen size
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Start dragging
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        dragStart.current = { x: clientX - position.x, y: clientY - position.y };
        setDragging(true);
    };

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
        if (!dragging) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setPosition({ x: clientX - dragStart.current.x, y: clientY - dragStart.current.y });
    };

    const handleDragEnd = () => {
        setDragging(false);
    };

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.2));

    const handleDropdownToggle = (cardId: number | null, overlayState = true) => {
        const cardData = cardDataList.find((card) => card.id === cardId);

        setSelectedDataForMobile(cardData)
        setSelectedDropdownId((prevId) => (prevId === cardId ? null : cardId));
        if (isMobile) {
            setOpenOvarlay(overlayState)
        }
    };

    // Attach and remove event listeners for drag
    useEffect(() => {
        // Handle mousemove and touchmove
        const handleMove = (e: MouseEvent | TouchEvent) => handleDragMove(e);

        // Handle mouseup and touchend
        const handleEnd = () => handleDragEnd();

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchend', handleEnd);

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [dragging]);

    return (
        <section className={styles.mainBox}>
            {isMobile && (
                createPortal(<OptionBoxWrapper card={selectedDataForMobile} isDropdownOpen={selectedDropdownId === selectedDataForMobile?.id} onClose={() => handleDropdownToggle(selectedDataForMobile.id, false)} isMobile={true} />, document.body)
            )}
            <div className={styles.canvasBoxMainWrapper} onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
                <div className={styles.canvasHeader}>
                    <div className={styles.searchBox}>
                        <span className={`${styles.searchWrpper} searchWrpperInput`}>
                            <MagnifyingGlass size={24} />
                            <input type="text" placeholder="Search" />
                        </span>
                    </div>
                    <div className={styles.levelBtnWrpper}>
                        <Button className={`${styles.levelBtn} levelBtn`}>Top</Button>
                        <Button className={`${styles.levelBtn} ${styles.lastLevel} levelBtn lastLevel`}>Up1 Level</Button>
                    </div>
                    {!isMobile && (
                        <div className={styles.legandsWrapper}>
                            <span className={`${styles.legands} ${styles.green}`}>Affiliate</span>
                            <span className={`${styles.legands} ${styles.blue}`}>Customer</span>
                            <span className={`${styles.legands} ${styles.cyne}`}>Active</span>
                            <span className={`${styles.legands} ${styles.red}`}>Inactive</span>
                            <span className={`${styles.legands} ${styles.orange}`}>On Hold</span>
                        </div>
                    )}
                </div>
                {isMobile && (
                    <>
                        <div className={styles.legandsWrapper}>
                            <span className={`${styles.legands} ${styles.green}`}>Affiliate</span>
                            <span className={`${styles.legands} ${styles.blue}`}>Customer</span>
                            <span className={`${styles.legands} ${styles.cyne}`}>Active</span>
                            <span className={`${styles.legands} ${styles.red}`}>Inactive</span>
                            <span className={`${styles.legands} ${styles.orange}`}>On Hold</span>
                        </div>
                        <div className={styles.zoomControls}>
                            <Button className={`${styles.zoomBtn} zoomBtn`} variant='link' onClick={handleZoomIn}>
                                <MagnifyingGlassPlus size={20} weight="bold" />
                            </Button>
                            <Button className={`${styles.zoomBtn} zoomBtn`} variant='link' onClick={handleZoomOut}>
                                <MagnifyingGlassMinus size={20} weight="bold" />
                            </Button>
                        </div>
                    </>
                )}
                <div className={`${styles.canvasInnerBox} canvasInnerBox`}>
                    {!isMobile && (
                        <div className={styles.zoomControls}>
                            <Button className={`${styles.zoomBtn} zoomBtn`} variant='link' onClick={handleZoomIn}>
                                <MagnifyingGlassPlus size={20} weight="bold" />
                            </Button>
                            <Button className={`${styles.zoomBtn} zoomBtn`} variant='link' onClick={handleZoomOut}>
                                <MagnifyingGlassMinus size={20} weight="bold" />
                            </Button>
                        </div>
                    )}
                    <div className={styles.levelMainWrapper} style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})` }}>
                        <div className={styles.levelWrapper}>
                            <Card card={cardDataList[0]} onToggleDropdown={handleDropdownToggle} isDropdownOpen={selectedDropdownId === cardDataList[0].id} isMobile={isMobile} />
                        </div>
                        <div className={styles.levelWrapper}>
                            {cardDataList.slice(1).map((card) => (
                                <Card key={card.id} card={card} onToggleDropdown={handleDropdownToggle} isDropdownOpen={selectedDropdownId === card.id} isMobile={isMobile} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LegacyTreePage;
