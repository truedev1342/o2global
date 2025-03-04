'use client';
import React from 'react';
import styles from './ReplicateWebsite.module.scss';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  shareLinks: Record<string, string>;
  imageSrc: string;
}

const SocialIcon: React.FC<{ platform: string; link: string }> = ({ platform, link }) => {
  const iconMap: Record<string, string> = {
    facebook: '/images/fbIcn.svg',
    insta: '/images/instaIcn.svg',
    linkedin: '/images/linkedinIcn.svg',
    telegram: '/images/teleIcon.svg',
  };

  const iconSrc = iconMap[platform];

  if (!iconSrc) return null;

  return (
    <Link href={link} target="_blank" rel="noopener noreferrer" aria-label={platform}>
      <Image src={iconSrc} alt={platform} width={24} height={24} className={styles.icnImg} />
    </Link>
  );
};

const InfoCard: React.FC<CardProps> = ({ title, description, buttonText, buttonLink = '#', shareLinks, imageSrc }) => {
  return (
    <div className={`${styles.cardBoxWrp}`}>
      <div className={`${styles.imgWrp}`}>
        <Image src={imageSrc} alt={title} width={300} height={300} className={`${styles.cardImage}`} />
      </div>
      <div className={`${styles.cardInfo}`}>
        <h3 className={`${styles.cardTitle} cardTitleLine`}>{title}</h3>
        <p className={`${styles.cardDescription}`}>{description}</p>
        <div className={styles.socialIcons}>
          {Object.entries(shareLinks).map(([key, link]) => (
            <SocialIcon key={key} platform={key} link={link} />
          ))}
        </div>
        <div className={`${styles.cardbtnWrpper}`}>
          <Button href={buttonLink} className={`${styles.cardBtn}`}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

const ReplicateWebsitePage: React.FC = () => {
  const cardData: CardProps[] = [
    {
      title: 'O2 Global',
      description: 'https://www.o2global.com/username',
      buttonText: 'Copy Link',
      imageSrc: '/images/website.png',
      shareLinks: {
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=https://www.escapetrips.com/username',
        insta: 'https://twitter.com/intent/tweet?url=https://www.escapetrips.com/username',
        linkedin: 'https://www.linkedin.com/shareArticle?url=https://www.escapetrips.com/username',
        telegram: 'https://t.me/share/url?url=https://www.escapetrips.com/username',
      },
    },
    {
      title: 'Escape Trips',
      description: 'https://www.escapetrips.com/username',
      buttonText: 'Copy Link',
      imageSrc: '/images/website2.png',
      shareLinks: {
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=https://www.escapetrips.com/username',
        insta: 'https://twitter.com/intent/tweet?url=https://www.escapetrips.com/username',
        linkedin: 'https://www.linkedin.com/shareArticle?url=https://www.escapetrips.com/username',
        telegram: 'https://t.me/share/url?url=https://www.escapetrips.com/username',
      },
    },
  ];

  return (
    <div className={`${styles.mainBox}`}>
      <div className={`${styles.cardBoxMainWrapper}`}>
        {cardData.map((card, index) => (
          <InfoCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default ReplicateWebsitePage;
