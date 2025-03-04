import React, { useState } from 'react';
import { Button, Form, Image, InputGroup } from 'react-bootstrap';
import styles from './Account.module.scss';
import { MessengerLogo, TelegramLogo, WarningCircle, WhatsappLogo } from '@phosphor-icons/react';


const SocialMessengerView: React.FC = () => {
    type SwitchId = "switch1" | "switch2" | "switch3";

    const [switchStates, setSwitchStates] = useState<Record<SwitchId, boolean>>({
        switch1: true,
        switch2: true,
        switch3: true,
    });

    const handleSwitchChange = (id: SwitchId) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSwitchStates((prevState) => ({
            ...prevState,
            [id]: e.target.checked,
        }));
    };

    const inputs: {
        id: SwitchId;
        label: string;
        placeholder: string;
        disabledIcon: JSX.Element;
        enabledIcon: JSX.Element;
    }[] = [
            {
                id: "switch1",
                label: "Messenger",
                placeholder: "FB messaging",
                disabledIcon: <Image src="./../images/grayIcon1.svg" alt="Messenger" width={24} height={24} className={styles.gryIcons} />,
                enabledIcon: <Image src="./../images/coloredIcon1.svg" alt="Messenger" width={24} height={24} className={styles.colordIcons} />,
            },
            {
                id: "switch2",
                label: "Whatsapp",
                placeholder: "Whats app",
                disabledIcon: <Image src="./../images/grayIcon2.svg" alt="Messenger" width={24} height={24} className={styles.gryIcons} />,
                enabledIcon: <Image src="./../images/coloredIcon2.svg" alt="WhatsApp" width={24} height={24} className={styles.colordIcons} />,
            },
            {
                id: "switch3",
                label: "Telegram",
                placeholder: "Telegram",
                disabledIcon: <Image src="./../images/grayIcon3.svg" alt="Messenger" width={24} height={24} className={styles.gryIcons} />,
                enabledIcon: <Image src="./../images/coloredIcon3.svg" alt="Telegram" width={24} height={24} className={styles.colordIcons} />,
            },
        ];

    return (
        <div className={`${styles.accountSetting} ${styles.legacyBox} ${styles.commonBoxCard}`}>
            <div className={`${styles.titleBar}`}>
                <h3>Social Messenger</h3>
                <p>This is for your upline to contact you on social platforms</p>
            </div>
            <div className={`${styles.enrollAnouncmenBox} enrollAnouncmenBox`}>
                <p className={`${styles.anPBox} anPBox`}>
                    <WarningCircle weight="fill" size={24} />
                    Please enter the information for who will own your O2 Global Affiliate position if something happens to you. We will contact and transfer ownership to them.
                </p>
            </div>
            <Form>
                <div className={styles.rowLinesMb}>
                    {inputs.map(({ id, label, placeholder, disabledIcon, enabledIcon }) => (
                        <Form.Group className={`${styles.inputGroupWrapper}`} key={id}>
                            <Form.Switch
                                id={id}
                                checked={switchStates[id]}
                                onChange={handleSwitchChange(id)}
                                className={`${styles.inputSwitch}`}
                            />
                            <div className={`${styles.inputGroups}`}>
                                <Form.Label htmlFor={id}>{label}</Form.Label>
                                <InputGroup className={`${styles.inputBoxWrapper}`}>
                                    <InputGroup.Text className={`${styles.inputGroupIcon}`}>
                                        {switchStates[id] ? enabledIcon : disabledIcon}
                                    </InputGroup.Text>
                                    <Form.Control
                                        id={id}
                                        type="text"
                                        placeholder={placeholder}
                                        disabled={!switchStates[id]}
                                    />
                                </InputGroup>
                            </div>
                        </Form.Group>
                    ))}
                </div>
            </Form>
            <div className={`${styles.switchBoxesWrapper} d-flex justify-content-start`}>
                <div className={styles.rightWrapper}>
                    <Button variant="outline-primary" className={`${styles.saveBtn} commonActionOutlineBtn`}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default SocialMessengerView;

