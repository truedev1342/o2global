'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Form, Overlay, Popover } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './HoldingTanks.module.scss';
import Link from 'next/link';
import { CaretDown, Info } from '@phosphor-icons/react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface TankData {
    id: number;
    name: string;
    pv: string;
    clearDate: string;
    timeLeft: string;
    positions: string;
    placementSponsor: string;
    legPosition: string;
    action: string;
}

const ActionButton: React.FC<{ action: string }> = ({ action }) => {
    return <Button className={`${styles.commonActionBtn} ${styles.commonActionBtnsm} commonActionBtn commonActionBtnsm`}>{action}</Button>;
};
const TimeLeftCount: React.FC<{ timeLeft: string }> = ({ timeLeft }) => {
    return <div className={`${styles.timeLeftCountWrp} timeLeftCountWrp`}>
        <span>
            Day <br /> <small>26</small>
        </span>
        <span>
            Hr <br /> <small>14</small>
        </span>
        <span>
            Min <br /> <small>55</small>
        </span>
        <span>
            Sec <br /> <small>59</small>
        </span>
    </div>;
};
const PositionDropDown: React.FC<{ positions: string }> = () => {
    const positionDropdownRef = useRef<HTMLDivElement | null>(null)
    const positionBtnRef = useRef<HTMLButtonElement | null>(null)
    const [showPosition, setShowPosition] = useState(false)

    useOutsideClick<
        HTMLButtonElement,
        HTMLDivElement,
        boolean
    >({
        buttonRef: positionBtnRef,
        dropdownRef: positionDropdownRef,
        setState: setShowPosition
    })
    const [target, setTarget] = useState<any>(null);
    return <>
        <Button onClick={(e) => {
            setShowPosition((prev) => !prev)
            setTarget(e.target)
        }} ref={positionBtnRef} className={`${styles.dropDownBtn} dropDownBtn`}>
            Enter Placement Spot {' '}
            <CaretDown size={18} />
        </Button>
        <Overlay show={showPosition} target={target} placement='bottom' ref={positionDropdownRef}>
            <Popover show={showPosition} id="popover-basic" >
                <div className={`${styles.dropDownOuter} ${styles.dropDownOuterPosition} dropDownOuter dropDownOuterPosition`}>
                    <ul className={`${styles.dropUl} ${styles.dropUlGrid}`}>
                        <li className={`${styles.dropItem} ${styles.unread} unread `}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Position 12
                            </Link>
                        </li>
                        <li className={styles.dropItem}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Position 13
                            </Link>
                        </li>
                        <li className={styles.dropItem}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Position 14
                            </Link>
                        </li>
                        <li className={styles.dropItem}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Position 15
                            </Link>
                        </li>
                        <li className={styles.dropItem}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Position 16
                            </Link>
                        </li>
                    </ul>
                </div>
            </Popover>
        </Overlay>
    </>;
};
const LegPositionDropDown: React.FC<{ positions: string }> = () => {

    const legpositionDropdownRef = useRef<HTMLDivElement | null>(null)
    const legpositionBtnRef = useRef<HTMLButtonElement | null>(null)
    const [showLegPosition, setShowLegPosition] = useState(false)

    useOutsideClick<
        HTMLButtonElement,
        HTMLDivElement,
        boolean
    >({
        buttonRef: legpositionBtnRef,
        dropdownRef: legpositionDropdownRef,
        setState: setShowLegPosition
    })
    const [target, setTarget] = useState<any>(null);
    return <>
        <Button onClick={(e) => {
            setShowLegPosition((prev) => !prev)
            setTarget(e.target)
        }} ref={legpositionBtnRef} className={`${styles.dropDownBtn} dropDownBtn`}>
            Position {' '}
            <CaretDown size={18} />
        </Button>
        <Overlay show={showLegPosition} target={target} placement='bottom' ref={legpositionDropdownRef}>
            <Popover show={showLegPosition} id="popover-basic" >
                <div className={`${styles.dropDownOuter} ${styles.dropDownOuterPosition} dropDownOuter dropDownOuterPosition`}>
                    <ul className={`${styles.dropUl} ${styles.dropUlGrid}`}>
                        <li className={`${styles.dropItem} ${styles.unread} unread `}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Position 1
                            </Link>
                        </li>
                        <li className={styles.dropItem}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Position 2
                            </Link>
                        </li>
                        <li className={styles.dropItem}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Position 3
                            </Link>
                        </li>
                        <li className={styles.dropItem}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Position 4
                            </Link>
                        </li>
                        <li className={styles.dropItem}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Position 5
                            </Link>
                        </li>
                    </ul>
                </div>
            </Popover>
        </Overlay>
    </>;
};

createTheme('solarized', {
    background: {
        default: 'transparent',
    },
});

const FilterComponent: React.FC<{
    onFilterName: (value: string) => void;
    onFilterId: (value: string) => void;
    filterTextName: string;
    filterTextId: string;
}> = ({ onFilterName, onFilterId,  filterTextName, filterTextId }) => (
    <div className={`${styles.headerBox} d-flex gap-3 align-items-center p-2`}>
        <Form.Control
            type="text"
            placeholder="User ID or Username"
            className='formInputBox'
            value={filterTextId}
            onChange={(e) => onFilterId(e.target.value)}
        />
        <Form.Control
            type="text"
            placeholder="Name"
            className='formInputBox'
            value={filterTextName}
            onChange={(e) => onFilterName(e.target.value)}
        />
        <Button  variant="primary" className={`${styles.searchBtn} commonActionBtn`}>Search</Button>
    </div>
);

