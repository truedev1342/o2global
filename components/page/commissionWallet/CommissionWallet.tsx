'use client';

import React, { useEffect, useState } from 'react';
import styles from "./CommissionWallet.module.scss";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Image, Tab, Tabs } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import 'rsuite/dist/rsuite.min.css';
import { Line } from 'react-chartjs-2';
import pdfIcon from '@/public/images/pdfIcon.svg'
import cw from '@/public/images/cw.svg';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData
} from 'chart.js';
import { WarningCircle } from '@phosphor-icons/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface TankData {
    creditAt: string;
    type: string;
    amount: string;
    description: string;
    status: string;
    rank: string;
    action: string;
}

createTheme('solarized', {
    background: {
        default: 'transparent',
    },
});

const StatusBox: React.FC<{ status: string }> = ({ status }) => (
    <div className={`${styles.statusBoxText}`}>{status}</div>
);
const ActionBox: React.FC<{ action: string }> = ({ action }) => (
    <Button className={`${styles.actionBoxText}`} variant="link">
        <Image src={pdfIcon.src} alt="wallet" width={24} height={24} />
    </Button>
);

const CommissionWalletPage: React.FC = () => {
    const [earningData, setEarningData] = useState<TankData[]>([]);
    const [payoutHistoryData, setPayoutHistoryData] = useState<TankData[]>([]);
    const [adjustmentData, setAdjustmentData] = useState<TankData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setEarningData([
                { creditAt: '01/01/2023', type: 'Direct', amount: '100', description: 'Earning Desc', status: 'Completed', rank: 'Top', action: '' },
                { creditAt: '02/02/2023', type: 'Bonus', amount: '50', description: 'Earning Desc', status: 'Pending', rank: 'Mid', action: '' },
            ]);
            setPayoutHistoryData([
                { creditAt: '01/01/2023', type: 'Bank Transfer', amount: '100', description: 'Payout Desc', status: '', rank: '', action: '' },
                { creditAt: '02/02/2023', type: 'PayPal', amount: '200', description: 'Payout Desc', status: '', rank: '', action: '' },
            ]);
            setAdjustmentData([
                { creditAt: '01/01/2023', type: 'Correction', amount: '-10', description: 'Adjustment Desc', status: '', rank: '', action: '' },
                { creditAt: '02/02/2023', type: 'Rebate', amount: '20', description: 'Adjustment Desc', status: '', rank: '', action: '' },
            ]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const earningColumns = [
        { name: 'Pay Period', selector: (row: TankData) => row.creditAt, sortable: true },
        { name: 'Earned Amount', selector: (row: TankData) => row.amount, sortable: true },
        { name: 'Description', selector: (row: TankData) => row.description, sortable: true },
        {
            name: 'Status', selector: (row: TankData) => row.status,
            cell: (row: TankData) => <StatusBox status={row.status} />, sortable: true
        },
        { name: 'Rank', selector: (row: TankData) => row.rank, sortable: true },
        {
            name: 'Action', selector: (row: TankData) => row.action,
            cell: (row: TankData) => <ActionBox action={row.action} />, sortable: true
        },
    ];

    const payoutHistoryColumns = [
        { name: 'Date', selector: (row: TankData) => row.creditAt, sortable: true },
        { name: 'Payout Provider', selector: (row: TankData) => row.type, sortable: true },
        { name: 'Amount', selector: (row: TankData) => row.amount, sortable: true },
        { name: 'Note', selector: (row: TankData) => row.description, sortable: true },
    ];

    const adjustmentColumns = [
        { name: 'Date', selector: (row: TankData) => row.creditAt, sortable: true },
        { name: 'Amount', selector: (row: TankData) => row.amount, sortable: true },
        { name: 'Type', selector: (row: TankData) => row.type, sortable: true },
        { name: 'Note', selector: (row: TankData) => row.description, sortable: true },
    ];

    interface InfoCardProps {
        title: string;
        value: number;
    }

    const InfoCard: React.FC<InfoCardProps> = ({ title, value }) => {
        return (
            <div className={`${styles.dashCard} dashCard`}>
                <div className={`${styles.leftSide} leftSide`}>
                    <span className={`${styles.valueLine} valueLine`}>${value}</span>
                    <span className={`${styles.titleLine} titleLine`}>{title}</span>
                </div>
                <div className={`${styles.rightSide} rightSide`}>
                    <Image src={cw.src} alt="wallet" width={56} height={56} className={`${styles.icnImg} icnImg`} />
                </div>
            </div>
        );
    };

    const cardData = [
        { title: "Earnings Last 7 Days", value: 0.00 },
        { title: "Earnings Last 30 Days", value: 0.00 },
        { title: "Total Earnings", value: 0.00 },
        { title: "Credit Wallet", value: 0.00 }
    ];

    const chartData: ChartData<'line'> = {
        labels: ['11/04/22', '05/02/23', '03/15/24', '05/10/24'],
        datasets: [
            {
                label: 'Earnings Growth',
                data: [4, 30, 2, 16],
                borderColor: '#164FF2',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                min: 0,
                max: 32,
                ticks: {
                    stepSize: 8,
                    callback: (value) => `$${value}`,
                },
            },
        },
    };

    return (
        <section className={styles.mainBox}>
            <Tabs
                defaultActiveKey="earning"
                id="commissionWalletTabs"
                className={`${styles.tabCommon} tabCommonBox`}
            >
                <Tab eventKey="earning" title={<>Earning</>}>
                    <div className={`${styles.walletBalanceBox}`}>
                        <div className={`${styles.cardBoxWrapper}`}>
                            {cardData.map((item, index) => (
                                <InfoCard key={index} title={item.title} value={item.value} />
                            ))}
                        </div>
                        <div className={styles.chartContainer}>
                            <h5 className={styles.chartTitle}>Earnings Growth</h5>
                            <div className={styles.chartWrapper}>
                                <Line options={chartOptions} data={chartData} height={300} />
                            </div>
                        </div>
                        <div className={`${styles.tableDataBox} ${styles.earningTable}`}>
                            <span className={`${styles.headBar}`}>
                                <h5 className={styles.tableTitle}>Earnings</h5>
                                <Button variant="link">Earnings</Button>
                            </span>
                            {loading ? (
                                <SkeletonLoader rows={6} columns={earningColumns.length} />
                            ) : (
                                <DataTable
                                    columns={earningColumns}
                                    data={earningData}
                                    pagination
                                    highlightOnHover
                                    responsive
                                    theme="solarized"
                                />
                            )}
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="payoutHistory" title={<>Payout History</>}>
                    <div className={`${styles.transferCreditBox}`}>
                        <div className={`${styles.tableDataBox} ${styles.earningTable}`}>
                            <h5 className={styles.tableTitle}>Payout History</h5>
                            {loading ? (
                                <SkeletonLoader rows={6} columns={payoutHistoryColumns.length} />
                            ) : (
                                <DataTable
                                    columns={payoutHistoryColumns}
                                    data={payoutHistoryData}
                                    pagination
                                    highlightOnHover
                                    responsive
                                    theme="solarized"
                                />
                            )}
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="commissionAdjustments" title={<>Commission Adjustments</>}>
                    <div className={`${styles.transferCreditBox}`}>
                        <div className={`${styles.tableDataBox} ${styles.earningTable}`}>
                            <h5 className={styles.tableTitle}>Commission Adjustments</h5>
                            <small className={styles.subTitle}>(Current Amount: $0.00)</small>
                            <p className={styles.paraBox}>
                                <WarningCircle weight="fill" size={24} />
                                When calculating your commissions, we adjust any refunds, returns, or chargebacks that occur in your organization. These adjustments are subtracted out of your weekly or monthly earnings.
                            </p>
                            {loading ? (
                                <SkeletonLoader rows={6} columns={adjustmentColumns.length} />
                            ) : (
                                <DataTable
                                    columns={adjustmentColumns}
                                    data={adjustmentData}
                                    pagination
                                    highlightOnHover
                                    responsive
                                    theme="solarized"
                                />
                            )}
                        </div>
                    </div>
                </Tab>
            </Tabs>
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

export default CommissionWalletPage;
