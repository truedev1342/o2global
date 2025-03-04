'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './auth.module.scss';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { CaretLeft, CaretRight, CheckCircle, Eye, EyeSlash, X, XCircle } from '@phosphor-icons/react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

interface JoinCardProps {
    title: string;
    description: string;
    buttonText: string;
    className?: string;
    isLimited?: boolean;
    limitNumber?: string;
    isIcons?: boolean;
    iconPath?: string;
    buttonVariant?: string;
    onClick?: () => void;
}

const JoinCard: React.FC<JoinCardProps> = ({ title, description, buttonText, className, isLimited, isIcons, limitNumber, iconPath, buttonVariant = "primary", onClick }) => {
    return (
        <Card className={`${styles.commonCardBox} ${className}`}>
            <Card.Body className={`${styles.cardBody}`}>
                {isIcons && (
                    <div className={`${styles.iconBox}`}>
                        <Image src={iconPath} alt="logo" width={30} height={30} className={styles.iconCard} />
                    </div>
                )}
                <div className={`${styles.cardInfo}`}>
                    <Card.Title className={`${styles.cardTitle}`}>{title}</Card.Title>
                    <Card.Text className={`${styles.cardText}`}>{description}</Card.Text>
                </div>
                <div className={`${styles.btnWrpper} `}>
                    <Button variant={buttonVariant} className={styles.joinButton} onClick={onClick}>
                        {buttonText}
                        <CaretRight size={20} weight="bold" />
                    </Button>
                    {isLimited && (
                        <small>
                            Places left: {limitNumber}
                        </small>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

interface PackageBoxProps {
    title: string;
    price: string;
    includes: string;
    features: { text: string; included: boolean }[];
    pricingDetails: { label: string; value: string }[];
    selectedPackage: string | null;
    onSelect: () => void;
    className?: string;
}

const PackageBox: React.FC<PackageBoxProps> = ({
    title,
    price,
    includes,
    features,
    pricingDetails,
    selectedPackage,
    onSelect,
    className,
}) => {
    return (
        <div className={`${styles.packageBoxCommon} ${className} ${selectedPackage === title ? styles.selectedPackage : ''}`}
            onClick={onSelect}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onSelect();
                }
            }}
        >
            <span className={`${styles.packageTitle}`}>{title}</span>
            <span className={`${styles.packagePrice}`}>{price}</span>
            <p className={`${styles.packageIncludes}`}>{includes}</p>
            <div className={`${styles.packageListWrps}`}>
                <span className={`${styles.packageLine}`}>Wholesale Pricing on</span>
                <ul>
                    {features.map((feature, index) => (
                        <li key={index} className={`${styles.listLi} ${feature.included ? styles.inludesLi : styles.excludesLi}`}>
                            {feature.included ? <CheckCircle size={24} /> : <XCircle size={24} />}
                            {feature.text}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`${styles.packagePricing}`}>
                {pricingDetails.map((detail, index) => (
                    <div key={index} className={`${styles.pricingLine}`}>
                        <span>{detail.label}</span>
                        <span>{detail.value}</span>
                    </div>
                ))}
            </div>
            <Button variant="outline" 
                className={`${selectedPackage === title ? styles.selected : ''}`}>
                {selectedPackage === title ? (
                    <>
                        <CheckCircle size={24} weight="fill" /> Selected
                    </>
                ) : (
                    "Select this package"
                )}
            </Button>
        </div>
    );
};

interface FormRightWrapperProps {
    sticky?: boolean;
    children: React.ReactNode;
}

const FormRightWrapper: React.FC<FormRightWrapperProps> = ({ sticky = false, children }) => {
    const [isSticky, setIsSticky] = useState(sticky);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 991) {
                setIsSticky(false);
            } else {
                setIsSticky(sticky);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [sticky]);

    const stickyStyles: React.CSSProperties = isSticky
        ? {
            position: 'sticky',
            top: 25,
            alignSelf: 'flex-start',
            height: '100vh',
            overflowY: 'auto',
        }
        : {};

    return (
        <div style={stickyStyles} className={styles.formRightWrapper}>
            {children}
        </div>
    );
};

const SignUpView: React.FC = () => {
    const [showPackageBox, setShowPackageBox] = useState(false);
    const [showFormBox, setShowFormBox] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [skipButtonText, setSkipButtonText] = useState("Skip now");

    const handleJoinAffiliateClick = () => {
        setShowPackageBox(true);
        setShowFormBox(false);
    };

    const handlePreviousClick = () => {
        setSelectedPackage(null);
        setSkipButtonText("Skip now");
        setShowPackageBox(false);
        setShowFormBox(false);
    };

    const handleSkipNowClick = () => {
        setShowPackageBox(false); 
        setShowFormBox(true); 
    };

    const handleSelectPackageClick = (packageName: string) => {
        setSelectedPackage(packageName); 
        setSkipButtonText("Continue"); 
    };

    const handleClearSelectionClick = () => {
        setSelectedPackage(null); 
        setSkipButtonText("Skip now"); 
    };

    const handleContinueClick = () => {
        if (selectedPackage) {
            setShowPackageBox(false);
            setShowFormBox(true); 
        } else {
            handleSkipNowClick();
        }
    };

    const packages = [
        {
            title: "Insider",
            price: "200",
            includes: "Rewards Points Included",
            features: [
                { text: "Hotels", included: true },
                { text: "Flights", included: true },
                { text: "Rental Cars", included: true },
                { text: "Cruises", included: false },
                { text: "Activities", included: false },
                { text: "Private Homes", included: false },
                { text: "Condo Weeks", included: false },
                { text: "Unique Experiences", included: false },
                { text: "Sailboats", included: false },
                { text: "Yachts", included: false },
                { text: "Concierge Service 24/7", included: false },
            ],
            pricingDetails: [
                { label: "One-Time Activation", value: "$199.00" },
                { label: "Monthly Subscription", value: "$69.99" },
                { label: "Total Due Today", value: "$268.99" },
            ],
            className: styles.packageGreen,
        },
        {
            title: "Explorer",
            price: "300",
            includes: "Rewards Points Included",
            features: [
                { text: "Hotels", included: true },
                { text: "Flights", included: true },
                { text: "Rental Cars", included: true },
                { text: "Cruises", included: true },
                { text: "Activities", included: true },
                { text: "Private Homes", included: true },
                { text: "Condo Weeks", included: true },
                { text: "Unique Experiences", included: true },
                { text: "Sailboats", included: false },
                { text: "Yachts", included: false },
                { text: "Concierge Service 24/7", included: false },
            ],
            pricingDetails: [
                { label: "One-Time Activation", value: "$299.00" },
                { label: "Monthly Subscription", value: "$99.99" },
                { label: "Total Due Today", value: "$398.99" },
            ],
            className: styles.packageBlue,
        },
        {
            title: "Elite",
            price: "400",
            includes: "Rewards Points Included",
            features: [
                { text: "Hotels", included: true },
                { text: "Flights", included: true },
                { text: "Rental Cars", included: true },
                { text: "Cruises", included: true },
                { text: "Activities", included: true },
                { text: "Private Homes", included: true },
                { text: "Condo Weeks", included: true },
                { text: "Unique Experiences", included: true },
                { text: "Sailboats", included: true },
                { text: "Yachts", included: true },
                { text: "Concierge Service 24/7", included: true },
            ],
            pricingDetails: [
                { label: "One-Time Activation", value: "$399.00" },
                { label: "Monthly Subscription", value: "$129.99" },
                { label: "Total Due Today", value: "$528.99" },
            ],
            className: styles.packagePurple,
        },
    ];

    const canvasRef = useRef<any>(null);

    const resetCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.clearCanvas(); 
        }
    };

    const [password, setPassword] = useState<string>(""); 
    const [strength, setStrength] = useState<number>(0);
    const [showPassword, setShowPassword] = useState(false);

   
    const validatePassword = (value: string) => {
        let strengthLevel = 0;

        if (value.length >= 8) strengthLevel++;

        if (/[A-Za-z]/.test(value)) strengthLevel++;

        if (/\d/.test(value)) strengthLevel++;

        if (/[@$!%*#?&]/.test(value)) strengthLevel++;

        setStrength(strengthLevel);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className={`${styles.mainBox} ${styles.authBox} ${styles.signUpBoxWps}`}>
            <div className={`${styles.signUpWrapper}`}>
                <div className={`${styles.bubbleWrpper}`}></div>
                <div className={`${styles.bubbleWrpper} ${styles.bubble2}`}></div>
                <div className={`${styles.containBoxWrps}`}>
                    <Container className={`${styles.containBox}`}>
                        <div className={`${styles.headerBoxLine}`}>
                            <Image src="./../images/logo-white.svg" alt="logo" width={132} height={50} className={styles.logoWrps} />
                            <Button variant='link' href='/home' className={`${styles.linkBtn} commonBtn`}>
                                <CaretLeft size={24} weight="bold" />
                                Back to the site
                            </Button>
                        </div>
                        <div className={`${styles.signUpBox}`}>
                            {!showPackageBox && !showFormBox ? (
                                <Row>
                                    <div className={styles.commonCol}>
                                        <JoinCard
                                            isIcons={true}
                                            iconPath="./../images/rank.svg"
                                            title="Affiliate"
                                            description="Through our affiliate program, you will unlock rewards and incentives while experiencing better ways to play."
                                            buttonText="Join as Affiliate"
                                            className={styles.affiliateCard}
                                            limitNumber="267"
                                            onClick={handleJoinAffiliateClick}
                                        />
                                    </div>
                                    <div  className={styles.commonCol}>
                                        <JoinCard
                                            isIcons={true}
                                            iconPath="./../images/compass.svg"
                                            title="Member"
                                            description="Subscribe to experience our unique products and services, crafted with excellence to elevate your journey."
                                            buttonText="Join as Member"
                                            className={styles.memberCard}
                                            onClick={handleJoinAffiliateClick}
                                        />
                                    </div>
                                    <div  className={styles.commonCol}>
                                        <JoinCard
                                            title="First 500 Club"
                                            description="Join the club to receive unique benefits. The number of participants is limited — 500 members."
                                            buttonText="Join the club"
                                            className={styles.limitedCard}
                                            isLimited={true}
                                            limitNumber="456"
                                            buttonVariant="light"
                                        />
                                    </div>
                                </Row>
                            ) : showPackageBox ? (
                                <>
                                    <div className={`${styles.packageBoxLayout}`}>
                                        <div className={`${styles.packageBoxWrapper}`}>
                                            {packages.map((pkg, index) => (
                                                <PackageBox
                                                    key={index}
                                                    title={pkg.title}
                                                    price={pkg.price}
                                                    includes={pkg.includes}
                                                    features={pkg.features}
                                                    pricingDetails={pkg.pricingDetails}
                                                    selectedPackage={selectedPackage}
                                                    onSelect={() => handleSelectPackageClick(pkg.title)}
                                                    className={pkg.className}
                                                />
                                            ))}
                                        </div>
                                        <div className={`${styles.actionBtns}`}>
                                            <Button variant="light" className={`${styles.actionBtn} ${styles.prevBtn} commonActionBtn`} onClick={handlePreviousClick}>
                                                <CaretLeft size={20} />
                                                Previous
                                            </Button>
                                            <div className={`${styles.rightBtns}`}>
                                                {selectedPackage && (
                                                    <Button variant="primary" className={`${styles.actionBtn} ${styles.clearBtn}`} onClick={handleClearSelectionClick}>
                                                        <X size={20} />
                                                        Clear selection
                                                    </Button>
                                                )}
                                                <Button variant="primary" className={`${styles.actionBtn} commonActionBtn`} onClick={handleContinueClick}>
                                                    {skipButtonText}
                                                    <CaretRight size={20} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={` ${styles.fullFormBox}`}>
                                    <div className={`${styles.formOuterWrapper} `}>
                                        <div className={`${styles.leftWraper} `}>
                                            <div className={`${styles.formInnerBox} `}>
                                                <div className={`${styles.formHeader}`}>
                                                    Personal Information
                                                </div>
                                                <Form>
                                                    <Row className={styles.rowLines}>
                                                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                            <Form.Label htmlFor="">First Name</Form.Label>
                                                            <Form.Control id="" type="text" placeholder="First Name" />
                                                        </Form.Group>
                                                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                            <Form.Label htmlFor="">Last Name</Form.Label>
                                                            <Form.Control id="" type="text" placeholder="Last Name" />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className={styles.rowLines}>
                                                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                            <Form.Label htmlFor="">Email</Form.Label>
                                                            <Form.Control id="" type="email" placeholder="Email" />
                                                        </Form.Group>
                                                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                            <Form.Label htmlFor="">Phone</Form.Label>
                                                            <Form.Control id="" type="tel" placeholder="Enter Phone" />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className={styles.rowLines}>
                                                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                            <Form.Label htmlFor="dob">Date of Birth</Form.Label>
                                                            <Form.Control id="dob" type="date" />
                                                        </Form.Group>
                                                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                            <Form.Label htmlFor="">Username</Form.Label>
                                                            <Form.Control id="" type="text" placeholder="Enter Username" />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className={styles.rowLines}>
                                                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                            <Form.Label htmlFor="dob">Password</Form.Label>
                                                            <span className={styles.inputWithIcon}>
                                                                <Form.Control id="confirmPassword"
                                                                    type={showPassword ? "text" : "password"}
                                                                    value={password}
                                                                    onChange={handlePasswordChange}
                                                                />
                                                                <span onClick={toggleShowPassword} className={styles.inputIcon}>
                                                                    {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
                                                                </span>
                                                            </span>
                                                            <div className={styles.strengthIndicator}>
                                                                {[...Array(4)].map((_, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className={`${styles.strengthLine} ${index < strength ? styles.green : styles.gray
                                                                            }`}
                                                                    ></div>
                                                                ))}
                                                            </div>
                                                            <small className={styles.passwordRequirements}>
                                                                Use 8 or more characters with a mix of letters, numbers & symbols.
                                                            </small>
                                                        </Form.Group>
                                                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                            <Form.Label htmlFor="">Confirm Password</Form.Label>
                                                            <span className={styles.inputWithIcon}>
                                                                <Form.Control id=""
                                                                    type="password"
                                                                />
                                                            </span>
                                                        </Form.Group>
                                                    </Row>
                                                </Form>
                                            </div>
                                            <div className={`${styles.formInnerBox} `}>
                                                <div className={`${styles.formHeader}`}>
                                                    Payment Information
                                                </div>
                                                <Form>
                                                    <Row className={styles.rowLines}>
                                                        <Form.Group className="col-12">
                                                            <Form.Label htmlFor="">Card Holder Name</Form.Label>
                                                            <Form.Control id="cardName"
                                                                type="text"
                                                                placeholder="Card Holder Name"
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className={styles.rowLines}>
                                                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                            <Form.Label htmlFor="">Card number</Form.Label>
                                                            <Form.Control id="" type="text" placeholder="Card Number" />
                                                        </Form.Group>
                                                        <div className={`${styles.wFullXsm} col-6`}>
                                                            <Row>
                                                                <Form.Group className={`col-6`}>
                                                                    <Form.Label htmlFor="">Expiration</Form.Label>
                                                                    <Form.Control id="" type="text" placeholder="MM/YY" />
                                                                </Form.Group>
                                                                <Form.Group className={`col-6`}>
                                                                    <Form.Label htmlFor="">CVC</Form.Label>
                                                                    <Form.Control id="" type="number" placeholder="CVC" />
                                                                </Form.Group>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className={styles.rowLines}>
                                                        <Form.Check
                                                            inline
                                                            label="Save my card details for future purchases"
                                                            name="group1"
                                                            type="checkbox"
                                                            id="id1"
                                                            className={`${styles.checkboxLabel}`}
                                                        />
                                                    </Row>
                                                    <Row className={styles.rowLines}>
                                                        <Form.Group className={`${styles.wFullXsm} col-6`}>
                                                            <Form.Label htmlFor="">Promo code</Form.Label>
                                                            <Form.Control id="" type="text" />
                                                        </Form.Group>
                                                    </Row>
                                                </Form>
                                            </div>
                                            <div className={`${styles.formInnerBox} `}>
                                                <div className={`${styles.formHeader}`}>
                                                    Sign a Payment
                                                </div>
                                                <div className={`${styles.headlineCanvas}`}>
                                                    Sign below on a dashed field:
                                                    <Button onClick={resetCanvas} className={`${styles.clearBtn}`} variant="link">
                                                        <X size={16} />
                                                        Clear
                                                    </Button>
                                                </div>
                                                <ReactSketchCanvas
                                                    ref={canvasRef}
                                                    style={styles}
                                                    width="600"
                                                    height="500"
                                                    strokeWidth={2}
                                                    strokeColor="black"
                                                    className={styles.signCanvas}
                                                />
                                                <Form>
                                                    <Row className={styles.rowLines}>
                                                        <Form.Check
                                                            inline
                                                            label="I agree to the terms & conditions and the privacy policy as documented here ."
                                                            name="group1"
                                                            type="checkbox"
                                                            id="id12"
                                                            className={`${styles.checkboxLabel}`}
                                                        />
                                                   
                                                        <Form.Check
                                                            inline
                                                            label="I agree to receive marketing text messages once a week regarding sales and other promotional events at the phone number provided above to o2 Global and/or Escape Trips. Message & data rates may apply. Reply STOP to no longer receive messages at any time."
                                                            name="group1"
                                                            type="checkbox"
                                                            id="id3"
                                                            className={`${styles.checkboxLabel}`}
                                                        />
                                                  
                                                        <Form.Check
                                                            inline
                                                            label="I agree to receive customer support text messages as needed for the orders that I have placed at the phone number provided above to o2 Global and/or Escape Trips. Message & data rates may apply. Reply STOP to no longer receive messages at any time."
                                                            name="group1"
                                                            type="checkbox"
                                                            id="id4"
                                                            className={`${styles.checkboxLabel}`}
                                                        />
                                                    </Row>
                                                    <Row className={styles.rowLines}>
                                                        <small className={styles.infoText}>
                                                        *Field is required to submit the form
                                                        </small>
                                                    </Row>
                                                </Form>
                                            </div>
                                            <div className={`${styles.actionBtns}`}>
                                                <Button variant="light" className={`${styles.actionBtn} ${styles.prevBtn} commonActionBtn`} onClick={handlePreviousClick}>
                                                    <CaretLeft size={20} />
                                                    Previous
                                                </Button>
                                                <Button variant="primary" className={`${styles.actionBtn} commonActionBtn`}>
                                                    Submit
                                                </Button>
                                            </div>
                                        </div>

                                    </div>
                                    {selectedPackage && (
                                        <FormRightWrapper sticky={true}>
                                            <div className={`${styles.rightWraper}`}>
                                                <span className={`${styles.packageTitle}`}> {selectedPackage}</span>
                                                {packages
                                                    .filter((pkg) => pkg.title === selectedPackage)
                                                    .map((pkg, index) => (
                                                        <div key={index} className={`${styles.packageDetails}`}>
                                                            <span className={`${styles.packagePrice}`}> {pkg.price}</span>
                                                            <span className={`${styles.packageIncludes}`}>Includes: {pkg.includes}</span>
                                                            <div className={`${styles.packageListWrps}`}>
                                                                <span className={`${styles.packageLine}`}>Wholesale Pricing on</span>
                                                                <ul>
                                                                    {pkg.features.map((feature, idx) => (
                                                                        <li key={idx} className={`${styles.listLi} ${feature.included ? styles.inludesLi : styles.excludesLi}`}>
                                                                            {feature.included ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                                                            {feature.text}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div className={`${styles.packagePricing} ${styles.packagePricingBox}`}>
                                                                {pkg.pricingDetails.map((detail, idx) => (
                                                                    <div key={idx} className={`${styles.pricingLine}`}>
                                                                        <span>{detail.label}:</span>
                                                                        <span>{detail.value}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                            <small className={styles.conditionTxt}>
                                            * Affiliate fees are nonrefundable.
                                            </small>
                                            <small className={styles.conditionTxt}>
                                            ** Technology fees are nonrefundable
                                            </small>
                                        </FormRightWrapper>
                                    )}
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            </div>
        </section>
    );
};

export default SignUpView;