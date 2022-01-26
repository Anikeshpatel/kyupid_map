import { useEffect, useState } from "react"

const useQuery = (URL) => {
  const [res, setRes] = useState()
  const [status, setStatus] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)

  const refetch = async () => {
    setPending(true)
    try {
      const res = await fetch(URL)
      const data = await res.json()
      setRes(data)
      setStatus(res.status)
    } catch (error) {
      setError(error)
    } finally {
      setPending(false)
    }
  }


  useEffect(() => refetch(), [])

  return {
    res,
    pending,
    error,
    refetch,
    status
  }
}

export default useQuery
