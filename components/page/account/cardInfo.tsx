import React, { useEffect, useState } from 'react';
import styles from './Account.module.scss';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { PencilSimpleLine, Star, TrashSimple } from '@phosphor-icons/react';

interface TankData {
    name: string;
    cardNumber: string;
    ExpDate: string;
    nameCard: string;
    billingAddress: string;
    option: string;
}

const OptionDropDown: React.FC<{ positions: string, rowName: string }> = ({ rowName }) => {
    const isCallySilva = rowName === 'Allan Silva';
    return (
        <div className="p-3 d-flex gap-1">
            <Button className={`${styles.actionBtnIcons} ${styles.greenSvg}  actionBtnIcons`} variant="link">
                <Star size={24} weight={isCallySilva ? "fill" : "regular"} />
            </Button>
            <Button className={`${styles.actionBtnIcons} ${styles.blueSvg}  actionBtnIcons`} variant="link">
                <PencilSimpleLine size={24} weight="fill" />
            </Button>
            <Button className={`${styles.actionBtnIcons} ${styles.redSvg}  actionBtnIcons`} variant="link">
                <TrashSimple size={24} weight="fill" />
            </Button>
        </div>
    );
};

createTheme('solarized', {
    background: {
        default: 'transparent',
    },
});

const CardInfoView: React.FC = () => {
    const [filteredData, setFilteredData] = useState<TankData[]>([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const fetchedData: TankData[] = [
                {
                    name: 'Allan Silva',
                    cardNumber: 'Visa ************1111',
                    ExpDate: '408-591-3087',
                    nameCard: 'Roger Ulmer',
                    billingAddress: 'sample location, sample locationsamplelocation, sample location - 323232 ',
                    option: 'option',
                },
                {
                    name: 'Ballen Silva',
                    cardNumber: 'Visa ************1111',
                    ExpDate: '408-591-3087',
                    nameCard: 'Roger Ulmer',
                    billingAddress: 'sample location, sample locationsamplelocation, sample location - 323232 ',
                    option: 'option',
                },
                {
                    name: 'Callen Silva',
                    cardNumber: 'Visa ************1111',
                    ExpDate: '408-591-3087',
                    nameCard: 'Roger Ulmer',
                    billingAddress: 'sample location, sample locationsamplelocation, sample location - 323232 ',
                    option: 'option',
                },
            ];
            setFilteredData(fetchedData);
            setLoading(false);
        };
        fetchData();
    }, []);


    const columns = [
        {
            name: 'Name',
            selector: (row: TankData) => row.name,
            sortable: true,
            grow: 1,
        },
        {
            name: 'Card Number',
            selector: (row: TankData) => row.cardNumber,
            sortable: true,
            grow: 2,
        },
        {
            name: 'Exp Date',
            selector: (row: TankData) => row.ExpDate,
            sortable: true,
        },
        {
            name: 'Name on Card',
            selector: (row: TankData) => row.nameCard,
            sortable: true,
            grow: 2,
        },
        {
            name: 'Billing Address',
            cell: (row: TankData) => row.billingAddress,
            sortable: true,
            grow: 2,
        },
        {
            name: ' ',
            cell: (row: TankData) => <OptionDropDown positions={row.option} rowName={row.name} />,
        }
    ];
    return (
        <div className={`${styles.shippingAdBox} ${styles.commonBoxCard}`}>
            <div className={`${styles.titleBar}`}>
                <h2>Credit Cards</h2>
                <Button className={`${styles.editBtn} commonBtn`} onClick={handleShow}>New Credit Card</Button>
            </div>
            <div className={`${styles.tableDataBox}`}>
                {loading ? (
                    <SkeletonLoader rows={5} columns={columns.length} />
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
            <Modal show={show} onHide={handleClose} className='commonModal mdModal' aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton className='modalHeaderCommon'>
                    <Modal.Title>Add Credit Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className={styles.rowLines}>
                            <Form.Group className="col-12">
                                <Form.Control id="cardName"
                                    type="text"
                                    placeholder="Name on Card"
                                />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="Card Number" />
                            </Form.Group>
                            <div className={`${styles.wFullXsm} col-6`}>
                                <Row>
                                    <Form.Group className={`col-6`}>
                                        <Form.Control id="" type="text" placeholder="MM/YY" />
                                    </Form.Group>
                                    <Form.Group className={`col-6`}>
                                        <Form.Control id="" type="number" placeholder="CVC" />
                                    </Form.Group>
                                </Row>
                            </div>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="Address Line 1" />
                            </Form.Group>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="Address Line 2" />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}> 
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="City" />
                            </Form.Group>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <Form.Control id="" type="text" placeholder="Zip/Postal Code" />
                            </Form.Group>
                        </Row>
                        <Row className={styles.rowLines}>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <div className={`position-relative`}>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select Country</option>
                                        <option value="1">USA</option>
                                        <option value="2">CANADA</option>
                                        <option value="3">AUSTRALIA</option>
                                    </Form.Select>
                                </div>

                            </Form.Group>
                            <Form.Group className={`${styles.wFullXsm} col-6`}>
                                <div className={`position-relative`}>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select State</option>
                                        <option value="1">State 1</option>
                                        <option value="2">State 2</option>
                                        <option value="3">State 3</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={`${styles.modalFooterCommon} modalFooterCommon`}>
                    <Button variant="outline-primary" className={`${styles.saveBtn} ${styles.commonFooterBtn} commonActionOutlineBtn`} onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" className={`${styles.filled} ${styles.commonFooterBtn} commonActionOutlineBtn`} onClick={handleClose}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div >
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

export default CardInfoView;
