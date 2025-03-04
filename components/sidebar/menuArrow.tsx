import React from 'react'
import styles from './Sidebar.module.scss'
import { CaretDown } from '@phosphor-icons/react'
const MenuArrow = ({ open, isMobile, hovered, collapsed }: { open: boolean; isMobile: boolean; hovered: boolean; collapsed: boolean; }) => {
    if (isMobile) {
        return (
            <span className={`${styles.arrowIcon} ${open ? styles.open : ""}`}>
                <CaretDown size={22} />
            </span>
        )
    } else {
        return (!collapsed || hovered) && (
            <span className={`${styles.arrowIcon} ${open ? styles.open : ""}`}>
                <CaretDown size={22} />
            </span>
        )
    }
}

export default MenuArrow
