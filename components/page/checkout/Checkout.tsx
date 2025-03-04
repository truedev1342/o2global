'use client';

import React, { useRef, useState } from 'react';
import styles from './Checkout.module.scss';
import { Button, Form, Image, Row } from 'react-bootstrap';
import { CaretDown, PencilSimple, WarningCircle } from '@phosphor-icons/react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Link from 'next/link';

interface InfoMessageProps {
    message: string;
    amount: string;
    suffix?: string;
}

interface DropdownProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    dropdownRef: React.RefObject<HTMLDivElement>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    options: { label: string; value: string }[];
    onSelect: (value: string) => void;
    selectedValue: string;
}

const Dropdown: React.FC<DropdownProps> = ({ buttonRef, dropdownRef, isOpen, setIsOpen, options, onSelect, selectedValue }) => (
    <div className={`${styles.columnRelative}`}>
        <Button
            ref={buttonRef}
            variant="outline-primary"
            className={`${styles.dropDownBtn} dropDownCustom`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <span>{selectedValue}</span>
            <CaretDown size={24} />
        </Button>
        {isOpen && (
            <div ref={dropdownRef} className={`${styles.dropDownOuter} dropDownOuter`}>
                <ul className={styles.dropUl}>
                    {options.map((option, index) => (
                        <li key={index} className={styles.dropItem}>
                            <Link
                                href=""
                                className={`${styles.itemLink} notificationItems`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSelect(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                <span className={styles.titleB}>{option.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

const InfoMessage: React.FC<InfoMessageProps> = React.memo(({ message, amount, suffix }) => (
    <div className={styles.infoBox}>
        <WarningCircle size={18} weight="fill" />
        <span>
            {message} <strong>{amount}</strong> {suffix}
        </span>
    </div>
));

const CheckoutView: React.FC = () => {
    const [dropdownStates, setDropdownStates] = useState({
        payment: false,
        billing: false,
        cardType: false,
        expMonth: false,
        expYear: false,
        country: false,
        state: false,
    });

    const [selectedPayment, setSelectedPayment] = useState('Credit Card');
    const [selectedBilling, setSelectedBilling] = useState('Select Billing Info');
    const [selectedCardType, setSelectedCardType] = useState('Select Card Type');
    const [selectedExpMonth, setSelectedExpMonth] = useState('Select Exp. Month');
    const [selectedExpYear, setSelectedExpYear] = useState('Select Exp. Year');
    const [selectedCountry, setSelectedCountry] = useState('Select Country');
    const [selectedState, setSelectedState] = useState('Select State');

    const paymentBtnRef = useRef<HTMLButtonElement | null>(null);
    const paymentDropdownRef = useRef<HTMLDivElement | null>(null);

    const billingBtnRef = useRef<HTMLButtonElement | null>(null);
    const billingDropdownRef = useRef<HTMLDivElement | null>(null);

    const cardTypeBtnRef = useRef<HTMLButtonElement | null>(null);
    const cardTypeDropdownRef = useRef<HTMLDivElement | null>(null);

    const expMonthBtnRef = useRef<HTMLButtonElement | null>(null);
    const expMonthDropdownRef = useRef<HTMLDivElement | null>(null);

    const expYearBtnRef = useRef<HTMLButtonElement | null>(null);
    const expYearDropdownRef = useRef<HTMLDivElement | null>(null);

    const countryBtnRef = useRef<HTMLButtonElement | null>(null);
    const countryDropdownRef = useRef<HTMLDivElement | null>(null);

    const stateBtnRef = useRef<HTMLButtonElement | null>(null);
    const stateDropdownRef = useRef<HTMLDivElement | null>(null);

    const closeDropdown = (dropdown: keyof typeof dropdownStates) => {
        setDropdownStates((prev) => ({ ...prev, [dropdown]: false }));
    };

    useOutsideClick({
        buttonRef: paymentBtnRef,
        dropdownRef: paymentDropdownRef,
        setState: () => closeDropdown('payment'),
    });

    useOutsideClick({
        buttonRef: billingBtnRef,
        dropdownRef: billingDropdownRef,
        setState: () => closeDropdown('billing'),
    });

    useOutsideClick({
        buttonRef: cardTypeBtnRef,
        dropdownRef: cardTypeDropdownRef,
        setState: () => closeDropdown('cardType'),
    });

    useOutsideClick({
        buttonRef: expMonthBtnRef,
        dropdownRef: expMonthDropdownRef,
        setState: () => closeDropdown('expMonth'),
    });

    useOutsideClick({
        buttonRef: expYearBtnRef,
        dropdownRef: expYearDropdownRef,
        setState: () => closeDropdown('expYear'),
    });

    useOutsideClick({
        buttonRef: countryBtnRef,
        dropdownRef: countryDropdownRef,
        setState: () => closeDropdown('country'),
    });

    useOutsideClick({
        buttonRef: stateBtnRef,
        dropdownRef: stateDropdownRef,
        setState: () => closeDropdown('state'),
    });

    const orderSummary: { label: string; value: string; className?: string; classNameGloble?: string }[] = [
        { label: 'Total Price:', value: '$19.95', className: styles.alertRed, classNameGloble: 'alertRed' },
        { label: 'Total Business Volume:', value: '0' },
        { label: 'Tax:', value: '$0.00' },
    ];

    return (
        <section className={styles.mainBox}>
            <div className={styles.boxWrapper}>
                <div className={`${styles.formOuterWrapper}`}>
                    <div className={`${styles.formBox} ${styles.commonBox}`}>
                        <div className={styles.titleLineWrapper}>
                            <div className={styles.titleline}>Payment Information</div>
                            <Button variant="primary" className={styles.editButton}>
                                <PencilSimple size={22} />
                                <span className={styles.editText}>Edit</span>
                            </Button>
                        </div>
                        <div className={styles.formWrapperMain}>
                            <div className={styles.formSelection}>
                                <Form.Label className={styles.userLabel}>Payment Type</Form.Label>
                                <Dropdown
                                    buttonRef={paymentBtnRef}
                                    dropdownRef={paymentDropdownRef}
                                    isOpen={dropdownStates.payment}
                                    setIsOpen={(isOpen) => setDropdownStates((prev) => ({ ...prev, payment: isOpen }))}
                                    options={[
                                        { label: 'Credit Card', value: 'Credit Card' },
                                        { label: 'Credit Wallet', value: 'Credit Wallet' },
                                        { label: 'Credit Wallet + Credit Card', value: 'Credit Wallet + Credit Card' },
                                        { label: 'iDeal', value: 'iDeal' },
                                        { label: 'Crypto (BTC)', value: 'Crypto (BTC)' },
                                        { label: 'Crypto (ETH)', value: 'Crypto (ETH)' },
                                        { label: 'Crypto (TRX)', value: 'Crypto (TRX)' },
                                        { label: 'Crypto (BNBBSC)', value: 'Crypto (BNBBSC)' },
                                    ]}
                                    onSelect={(value) => setSelectedPayment(value)}
                                    selectedValue={selectedPayment}
                                />
                            </div>
                            <div className={styles.formVeriants}>
                                {/* Conditional Rendering Based on Selected Payment Type */}
                                {selectedPayment === 'Credit Card' && (
                                    <div className={`${styles.creditCardBox} ${styles.veriantBoxes} `}>
                                        <Form>
                                            <Row className={styles.rowLines}>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>Select Your Billing info</Form.Label>
                                                    <Dropdown
                                                        buttonRef={billingBtnRef}
                                                        dropdownRef={billingDropdownRef}
                                                        isOpen={dropdownStates.billing}
                                                        setIsOpen={(isOpen) => setDropdownStates((prev) => ({ ...prev, billing: isOpen }))}
                                                        options={[
                                                            { label: 'Holding Tank', value: 'Holding Tank' },
                                                            { label: 'Front Line', value: 'Front Line' },
                                                            { label: 'Project build leg System', value: 'Project build leg System' },
                                                        ]}
                                                        onSelect={(value) => setSelectedBilling(value)}
                                                        selectedValue={selectedBilling}
                                                    />
                                                </Form.Group>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>Name on Card</Form.Label>
                                                    <Form.Control id="" type="text" placeholder="Name on Card" />
                                                </Form.Group>
                                            </Row>
                                            <Row className={styles.rowLines}>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>Card Type</Form.Label>
                                                    <Dropdown
                                                        buttonRef={cardTypeBtnRef}
                                                        dropdownRef={cardTypeDropdownRef}
                                                        isOpen={dropdownStates.cardType}
                                                        setIsOpen={(isOpen) => setDropdownStates((prev) => ({ ...prev, cardType: isOpen }))}
                                                        options={[
                                                            { label: 'Visa', value: 'Visa' },
                                                            { label: 'MasterCard', value: 'MasterCard' },
                                                            { label: 'American Express', value: 'American Express' },
                                                        ]}
                                                        onSelect={(value) => setSelectedCardType(value)}
                                                        selectedValue={selectedCardType}
                                                    />
                                                </Form.Group>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>Credit Card Number</Form.Label>
                                                    <Form.Control id="" type="text" placeholder="XXXX XXXX 0000 0000" />
                                                </Form.Group>
                                            </Row>
                                            <Row className={styles.rowLines}>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>CVV</Form.Label>
                                                    <Form.Control id="" type="text" placeholder="***" />
                                                </Form.Group>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>Exp. Month</Form.Label>
                                                    <Dropdown
                                                        buttonRef={expMonthBtnRef}
                                                        dropdownRef={expMonthDropdownRef}
                                                        isOpen={dropdownStates.expMonth}
                                                        setIsOpen={(isOpen) => setDropdownStates((prev) => ({ ...prev, expMonth: isOpen }))}
                                                        options={[
                                                            { label: 'January', value: 'January' },
                                                            { label: 'February', value: 'February' },
                                                            // Add more months as needed
                                                        ]}
                                                        onSelect={(value) => setSelectedExpMonth(value)}
                                                        selectedValue={selectedExpMonth}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row className={styles.rowLines}>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>Exp. Year</Form.Label>
                                                    <Dropdown
                                                        buttonRef={expYearBtnRef}
                                                        dropdownRef={expYearDropdownRef}
                                                        isOpen={dropdownStates.expYear}
                                                        setIsOpen={(isOpen) => setDropdownStates((prev) => ({ ...prev, expYear: isOpen }))}
                                                        options={[
                                                            { label: '2023', value: '2023' },
                                                            { label: '2024', value: '2024' },
                                                            // Add more years as needed
                                                        ]}
                                                        onSelect={(value) => setSelectedExpYear(value)}
                                                        selectedValue={selectedExpYear}
                                                    />
                                                </Form.Group>
                                            </Row>
                                        </Form>
                                        <div className={`${styles.titleline} ${styles.titlelinemb}`}>Billing Address</div>
                                        <Form>
                                            <Row className={styles.rowLines}>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>Address Line 1</Form.Label>
                                                    <Form.Control id="" type="text" placeholder="Address Line 1" />
                                                </Form.Group>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>Address Line 2</Form.Label>
                                                    <Form.Control id="" type="text" placeholder="Address Line 2" />
                                                </Form.Group>
                                            </Row>
                                            <Row className={styles.rowLines}>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>City</Form.Label>
                                                    <Form.Control id="" type="text" placeholder="Address Line 1" />
                                                </Form.Group>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>Zip/Postal code</Form.Label>
                                                    <Form.Control id="" type="text" placeholder="Zip/Postal code" />
                                                </Form.Group>
                                            </Row>
                                            <Row className={styles.rowLines}>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>Country</Form.Label>
                                                    <Dropdown
                                                        buttonRef={countryBtnRef}
                                                        dropdownRef={countryDropdownRef}
                                                        isOpen={dropdownStates.country}
                                                        setIsOpen={(isOpen) => setDropdownStates((prev) => ({ ...prev, country: isOpen }))}
                                                        options={[
                                                            { label: 'USA', value: 'primary' },
                                                            { label: 'INDIA', value: 'secondary' },
                                                            { label: 'CANADA', value: 'secondary' },
                                                        ]}
                                                        onSelect={(value) => setSelectedCountry(value)}
                                                        selectedValue={selectedCountry}
                                                    />
                                                </Form.Group>
                                                <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                    <Form.Label className={styles.userLabel}>State/Province</Form.Label>
                                                    <Dropdown
                                                        buttonRef={stateBtnRef}
                                                        dropdownRef={stateDropdownRef}
                                                        isOpen={dropdownStates.state}
                                                        setIsOpen={(isOpen) => setDropdownStates((prev) => ({ ...prev, state: isOpen }))}
                                                        options={[
                                                            { label: 'USA', value: 'primary' },
                                                            { label: 'INDIA', value: 'secondary' },
                                                            { label: 'CANADA', value: 'secondary' },
                                                        ]}
                                                        onSelect={(value) => setSelectedState(value)}
                                                        selectedValue={selectedState}
                                                    />
                                                </Form.Group>
                                            </Row>
                                        </Form>
                                        <div className={styles.actionBtnWrapper}>
                                            <Button variant='primary' className={styles.actionBtn}>
                                                Purchase
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'Credit Wallet' && (
                                    <div className={`${styles.creditWalletBox} ${styles.veriantBoxes}`}>
                                        <span className={`${styles.infoBlueBox} infoBlueBox`}>Your current credit wallet balance is <span>$0.00</span>.
                                            <br />
                                            You will pay $19.95 with your credit card.
                                        </span>
                                        <div className={styles.actionBtnWrapper}>
                                            <Button variant='primary' className={styles.actionBtn}>
                                                Purchase
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'Credit Wallet + Credit Card' && (
                                    <div className={styles.creditWalletCardBox}>
                                        <p className={styles.paraText}>Your current credit wallet balance is $0.00
                                            <br />
                                            <span className={styles.redText}>Insufficient balance in your credit wallet.</span>
                                        </p>
                                        <span className={`${styles.infoBlueBox} infoBlueBox`}>Your current credit wallet balance is <span>$0.00</span>.
                                            <br />
                                            You will pay $19.95 with your credit card.
                                        </span>
                                        <div className={styles.actionBtnWrapper}>
                                            <Button variant='primary' className={styles.actionBtn}>
                                                Purchase
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'iDeal' && (
                                    <div className={`${styles.iDealBox} ${styles.veriantBoxes}`}>
                                        <h3>
                                            Pay Credit Card in Secured Payment Page
                                        </h3>
                                        <p className={styles.paraText}>Please follow the instructions on the next page to complete your payment in Secured Payment Page. Once your payment has been verified and received, your order will be released. </p>
                                        <div className={styles.actionBtnWrapper}>
                                            <Button variant='primary' className={styles.actionBtn}>
                                                Purchase
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'Crypto (BTC)' && (
                                    <div className={`${styles.cBtcBox} ${styles.veriantBoxes}`}>
                                        <Form.Check
                                            inline
                                            label="I agree and understand that i’m using cryptocurrencies to pay for my order. Cryptocurrencies payments are non-refundable due to fluctuation and risk associated. O2 Global is not responsible for any gains or losses that occurs with the use of cryptocurrencies."
                                            name="group1"
                                            type="checkbox"
                                            id="id1"
                                            className={`${styles.checkboxLabel}`}
                                        />
                                        <div className={styles.actionBtnWrapper}>
                                            <Button variant='primary' className={styles.actionBtn}>
                                                Purchase
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'Crypto (ETH)' && (
                                    <div className={`${styles.cEthBox} ${styles.veriantBoxes}`}>
                                        <Form.Check
                                            inline
                                            label="I agree and understand that i’m using cryptocurrencies to pay for my order. Cryptocurrencies payments are non-refundable due to fluctuation and risk associated. O2 Global is not responsible for any gains or losses that occurs with the use of cryptocurrencies."
                                            name="group2"
                                            type="checkbox"
                                            id="id2"
                                            className={`${styles.checkboxLabel}`}
                                        />
                                        <div className={styles.actionBtnWrapper}>
                                            <Button variant='primary' className={styles.actionBtn}>
                                                Purchase
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'Crypto (TRX)' && (
                                    <div className={`${styles.cTrxBox} ${styles.veriantBoxes}`}>
                                        <Form.Check
                                            inline
                                            label="I agree and understand that i’m using cryptocurrencies to pay for my order. Cryptocurrencies payments are non-refundable due to fluctuation and risk associated. O2 Global is not responsible for any gains or losses that occurs with the use of cryptocurrencies."
                                            name="group3"
                                            type="checkbox"
                                            id="id3"
                                            className={`${styles.checkboxLabel}`}
                                        />
                                        <div className={styles.actionBtnWrapper}>
                                            <Button variant='primary' className={styles.actionBtn}>
                                                Purchase
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'Crypto (BNBBSC)' && (
                                    <div className={`${styles.cBnbbscBox} ${styles.veriantBoxes}`}>
                                        <Form.Check
                                            inline
                                            label="I agree and understand that i’m using cryptocurrencies to pay for my order. Cryptocurrencies payments are non-refundable due to fluctuation and risk associated. O2 Global is not responsible for any gains or losses that occurs with the use of cryptocurrencies."
                                            name="group4"
                                            type="checkbox"
                                            id="id4"
                                            className={`${styles.checkboxLabel}`}
                                        />
                                        <div className={styles.actionBtnWrapper}>
                                            <Button variant='primary' className={styles.actionBtn}>
                                                Purchase
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.summaryBoxWrapperMain}>
                    <div className={`${styles.summaryBox} ${styles.commonBox} summaryBox`}>
                        <h3>Order Summary</h3>
                        <div className={styles.summaryLinesWrapper}>
                            {orderSummary.map(({ label, value, className, classNameGloble = '' }, index) => (
                                <div key={index} className={`${styles.summaryLines} summaryLines`}>
                                    <span>{label}</span>
                                    <span className={`${styles.summaryValue} ${className} ${classNameGloble}`}>{value}</span>
                                </div>
                            ))}
                        </div>
                        <InfoMessage message="You saved a total of" amount="$-19.94" />
                        <h4 >Shopping Cart</h4>
                        <InfoMessage message="Congratulations! You saved" amount="$-19.94" suffix="on your subscription purchase." />
                        <div className={styles.technologyFee}>
                            <Image src="./../images/logoBlue.svg" alt="banner" width={140} height={52} className={styles.logoImg} />
                            <div className={`${styles.technologyFeeWrapper} technologyFeeWrapper`}>
                                <span>Technology Fee</span>
                                <div className={styles.feeBox}>
                                    <div className={styles.feeDetails}>
                                        <div className={styles.feeItem}>
                                            <span className={styles.feeLabel}>Price</span>
                                            <span className={styles.feeValue}>$19.95</span>
                                        </div>
                                        <div className={styles.feeItem}>
                                            <span className={styles.feeLabel}>BV</span>
                                            <span className={styles.feeValue}>$19.95</span>
                                        </div>
                                    </div>
                                    <div className={styles.feeDetails}>
                                        <div className={styles.feeItem}>
                                            <span className={styles.feeLabel}>Frequency</span>
                                            <span className={styles.feeValue}>Every Month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutView;