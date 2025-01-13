/* eslint-disable react-hooks/exhaustive-deps */
import { recaptcha_key } from "constants/index"
import { useCallback, useEffect, useState } from "react"

export function useRecaptcha() {

  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false)
  const [recaptcha, setRecaptcha] = useState('')
  const verifyRecaptchaCallback = useCallback((token: string) => {
    setRecaptcha(token)
  }, [refreshReCaptcha])

  const onRefreshRecaptcha = () => setRefreshReCaptcha(r => !r)

  useEffect(() => {
    onRefreshRecaptcha()
    return () => {
      onRefreshRecaptcha()
    }
  }, [])

  return {
    recaptcha_key,
    refreshReCaptcha,
    onRefreshRecaptcha,
    verifyRecaptchaCallback,
    recaptcha
  }
}