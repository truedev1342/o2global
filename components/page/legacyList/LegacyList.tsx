'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styles from "./../sponsorList/SponsorList.module.scss";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Image, } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import { ChatTeardropDots, MagnifyingGlass } from '@phosphor-icons/react';
import 'rsuite/dist/rsuite.min.css';

interface TankData {
    id: number;
    level: number;
    userName: string;
    name: string;
    rank: string;
    date: string;
    country: string;
    enroller: string;
    parent: string;
    leg: string;
    subscription: string;
    pv: string;
    lrBv: string;
}

const NameBox: React.FC<{ name: string, rank: string, date: string }> = ({ name, rank, date }) => {
    return <div className={`${styles.nameBox}`}>
        <Image src="./../images/avatar.png" alt="avatar" width={48} height={48} className={`${styles.avatarImg} avatarImg`} />
        <span className={`${styles.nameWrps}`}>
            <span>{name}</span>
            <span className={`${styles.rankWrps}`}>
                <span>{rank}</span>
                <span>{date}</span>
            </span>
        </span>
        <Button variant="link" className={styles.messageBtn}>
            <ChatTeardropDots size={24} />
        </Button>
    </div>;
};
const CountryBox: React.FC<{ country: string }> = ({ country }) => {
    return <Image src="./../images/usFlag.svg" alt="usFlag" width={45} height={45} className={`${styles.countryImg}`} />;
};
const SubBox: React.FC<{ subscription: string }> = ({ subscription }) => (
    <div className={`${styles.subscriptionText}`}>{subscription}</div>
);

createTheme('solarized', {
    background: {
        default: 'transparent',
    },
});

const FilterComponent: React.FC<{

}> = () => {
    return (
        <div className={`${styles.headerBox} d-flex gap-3 align-items-center`}>
            <div className={styles.filterSearching}>
                <div className={styles.searchBox}>
                    <span className={`${styles.searchWrpper} searchWrpperInput`}>
                        <MagnifyingGlass size={24} />
                        <input type="text" placeholder="Search" />
                    </span>
                </div>
                <Button variant="primary" className={`${styles.searchBtn} commonActionBtn`}>Search</Button>
            </div>
        </div>
    );
};

const LegacyListPage: React.FC = () => {
    const [data, setData] = useState<TankData[]>([]);
    const [filterTextName] = useState('');
    const [filterTextId] = useState('');
    const [filteredData, setFilteredData] = useState<TankData[]>([]);
    const [resetPaginationToggle] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                    enroller: 'Enroller N',
                    parent: 'bsnmsc',
                    leg: 'Right',
                    subscription: 'No',
                    pv: '0',
                    lrBv: '0/1.600',
                },
                {
                    id: 234567891234,
                    level: 2,
                    userName: 'gitrdone',
                    name: 'Doug Wilkinson',
                    rank: 'Affiliate',
                    date: '10/25/24',
                    country: '',
                    enroller: 'Enroller N',
                    parent: 'bsnmsc',
                    leg: 'Right',
                    subscription: 'No',
                    pv: '0',
                    lrBv: '0/1.800',
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
        },
        {
            name: 'Level',
            selector: (row: TankData) => row.level,
            sortable: false, width: '80px'
        },
        {
            name: 'Username',
            selector: (row: TankData) => row.userName,
            sortable: false,
        },
        {
            name: 'Name',
            cell: (row: TankData) => <NameBox name={row.name} rank={row.rank} date={row.date} />,
            sortable: true, width: '250px'
        },
        {
            name: 'Country',
            cell: (row: TankData) => <CountryBox country={row.country} />,
            sortable: false, width: '100px'
        },
        {
            name: 'Enroller',
            selector: (row: TankData) => row.enroller,
            sortable: false, width: '120px'
        },
        {
            name: 'Parent',
            selector: (row: TankData) => row.parent,
            sortable: false, width: '120px'
        },
        {
            name: 'Leg',
            selector: (row: TankData) => row.leg,
            sortable: false, width: '120px'
        },
        {
            name: 'Subscription',
            cell: (row: TankData) => <SubBox subscription={row.subscription} />,
            sortable: false,
        },
        {
            name: 'PV',
            selector: (row: TankData) => row.pv,
            sortable: false, width: '90px'
        },
        {
            name: 'Left/Right Binary BV',
            selector: (row: TankData) => row.lrBv,
            width: '250px', sortable: true,
        },
    ];

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <FilterComponent />
        );
    }, [filterTextName, filterTextId, resetPaginationToggle]);

    return (
        <section className={styles.mainBox}>
            <div className={`${styles.tableBoxMain} tableBoxMain`}>
                <div className={`${styles.filterBox}`}>
                    {subHeaderComponentMemo}
                </div>
                <div className={`${styles.tableDataBox} customtableDataBox`}>
                    <span className={`${styles.headBar}`}>
                        <h5 className={styles.tableTitle}>Enrollment List</h5>
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

export default LegacyListPage;
