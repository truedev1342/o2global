'use client'
import React, { useEffect, useCallback } from 'react'
import { SetterOrUpdater } from 'recoil'

type UseOutsideClickProps<
  TButton extends HTMLElement,
  TDropdown extends HTMLElement,
  TState extends object | boolean
> = {
  buttonRef: React.RefObject<TButton>
  dropdownRef: React.RefObject<TDropdown>
  setState:
    | React.Dispatch<React.SetStateAction<TState>>
    | SetterOrUpdater<TState>
  isArrayState?: boolean
}

export const useOutsideClick = <
  TButton extends HTMLElement,
  TDropdown extends HTMLElement,
  TState extends object | boolean
>({
  buttonRef,
  dropdownRef,
  setState,
  isArrayState = false
}: UseOutsideClickProps<TButton, TDropdown, TState>) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!buttonRef.current || buttonRef.current.contains(e.target as Node)) {
        return
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        if (!isArrayState) {
          setState(false as TState)
        } else {
          setState((prevState) => {
            if (typeof prevState === 'boolean') return false as TState

            if (Array.isArray(prevState)) {
              return prevState.map((item) =>
                typeof item === 'object' && item !== null
                  ? Object.keys(item).reduce(
                      (acc, key) => ({
                        ...acc,
                        [key]: false
                      }),
                      {} as Record<string, boolean> // Accumulator narrowed to object
                    )
                  : item
              ) as TState
            }

            if (typeof prevState === 'object' && prevState !== null) {
              return Object.keys(prevState).reduce(
                (acc, key) => ({
                  ...acc,
                  [key]: false
                }),
                {} as Record<string, boolean> // Accumulator narrowed to object
              ) as TState
            }

            return prevState
          })
        }
      }
    },
    [buttonRef, dropdownRef, setState, isArrayState]
  )

  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside)
    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [handleClickOutside])

  return { buttonRef, dropdownRef }
}