const HoldingTanksPage: React.FC = () => {
    const [data, setData] = useState<TankData[]>([]);
    const [filterTextName, setFilterTextName] = useState('');
    const [filterTextId, setFilterTextId] = useState('');
    const [filteredData, setFilteredData] = useState<TankData[]>([]);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const fetchData = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2s delay
            const fetchedData: TankData[] = [
                {
                    id: 123456789123,
                    name: 'Allan Silva',
                    pv: '499.99',
                    timeLeft: '',
                    positions: 'positions',
                    clearDate: '2025-01-01',
                    placementSponsor: 'Search by User ID',
                    legPosition: 'legPosition',
                    action: 'Submit'
                },
                {
                    id: 234567891234,
                    name: 'dev Silva',
                    pv: '599.99',
                    timeLeft: '2Hrs 7mins',
                    positions: 'positions',
                    clearDate: '2025-01-01',
                    placementSponsor: 'Search by User ID',
                    legPosition: 'legPosition',
                    action: 'Submit'
                },
                {
                    id: 345678912345,
                    name: 'john Silva',
                    pv: '699.99',
                    timeLeft: '2Hrs 7mins',
                    positions: 'positions',
                    clearDate: '2025-01-01',
                    placementSponsor: 'Search by User ID',
                    legPosition: 'legPosition',
                    action: 'Submit'
                },
                {
                    id: 456789123456,
                    name: 'Lional Messi',
                    pv: '799.99',
                    timeLeft: '2Hrs 7mins',
                    positions: 'positions',
                    clearDate: '2025-01-01',
                    placementSponsor: 'Search by User ID',
                    legPosition: 'legPosition',
                    action: 'Submit'
                },
                {
                    id: 567891234567,
                    name: 'Robert Lewandowski',
                    pv: '899.99',
                    timeLeft: '2Hrs 7mins',
                    positions: 'positions',
                    clearDate: '2025-01-01',
                    placementSponsor: 'Search by User ID',
                    legPosition: 'legPosition',
                    action: 'Submit'
                },

            ];
            setData(fetchedData);
            setFilteredData(fetchedData);
            setLoading(false);
        };

        fetchData();
    }, []);

    const columns = [
        {
            name: 'User ID',
            selector: (row: TankData) => row.id,
            sortable: true,
            width: '140px',
        },
        {
            name: 'Name',
            selector: (row: TankData) => row.name,
            sortable: true,
            width: '180px',
        },
        {
            name: 'PV',
            selector: (row: TankData) => row.pv,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Join Date',
            selector: (row: TankData) => row.clearDate,
            width: '120px',
            sortable: true,
        },
        {
            name: 'Time Left',
            cell: (row: TankData) => <TimeLeftCount timeLeft={row.timeLeft} />,
            width: '180px',
            sortable: true,
        },
        {
            name: 'Position',
            cell: (row: TankData) => <PositionDropDown positions={row.positions} />,
            sortable: true,
            width: '240px',
        },
        {
            name: 'New Placement Sponsor',
            cell: (row: TankData) => (
                <input type="text" defaultValue={row.placementSponsor} />
            ),
            width: '210px',
        },
        {
            name: 'Leg Position',
            cell: (row: TankData) => <LegPositionDropDown positions={row.legPosition} />,
            sortable: true,
            width: '140px',
        },
        {
            name: 'Action',
            cell: (row: TankData) => <ActionButton action={row.action} />,
        },
    ];

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <FilterComponent
                onFilterName={setFilterTextName}
                onFilterId={setFilterTextId}
                filterTextName={filterTextName}
                filterTextId={filterTextId}
            />
        );
    }, [filterTextName, filterTextId, resetPaginationToggle]);

    return (
        <section className={styles.mainBox}>
            <div className={`${styles.infoBoxOuter} infoBoxOuter`}>
                <Link href="/points-wallet" className={`${styles.infoLink} infoLinkBox`}>
                    <Info size={24} weight="fill" />
                    <span>
                        Your Holding Tank is where your personally enrolled Affiliates will appear, allowing you to assign them a position in your downline Tree. To place an Affiliate, enter the ID number of the person they should be placed under, then click "Submit" to assign them to that position. You have 30 days to place each Affiliate before they are automatically positioned on your frontline.
                    </span>
                </Link>
            </div>

            <div className={`${styles.tableBoxMain} tableBoxMain`}>
                <div className={`${styles.filterBox}`}>
                    {subHeaderComponentMemo}
                </div>
                <div className={`${styles.tableDataBox}`}>
                    {loading ? (
                        <SkeletonLoader rows={6} columns={columns.length} />
                    ) : (
                        <DataTable
                            // title="Holding Tank"
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

// Skeleton Loader Component
const SkeletonLoader: React.FC<{ rows: number; columns: number }> = ({ rows, columns }) => {
    return (
        <div style={{ margin: '20px 0', padding: '15px' }}>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: '16px',
                        marginBottom: '10px',
                    }}
                >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <Skeleton key={colIndex} height={30} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default HoldingTanksPage;