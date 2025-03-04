'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styles from "./../sponsorList/SponsorList.module.scss";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Image, } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';
import { Receipt } from '@phosphor-icons/react';

interface TankData {
    orderNumber: number;
    date: string;
    totalAmount: string;
    trackingId: string;
    receipt: string;
}

createTheme('solarized', {
    background: {
        default: 'transparent',
    },
});

const FilterComponent: React.FC<{

}> = () => {
    const handleDateChange = (range: [Date, Date] | null) => {
        if (range) {
            console.log(`Selected Range: ${range[0].toLocaleDateString()} to ${range[1].toLocaleDateString()}`);
        }
    };

    return (
        <div className={`${styles.headerBox} d-flex gap-3 align-items-center`}>
            <div className={styles.filterSearching}>
                <DateRangePicker
                    onChange={handleDateChange}
                    placeholder="Start date End date"
                    className='rangeDatePickerWrapper'
                />
                <Button variant="primary" className={`${styles.searchBtn} commonActionBtn`}>Search</Button>
            </div>
        </div>
    );
};
const ReceiptBox: React.FC<{ receipt: string }> = ({ receipt }) => {
    return <Button className={`${styles.receiptBtn}`} target='_blank' href="/order_receipt.html">
        <Receipt size={24} />
    </ Button>;
};

const OrderHistoryPage: React.FC = () => {
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
                    orderNumber: 123456789123,
                    date: '12/12/25',
                    totalAmount: '$1000',
                    trackingId: 'aksdjsakjd.com',
                    receipt: ''
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
            name: 'Order Number',
            selector: (row: TankData) => row.orderNumber,
            sortable: true,

        },
        {
            name: 'Date',
            selector: (row: TankData) => row.date,
            sortable: true,
        },
        {
            name: 'Total Amount',
            selector: (row: TankData) => row.totalAmount,
            sortable: true,

        },
        {
            name: 'Tracking ID',
            selector: (row: TankData) => row.trackingId,

            sortable: true,
        },
        {
            name: 'Receipt',
            cell: (row: TankData) => <ReceiptBox receipt={row.receipt} />,
            sortable: false,
        }
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
                <div className={`${styles.tableDataBox}`}>
                    {loading ? (
                        <SkeletonLoader rows={6} columns={columns.length} />
                    ) : (
                        <DataTable
                            title="My Orders"
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

export default OrderHistoryPage;
