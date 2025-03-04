import React from "react";
import styles from "./CircularProgressBar.module.scss";

interface CircularLineGraphProps {
    current: number;
    total: number;
    className?: string;
    startColor?: string;
    endColor?: string;
    fabulousStatus?: keyof typeof fabulousStatusColor;
}

interface FabulousStatusColors {
    startColor: string;
    endColor: string;
}

const fabulousStatusColor: Record<"red" | "blue" | "green", FabulousStatusColors> = {
    red: {
        startColor: '#D80027',
        endColor: '#AF0020'
    },
    blue: {
        startColor: '#01E0FE',
        endColor: '#164FF2'
    },
    green: {
        startColor: '#00D470',
        endColor: '#00C267'
    }
}


const CircularLineGraph: React.FC<CircularLineGraphProps> = ({
    current,
    total,
    className,
    startColor,
    endColor,
    fabulousStatus
}) => {
    const percentage = (current / total) * 100;
    const circumference = 2 * Math.PI * 16; // For a circle with radius 16

    const epicStartColor =
        fabulousStatus && fabulousStatusColor[fabulousStatus]?.startColor
            ? fabulousStatusColor[fabulousStatus].startColor
            : startColor ?? "#000"; // Default to black if no color is provided

    const epicEndColor =
        fabulousStatus && fabulousStatusColor[fabulousStatus]?.endColor
            ? fabulousStatusColor[fabulousStatus].endColor
            : endColor ?? "#000"; // Default to black if no color is provided

    return (
        <div className={`${styles.containerBox} ${className ?? ""}`}>
            <svg className={styles.svg} viewBox="0 0 36 36">
                {/* Gradient Definition */}
                <defs>
                    <linearGradient id={`gradient-${fabulousStatus}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={epicStartColor} />
                        <stop offset="100%" stopColor={epicEndColor} />
                    </linearGradient>
                </defs>

                {/* Background Circle */}
                <circle
                    className={`${styles.background} darkBg`}
                    cx="18"
                    cy="18"
                    r="16"
                    style={{
                        strokeDasharray: `${circumference}`,
                        strokeDashoffset: 0,
                    }}
                />

                {/* Progress Circle */}
                <circle
                    className={styles.progress}
                    cx="18"
                    cy="18"
                    r="16"
                    style={{
                        strokeDasharray: `${circumference}`,
                        strokeDashoffset: `${circumference - (percentage / 100) * circumference}`,
                        stroke: `url(#gradient-${fabulousStatus})`,
                    }}
                />
            </svg>
            <div className={styles.text}>
                <p>Text</p>
                <p className={styles.percentage}>
                    {current}/{total}
                </p>
            </div>
        </div>
    );
};

export default CircularLineGraph;
