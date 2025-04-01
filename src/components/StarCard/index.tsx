import { DISMISS_START_CARD_DATE_KEY } from '@/constants'
import { dismissStartCardDateAtom } from '@/store'
import { IS_MAC_OS, recordStarAction } from '@/utils'
import { Transition } from '@headlessui/react'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import IconStar from '~icons/material-symbols/star'
import IconStarOutline from '~icons/material-symbols/star-outline'
import IconCircleX from '~icons/tabler/circle-x'

export default function StarCard() {
  const [countdown, setCountdown] = useState(5)
  const [isCounting, setIsCounting] = useState(false)
  const setDismissStartCardDate = useSetAtom(dismissStartCardDateAtom)
  const [isShow, setIsShow] = useState(false)

  useLayoutEffect(() => {
    // 直接使用 jotai 的 dismissStartCardDate 其值先是默认值，然后才是 localStorage 中的值
    const value = window.localStorage.getItem(DISMISS_START_CARD_DATE_KEY) as Date | null
    if (value === null) {
      setIsShow(true)
    }
  }, [])

  const onClickCloseStar = useCallback(() => {
    setIsShow(false)
    setDismissStartCardDate(new Date())
    if (!isCounting) {
      recordStarAction('dismiss')
    }
  }, [setIsShow, setDismissStartCardDate, isCounting])

  const onClickWantStar = useCallback(() => {
    setIsCounting(true)
    setDismissStartCardDate(new Date())
    recordStarAction('star')
  }, [setDismissStartCardDate])

  useEffect(() => {
    let countdownId: number
    if (isCounting && countdown > 0) {
      countdownId = window.setInterval(() => {
        setCountdown((prevCount) => prevCount - 1)
      }, 1000)
    }
    if (countdown === 0) {
      setIsCounting(false)
      setIsShow(false)
    }

    return () => clearInterval(countdownId)
  }, [isCounting, countdown, setIsShow])

  const content = useMemo(() => {
    return ('')

  return ('')
}
