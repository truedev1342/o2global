import React from 'react'
import { openAuthModalAtom } from '@/recoil/atoms/atom'
import { useSetRecoilState } from 'recoil'

type ModalsType = 'auth' // add other here example 'login' | 'signup'

type HandleModalOpenTypes = {
  modalType: ModalsType
  e?: React.MouseEvent
  isMobile?: boolean
  stateValue: boolean
}
export const useOpenModal = () => {
  const setOpenAuthModal = useSetRecoilState(openAuthModalAtom)
  const setStateMap: Record<
    ModalsType,
    React.Dispatch<React.SetStateAction<boolean>>
  > = {
    auth: setOpenAuthModal
  }
  const handleModalOpen = ({
    e,
    modalType,
    stateValue,
    isMobile = false
  }: HandleModalOpenTypes) => {
    e?.stopPropagation()
    setStateMap[modalType](stateValue)
  }
  return { handleModalOpen }
}
