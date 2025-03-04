'use client'
import React, { useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import HeaderComp from '@/components/Header/header'
import layotStyles from "@/components/page/home/Home.module.scss";
import Sidebar from '@/components/sidebar/SideBar';
import { usePageContext } from '@/context/PageContext';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOverlay, setIsOverlay] = useState<any>('false');

  const { openOverlay } = usePageContext()

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    localStorage.setItem('isOverlay', String(!collapsed));
    setIsOverlay(!collapsed)
  };

  useEffect(() => {
    const overlay = localStorage.getItem('isOverlay');
    setIsOverlay(overlay)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const handleOverlayClick = () => {
    toggleSidebar();
  };

  return (
    <RecoilRoot>
      <main
        className={`mainBoxWrapper ${collapsed && isMobile ? layotStyles.overflowHidden : ''}`}
      >
        <section className={layotStyles.mainBox}>
          <Sidebar collapsed={collapsed} />
          {openOverlay && <div
            className={`${layotStyles.overlayBox} ${layotStyles.overlayVisible}`}
          ></div>}
          {isMobile ? (
            <div
              className={`${layotStyles.overlayBox} ${!collapsed ? layotStyles.overlayinVisible : layotStyles.overlayVisible}`}
              onClick={handleOverlayClick}
            ></div>
          ) : (
            ''
          )}
          <div
            className={`${layotStyles.rightSection} ${collapsed ? layotStyles.expanded : layotStyles.shrinked
              } rightSection`}
          >
            <HeaderComp collapsed={collapsed} toggleSidebar={toggleSidebar} />
            {children}
          </div>
        </section>
      </main>
    </RecoilRoot>
  );
};

export default PageLayout;
