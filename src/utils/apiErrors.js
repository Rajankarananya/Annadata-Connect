/**
 * API Error Handling Utilities
 */

/**
 * Parse API error response to user-friendly message
 * @param {Error} error - Axios error object
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  // Network error
  if (!error.response) {
    if (error.message === 'Network Error') {
      return 'Network error. Check your connection.'
    }
    return error.message || 'An unexpected error occurred'
  }

  const { status, data } = error.response

  // Backend error response with detail
  if (data?.detail) {
    return data.detail
  }

  // Backend error response with message
  if (data?.message) {
    return data.message
  }

  // HTTP status codes
  switch (status) {
    case 400:
      return 'Invalid request. Please check your input.'
    case 401:
      return 'Your session has expired. Please login again.'
    case 403:
      return 'You do not have permission to perform this action.'
    case 404:
      return 'The requested resource was not found.'
    case 422:
      return 'Validation error. Please check your input.'
    case 500:
      return 'Server error. Please try again later.'
    case 502:
      return 'Service unavailable. Please try again later.'
    case 503:
      return 'Service is temporarily unavailable. Please try again later.'
    case 504:
      return 'Request timeout. Please try again.'
    default:
      return `Error: ${status} ${error.response.statusText}`
  }
}

/**
 * Check if error is authentication-related
 * @param {Error} error - Axios error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error?.response?.status === 401 || error?.response?.status === 403
}

/**
 * Check if error is validation error
 * @param {Error} error - Axios error object
 * @returns {boolean}
 */
export const isValidationError = (error) => {
  return error?.response?.status === 422 || error?.response?.status === 400
}

/**
 * Check if error is server error
 * @param {Error} error - Axios error object
 * @returns {boolean}
 */
export const isServerError = (error) => {
  return (error?.response?.status || 0) >= 500
}

/**
 * Check if error is network error
 * @param {Error} error - Axios error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return !error.response && error.message === 'Network Error'
}

/**
 * Get validation errors object from response
 * Useful for form-level error display
 * @param {Error} error - Axios error object
 * @returns {Object} Field errors
 */
export const getValidationErrors = (error) => {
  if (error?.response?.status === 422) {
    // Expecting FastAPI validation error format: {detail: [{loc: [...], msg: "..."}]}
    const details = error.response.data?.detail || []
    const errors = {}

    if (Array.isArray(details)) {
      details.forEach((err) => {
        if (err.loc && Array.isArray(err.loc) && err.loc.length > 0) {
          const field = err.loc[err.loc.length - 1]
          errors[field] = err.msg
        }
      })
    }

    return errors
  }

  return {}
}

/**
 * Determine if we should retry the request
 * @param {Error} error - Axios error object
 * @returns {boolean}
 */
export const shouldRetry = (error) => {
  if (!error.response) {
    // Network errors, timeout - retry
    return true
  }

  const { status } = error.response
  // Retry on 5xx and 429 (too many requests)
  return (status >= 500 && status < 600) || status === 429
}

/**
 * Format error for logging
 * @param {Error} error - Axios error object
 * @returns {Object} Structured error info
 */
export const formatErrorLog = (error) => {
  return {
    message: getErrorMessage(error),
    status: error?.response?.status,
    endpoint: error?.config?.url,
    method: error?.config?.method,
    timestamp: new Date().toISOString(),
  }
}
