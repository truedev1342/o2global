'use client';

import React, { useEffect, useState } from 'react';
import styles from "./CreditWallet.module.scss";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Form, Image, Row, Tab, Tabs, } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import 'rsuite/dist/rsuite.min.css';
import cw from '@/public/images/cw.svg'
import { Asterisk } from '@phosphor-icons/react';

interface TankData {
    creditAt: string;
    type: string;
    amount: string;
    description: string;
}

createTheme('solarized', {
    background: {
        default: 'transparent',
    },
});

const CreditWalletPage: React.FC = () => {
    const [data, setData] = useState<TankData[]>([]);
    const [filteredData, setFilteredData] = useState<TankData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const fetchedData: TankData[] = [
                {
                    creditAt: '123456789123',
                    type: '1',
                    amount: 'gitrdone',
                    description: 'Doug Wilkinson',
                },
                {
                    creditAt: '123456789123',
                    type: '1',
                    amount: 'gitrdone',
                    description: 'Doug Wilkinson',
                }
            ];
            setData(fetchedData);
            setFilteredData(fetchedData);
            setLoading(false);
        };

        fetchData();
    }, []);

    const columns = [
        {
            name: 'Credited At',
            selector: (row: TankData) => row.creditAt,
            sortable: true,
        },
        {
            name: 'Type',
            selector: (row: TankData) => row.type,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: (row: TankData) => row.amount,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: TankData) => row.description,
            sortable: true,
        },
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
        { title: "Current Balance", value: 0.00 },
        { title: "Total Withdrawn", value: 0.00 }
    ];

    interface BankDetail {
        label: string;
        value: string;
    }

    const bankDetailsLeft: BankDetail[] = [
        { label: "Financial Institution", value: "First Citizens Bank" },
        { label: "Bank Address", value: "Raleigh, NC USA" },
        { label: "Routing / ABA Number", value: "053100300" },
    ];

    const bankDetailsRight: BankDetail[] = [
        { label: "Beneficiary Name", value: "Sample beneficiary name" },
        { label: "Beneficiary Account Number", value: "001064971417" },
        { label: "Beneficiary Address", value: "6713 S Eastern Ave Las Vegas, NV 89119" },
    ];

    const DetailList: React.FC<{ details: BankDetail[] }> = ({ details }) => (
        <div className={`${styles.cardColumn}`}>
            {details.map((detail, index) => (
                <div key={index} className={`${styles.cardRow}`}>
                    {detail.label}:<span className={`${styles.cardBold}`}>{detail.value}</span>
                </div>
            ))}
        </div>
    );

    return (
        <section className={styles.mainBox}>
            <Tabs
                defaultActiveKey="walletBalance"
                id="wallet"
                className={`${styles.tabCommon} tabCommonBox`}
            >
                <Tab eventKey="walletBalance" title={<>Credit Wallet Balance</>}>
                    <div className={`${styles.walletBalanceBox}`}>
                        <div className={`${styles.cardBoxWrapper}`}>
                            {cardData.map((item, index) => (
                                <InfoCard key={index} title={item.title} value={item.value} />
                            ))}
                        </div>
                        <div className={`${styles.cardBoxParagraph}`}>
                            <h2>About Credit Wallet</h2>
                            <p>
                                O2 Global gives you the opportunity to use your commissions to purchase product for yourself or for others in your team. Simply select how much of your future commissions you would like to allocate toward your credit account and it will automatically be added each Thursday as commissions are paid.
                            </p>
                            <p>
                                In addition, you may fill your credit wallet by sending O2 Global, Inc. a bank wire. Below are the bank wire details:
                            </p>
                        </div>
                        <div className={`${styles.dualCardWrapper}`}>
                            <div className={`${styles.commonCard}`}>
                                <div className={`${styles.cardWrap}`}>
                                    <DetailList details={bankDetailsLeft} />
                                    <DetailList details={bankDetailsRight} />
                                </div>
                            </div>
                            <div className={`${styles.commonCard}`}>
                                <h3>Withdraw</h3>
                                <Form className={`${styles.withdrawForm}`}>
                                    <Row className={styles.rowLines}>
                                        <Form.Group className={`${styles.wFull}`}>
                                            <Form.Label htmlFor="">Amount:</Form.Label>
                                            <Form.Control id="" type="text" placeholder="$0" className={styles.formInput} />
                                            <Button type="submit" className={styles.formBtn}>Withdraw</Button>
                                        </Form.Group>
                                    </Row>
                                </Form>
                                <small className={`${styles.withdrawNote}`}>
                                    <Asterisk weight='bold' size={8} /> Withdrawals are processed every Thursday at 4PM PST and may take 5-7 business days to reach your payment method on file.
                                </small>
                            </div>
                        </div>
                        <div className={`${styles.creditParagraph}`}>
                            <small>
                                Please include your ID# in the reference line to ensure proper funds are allocated to your credit wallet
                            </small>
                            <small>
                                Once you have sent a wire, please email accounting@O2.com with your wire receipt and then your wallet will be funded.
                            </small>
                        </div> 
                        <Form.Group className={`${styles.creditRadioFrom}`}>
                            <div className={`${styles.radioFromWrapper}`}>
                                <Form.Check
                                    inline
                                    label="Do not credit ANY of my earnings to my Credit Wallet."
                                    name="group1"
                                    type="radio"
                                    id="id1"
                                    className={`${styles.radioBtn}`}
                                />
                                <Form.Check
                                    inline
                                    label={<>
                                        <span>
                                            I would like to credit the next
                                        </span>
                                        <Form.Control id="" type="text" placeholder="$0" className={styles.formInput} />
                                        <span>
                                            of my earnings to my Credit Wallet.
                                        </span>
                                    </>}
                                    name="group1"
                                    type="radio"
                                    id="id2"
                                    className={`${styles.radioBtn}`}
                                />
                                <Form.Check
                                    inline
                                    label="I would like to credit ALL of my earnings to my Credit Wallet."
                                    name="group1"
                                    type="radio"
                                    id="id3"
                                    className={`${styles.radioBtn}`}
                                    defaultChecked
                                />
                            </div>
                            <Button type="submit" className={styles.formBtn}>Save Changes</Button>
                        </Form.Group>
                    </div>
                </Tab>
                <Tab eventKey="transferCredit" title={<>Transfer Credit</>}>
                    <div className={`${styles.transferCreditBox}`}>
                        <h5>
                            Transfer Credit
                        </h5>
                        <Form className={`${styles.creditForm}`}>
                            <Row className={styles.rowLines}>
                                <Form.Group className={`${styles.wFull}`}>
                                    <Form.Label htmlFor="">Receiver Username:</Form.Label>
                                    <Form.Control id="" type="text" placeholder="Search by User ID" className={styles.formInput} />
                                    <small className={`${styles.creditNote}`}>
                                        <Asterisk weight='bold' size={8} /> Receiver should be an Affiliate.
                                    </small>
                                </Form.Group>
                            </Row>
                            <Row className={styles.rowLines}>
                                <Form.Group className={`${styles.wFull}`}>
                                    <Form.Label htmlFor="">Amount:</Form.Label>
                                    <Form.Control id="" type="text" placeholder="$0" className={styles.formInput} />
                                </Form.Group>
                            </Row>
                            <Button type="submit" className={styles.formBtn}>Send</Button>
                        </Form>
                    </div>
                </Tab>
                <Tab eventKey="creditLog" title={<>Credit Log</>}>
                    <div className={`${styles.tableBoxMain} tableBoxMain`}>
                        <div className={`${styles.tableDataBox}`}>
                            {loading ? (
                                <SkeletonLoader rows={6} columns={columns.length} />
                            ) : (
                                <DataTable
                                    title="Credit Logs"
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
                </Tab>
            </Tabs>
        </section >
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

export default CreditWalletPage;
