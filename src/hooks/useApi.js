import { useState, useCallback } from 'react'
import { getErrorMessage, shouldRetry, formatErrorLog } from '../utils/apiErrors'

/**
 * Custom hook for making API calls with error handling and loading state
 * Usage:
 *   const { data, loading, error, execute } = useApi()
 *   const handleClick = () => execute(apiFunction)
 */
export const useApi = (initialData = null) => {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(
    async (apiFunction, options = {}) => {
      const {
        onSuccess,
        onError,
        retries = 1,
        onRetry,
      } = options

      let lastError = null
      let attempt = 0

      while (attempt <= retries) {
        try {
          setLoading(true)
          setError(null)

          const result = await apiFunction()

          setData(result)
          setLoading(false)
          setError(null)

          if (onSuccess) {
            onSuccess(result)
          }

          return result
        } catch (err) {
          lastError = err
          attempt++

          // Log error for debugging
          console.error(`[API Error] Attempt ${attempt}/${retries + 1}:`, formatErrorLog(err))

          // Check if we should retry
          if (attempt <= retries && shouldRetry(err)) {
            if (onRetry) {
              onRetry(attempt)
            }
            // Wait before retrying (exponential backoff)
            await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
            continue
          }

          // Final error - stop retrying
          break
        }
      }

      // All retries exhausted
      const errorMessage = getErrorMessage(lastError)
      setLoading(false)
      setError(errorMessage)

      if (onError) {
        onError(lastError)
      }

      throw lastError
    },
    []
  )

  const reset = useCallback(() => {
    setData(initialData)
    setError(null)
    setLoading(false)
  }, [initialData])

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData,
    setError,
  }
}

/**
 * Hook for list APIs (get, filter, paginate)
 */
export const useApiList = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  })

  const fetch = useCallback(
    async (apiFunction, params = {}) => {
      try {
        setLoading(true)
        setError(null)

        const result = await apiFunction(params)

        setItems(result.items || result.data || [])
        if (result.pagination) {
          setPagination(result.pagination)
        }

        return result
      } catch (err) {
        const errorMessage = getErrorMessage(err)
        setError(errorMessage)
        console.error('[API Error]:', formatErrorLog(err))
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const reset = useCallback(() => {
    setItems([])
    setError(null)
    setLoading(false)
    setPagination({ page: 1, limit: 10, total: 0 })
  }, [])

  return {
    items,
    loading,
    error,
    pagination,
    fetch,
    reset,
    setItems,
  }
}

/**
 * Hook for mutation APIs (post, put, patch, delete)
 */
export const useApiMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const mutate = useCallback(
    async (apiFunction, options = {}) => {
      const {
        onSuccess,
        onError,
      } = options

      try {
        setLoading(true)
        setError(null)
        setSuccess(false)

        const result = await apiFunction()

        setSuccess(true)
        setLoading(false)

        if (onSuccess) {
          onSuccess(result)
        }

        return result
      } catch (err) {
        const errorMessage = getErrorMessage(err)
        setError(errorMessage)
        setSuccess(false)
        setLoading(false)

        console.error('[API Error]:', formatErrorLog(err))

        if (onError) {
          onError(err)
        }

        throw err
      }
    },
    []
  )

  const reset = useCallback(() => {
    setError(null)
    setSuccess(false)
    setLoading(false)
  }, [])

  return {
    loading,
    error,
    success,
    mutate,
    reset,
  }
}
