'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from "./SponsorList.module.scss";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Image } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import { CaretDown, ChatTeardropDots, MagnifyingGlass } from '@phosphor-icons/react';
import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Link from 'next/link';
import { myteamApi } from '@/utils/services/api/myteamApi';

interface TankData {
    id: number;
    level: number;
    userName: string;
    name: string;
    rank: string;
    date: string;
    country: string;
    currentRank: string;
    highestRank: string;
    subscription: string;
    pv: string;
    evTree: string;
    rankQu: string;
    currentRankactive?: boolean;
    highestRankactive?: boolean;
}
interface StatItem {
    title: string;
    value: number;
}
const NameBox: React.FC<{ name: string; rank: string; date: string }> = ({ name, rank, date }) => (
    <div className={styles.nameBox}>
        <Image src="./../images/avatar.png" alt="avatar" width={48} height={48} className={styles.avatarImg} />
        <span className={styles.nameWrps}>
            <span>{name}</span>
            <span className={styles.rankWrps}>
                <span>{rank}</span>
                <span>{date}</span>
            </span>
        </span>
        <Button variant="link" className={styles.messageBtn}>
            <ChatTeardropDots size={24} />
        </Button>
    </div>
);

const CountryBox: React.FC<{ country: string }> = ({ country }) => (
    <Image src="./../images/usFlag.svg" alt="Country Flag" width={45} height={45} className={styles.countryImg} />
);

const CrankBox: React.FC<{ currentRank: string; currentRankactive?: boolean }> = ({ currentRank, currentRankactive }) => (
    <div className={`${styles.rankBoxBg} ${currentRankactive ? styles.active : ''}`}>{currentRank}</div>
);

const HrankBox: React.FC<{ highestRank: string; highestRankactive?: boolean }> = ({ highestRank, highestRankactive }) => (
    <div className={`${styles.rankBoxBg} ${highestRankactive ? styles.active : ''}`}>{highestRank}</div>
);

const SubBox: React.FC<{ subscription: string }> = ({ subscription }) => (
    <div className={`${styles.subscriptionText}`}>{subscription}</div>
);

const RankQuBox: React.FC<{ rankQu: string }> = ({ rankQu }) => (
    <Button  className={`${styles.commonActionBtn} ${styles.commonActionBtnsm} commonActionBtn commonActionBtnsm`}>{rankQu}</Button>
);

createTheme('solarized', {
    background: {
        default: 'transparent',
    },
});

const FilterComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [showRank, setShowRank] = useState(false);
    const [showPayRank, setShowPayRank] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectDropdownRef = useRef<HTMLDivElement | null>(null);
    const selectBtnRef = useRef<HTMLButtonElement | null>(null);
    const payRankDropdownRef = useRef<HTMLDivElement | null>(null);
    const payRankBtnRef = useRef<HTMLButtonElement | null>(null);
    const rankDropdownRef = useRef<HTMLDivElement | null>(null);
    const rankBtnRef = useRef<HTMLButtonElement | null>(null);

    useOutsideClick({
        buttonRef: selectBtnRef,
        dropdownRef: selectDropdownRef,
        setState: setShowSelect,
    });
    useOutsideClick({
        buttonRef: payRankBtnRef,
        dropdownRef: payRankDropdownRef,
        setState: setShowPayRank,
    });
    useOutsideClick({
        buttonRef: rankBtnRef,
        dropdownRef: rankDropdownRef,
        setState: setShowRank,
    });

    const handleDateChange = (range: [Date, Date] | null) => {
        if (range) {
            console.log(`Selected Range: ${range[0].toLocaleDateString()} to ${range[1].toLocaleDateString()}`);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`${styles.headerBox} d-flex align-items-center`}>
            <div className={styles.filterSearching}>
                <div className={styles.searchBox}>
                    <span className={`${styles.searchWrpper} searchWrpperInput`}>
                        <MagnifyingGlass size={24} />
                        <input type="text" placeholder="Search" />
                    </span>
                </div>
                <DateRangePicker
                    onChange={handleDateChange}
                    placeholder="Start date End date"
                    className='rangeDatePickerWrapper'
                />
                <div className={styles.dropdownBoxMain}>
                    <div className={styles.dropDownWrapperBox}>
                        <Button
                            ref={selectBtnRef}
                            variant="outline-primary"
                            className={`${styles.dropDownBtn} dropDownCustom `}
                            onClick={() => setShowSelect((prev) => !prev)}
                        >
                            <span>Select Status</span>
                            <CaretDown size={24} />
                        </Button>
                        {showSelect && (
                            <div ref={selectDropdownRef} className={styles.dropDownOuter}>
                                <ul className={styles.dropUl}>
                                    {['Active', 'Inactive', 'Closed', 'Purged'].map((status) => (
                                        <li key={status} className={styles.dropItem}>
                                            <Link href="#" className={styles.itemLink}>
                                                <span className={styles.titleB}>{status}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className={styles.dropDownWrapperBox}>
                        <Button
                            ref={payRankBtnRef}
                            variant="outline-primary"
                            className={`${styles.dropDownBtn} dropDownCustom `}
                            onClick={() => setShowPayRank((prev) => !prev)}
                        >
                            <span>Select Pay Rank</span>
                            <CaretDown size={24} />
                        </Button>
                        {showPayRank && (
                            <div ref={payRankDropdownRef} className={styles.dropDownOuter}>
                                <ul className={styles.dropUl}>
                                    {['Active', 'Inactive', 'Closed', 'Purged'].map((status) => (
                                        <li key={status} className={styles.dropItem}>
                                            <Link href="#" className={styles.itemLink}>
                                                <span className={styles.titleB}>{status}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className={styles.dropDownWrapperBox}>
                        <Button
                            ref={rankBtnRef}
                            variant="outline-primary"
                            className={`${styles.dropDownBtn} dropDownCustom `}
                            onClick={() => setShowRank((prev) => !prev)}
                        >
                            <span>Select Rank</span>
                            <CaretDown size={24} />
                        </Button>
                        {showRank && (
                            <div ref={rankDropdownRef} className={styles.dropDownOuter}>
                                <ul className={styles.dropUl}>
                                    {['Active', 'Inactive', 'Closed', 'Purged'].map((status) => (
                                        <li key={status} className={styles.dropItem}>
                                            <Link href="#" className={styles.itemLink}>
                                                <span className={styles.titleB}>{status}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <Button variant="primary" className={styles.searchBtn}>Search</Button>
        </div>
    );
};

const SponsorListPage: React.FC = () => {
    const [data, setData] = useState<TankData[]>([]);
    const [filteredData, setFilteredData] = useState<TankData[]>([]);
    const [loading, setLoading] = useState(true);
    const [stat, setStat] = useState<StatItem[] | null>(null);

    useEffect(() => {
        const fetchStat = async () => {
            const response = await myteamApi.getStat();
            if (response.success == true) {
                setStat(
                    [
                        { title: "Personally Enrolled Affiliates", value: response.data.personal_affiliates },
                        { title: "Personally Enrolled Customers", value: response.data.personal_preferreds },
                        { title: "Total Affiliates", value: response.data.total_affiliates },
                        { title: "Total Customers", value: response.data.total_preferreds },
                    ]
                );
            }
        }
        const fetchData = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const fetchedData: TankData[] = [
                {
                    id: 123456789123,
                    level: 1,
                    userName: 'gitrdone',
                    name: 'Doug Wilkinson',
                    rank: 'Affiliate',
                    date: '10/25/24',
                    country: '',
                    currentRank: 'Affiliate',
                    currentRankactive: true,
                    highestRankactive: false,
                    highestRank: 'Intern 3',
                    subscription: 'No',
                    pv: '599',
                    evTree: '599',
                    rankQu: 'Check',
                },
                {
                    id: 234567891234,
                    level: 2,
                    userName: 'gitrdone',
                    name: 'Doug Wilkinson',
                    rank: 'Affiliate',
                    date: '10/25/24',
                    country: '',
                    currentRank: 'Affiliate',
                    currentRankactive: false,
                    highestRankactive: false,
                    highestRank: 'Intern 3',
                    subscription: 'No',
                    pv: '599',
                    evTree: '599',
                    rankQu: 'Check',
                },
            ];
            setData(fetchedData);
            setFilteredData(fetchedData);
            setLoading(false);
        };
        

        fetchStat();

        fetchData();
    }, []);

    const columns = [
        { name: 'User ID', selector: (row: TankData) => row.id, sortable: true},
        { name: 'Level', selector: (row: TankData) => row.level, sortable: false, width: '80px'},
        { name: 'Username', selector: (row: TankData) => row.userName, sortable: false,},
        { name: 'Name', cell: (row: TankData) => <NameBox {...row} />, sortable: true, width: '250px'},
        { name: 'Country', cell: (row: TankData) => <CountryBox {...row} />, sortable: false, width: '100px' },
        { name: 'Current Rank', cell: (row: TankData) => <CrankBox {...row} />, sortable: false, width: '120px'},
        { name: 'Paid Rank', cell: (row: TankData) => <HrankBox {...row} />, sortable: false, width: '120px'},
        { name: 'Subscription', cell: (row: TankData) => <SubBox {...row} />, sortable: false, },
        { name: 'PV', selector: (row: TankData) => row.pv, sortable: false, width: '90px'},
        { name: 'Enroller Tree BV', selector: (row: TankData) => row.evTree, sortable: false, },
        { name: 'Rank Qualification', cell: (row: TankData) => <RankQuBox {...row} />, sortable: false, width: '160px'},
    ];

    return (
        <section className={styles.mainBox}>
            <div className={styles.tableBoxMain}>
                <div className={styles.cardBoxWrapper}>
                    {stat?.map(({ title, value }, index) => (
                        <InfoCard key={index} title={title} value={value} />
                    ))}
                </div>
                <div className={`${styles.filterBox}`}>
                    <FilterComponent />
                </div>
                <div className={`${styles.tableDataBox} customtableDataBox`}>
                    <span className={`${styles.headBar}`}>
                        <h5 className={styles.tableTitle}>Enrollment</h5>
                        <Button variant="link">travel</Button>
                    </span>
                    {loading ? (
                        <SkeletonLoader rows={6} columns={columns.length} />
                    ) : (
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            highlightOnHover
                            responsive
                            theme="solarized"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

const InfoCard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
    <div className={`${styles.dashCard} dashCard`}>
        <span className={`${styles.titleLine} titleLine`}>{title}</span>
        <span className={`${styles.valueLine} valueLine`}>{value}</span>
    </div>
);

const SkeletonLoader: React.FC<{ rows: number; columns: number }> = ({ rows, columns }) => (
    <div style={{ margin: '20px 0', padding: '15px' }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '16px', marginBottom: '10px' }}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                    <Skeleton key={colIndex} height={30} />
                ))}
            </div>
        ))}
    </div>
);

export default SponsorListPage;
