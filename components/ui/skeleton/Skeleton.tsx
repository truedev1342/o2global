'use client'
import { classNameSupport } from '@/lib'
import styles from './skeleton.module.scss'
import { SkeletonProps } from '@/types/interface'

const Skeleton = ({
  tag: Tag = 'div',
  lang = '',
  height = '',
  width = '',
  count = '',
  radius = ''
}: SkeletonProps) => {
  const diractionClass = classNameSupport(lang)
  return (
    <Tag
      className={`${styles.skeletonWrap}`}
      style={{
        height: height ? height : '100%',
        width: width ? width : '100%',
        borderRadius: radius ? radius : '0px',
        overflow: radius ? 'hidden' : 'unset'
      }}
    >
      {count !== '' ? (
        [...Array(count)]?.map((_, index: number) => (
          <span
            key={index}
            className={`d-inline-flex w-100 ${styles.skeleton} ${
              diractionClass === 'rtl' ? `${styles.rtl}` : ''
            }`}
          ></span>
        ))
      ) : (
        <span
          className={`d-inline-flex w-100 ${styles.skeleton} ${
            diractionClass === 'rtl' ? `${styles.rtl}` : ''
          }`}
        ></span>
      )}
    </Tag>
  )
}

export default Skeleton
