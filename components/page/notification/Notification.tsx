'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from "./../sponsorList/SponsorList.module.scss";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DataTable, { createTheme } from 'react-data-table-component';
import 'rsuite/dist/rsuite.min.css';
import { Button, Overlay, Popover } from 'react-bootstrap';
import { DotsThree } from '@phosphor-icons/react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Link from 'next/link';

interface TankData {
    subject: string;
    discription: string;
    date: string;
    option: string;
}

createTheme('solarized', {
    background: {
        default: 'transparent',
    },
});
const OptionBox: React.FC<{ option: string }> = ({ option }) => {
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
        }} ref={positionBtnRef} className={`${styles.actionDropDownBtn} dropDownBtn`} variant='link'>
            <DotsThree size={24} weight="bold" />
        </Button>
        <Overlay show={showPosition} target={target} placement='bottom' ref={positionDropdownRef}>
            <Popover show={showPosition} id="popover-basic" >
                <div className={`${styles.dropDownOuterPopover} ${styles.dropDownOuterPosition} dropDownOuterPopover dropDownOuterPosition`}>
                    <ul className={`${styles.dropUl} ${styles.dropUlGrid}`}>
                        <li className={`${styles.dropItem} ${styles.unread} unread `}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Action
                            </Link>
                        </li>
                        <li className={styles.dropItem}>
                            <Link href="/points-wallet" className={`${styles.itemLink} ${styles.langItm} notificationItems`}>
                                Delete
                            </Link>
                        </li>
                    </ul>
                </div>
            </Popover>
        </Overlay>
    </>;
};


const NotificationPage: React.FC = () => {
    const [data, setData] = useState<TankData[]>([]);
    const [filteredData, setFilteredData] = useState<TankData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const fetchedData: TankData[] = [
                {
                    subject: 'Hempworx CBD Spray and Whole Plant Extract',
                    discription: 'Introducing the newest additions to the HempWorx Family, ...',
                    date: '3/1/2024 4:47 PM',
                    option: '',
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
            name: 'Subject',
            selector: (row: TankData) => row.subject,
            sortable: true,
            grow: 1.5
        },
        {
            name: 'Description',
            selector: (row: TankData) => row.discription,
            sortable: true,
            grow: 3
        },
        {
            name: 'Date',
            selector: (row: TankData) => row.date,
            sortable: true,
        },
        {
            name: '',
            cell: (row: TankData) => <OptionBox option={row.option} />,
            sortable: false,
        }
    ];

    return (
        <section className={styles.mainBox}>
            <div className={`${styles.tableBoxMain} tableBoxMain`}>
                <div className={`${styles.tableDataBox} customtableDataBox`}>
                    {loading ? (
                        <SkeletonLoader rows={6} columns={columns.length} />
                    ) : (
                        <DataTable
                            title="Notifications"
                            selectableRows
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

export default NotificationPage;
