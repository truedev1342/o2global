import React from "react";
import styles from "./TagBoxes.module.scss";
import { Image } from "react-bootstrap";

interface TagBoxesProps {
    topLineText?: string;
    bottomLineText?: string;
    rankIcon?: string;
}

const TagBoxes: React.FC<TagBoxesProps> = ({
    topLineText,
    bottomLineText,
    rankIcon
}) => {

    return (
        <div className={styles.tagBoxs}>
            <div className={styles.leftBox}>
                <span className={styles.topLine}>{topLineText}</span>
                <span className={`${styles.bottomLine} bottomLine`}>{bottomLineText}</span>
            </div>
            <div className={styles.rightBox}>
                <span className={styles.iconWrapper}>
                    {rankIcon && (
                        <Image
                            src={rankIcon}
                            alt="icon"
                            width={46}
                            height={46}
                            className={styles.icnImg}
                        />
                    )}
                    {/* <Image src="{./../images/rankIcon.svg}" alt="icon" width={46} height={46} className={styles.icnImg} /> */}
                </span>
            </div>
        </div>
    );
};

export default TagBoxes;
