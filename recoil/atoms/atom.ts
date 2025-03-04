import { ActiveComponentTypes } from '@/types/type'
import { atom } from 'recoil'

export const searchQueryAtom = atom({
  key: 'searchQueryAtom',
  default: [
    {
      from: '',
      to: ''
    },
    {
      from: '',
      to: ''
    }
  ]
})

export const activeAuthComponent = atom<ActiveComponentTypes>({
  key: 'activeAuthComponent',
  default: 'LoginWelcome'
})

export const openAuthModalAtom = atom({
  key: 'openAuthModalAtom',
  default: false
})