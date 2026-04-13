import { apiClient } from './client'

/**
 * CHAT SERVICE - Works with existing /chat endpoint
 */
export const chatApi = {
  /**
   * Send message to chatbot (multilingual support)
   * @param {string} message - User message
   * @param {string} language - Response language: en | hi | mr
   * @returns {Promise<{response, lang, source}>}
   */
  sendMessage: async (message, language = 'en') => {
    try {
      const response = await apiClient.post(`/chat/multilingual`, null, {
        params: {
          query: message,
          lang: language,
        },
      })
      // Handle both response.data and direct response structure
      return response.data || response
    } catch (error) {
      console.error('[chatApi.sendMessage] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Send message with history (streaming support)
   * @param {string} message - Current message
   * @param {Array} history - Conversation history
   * @param {string} language - Response language
   * @param {boolean} stream - Enable streaming?
   */
  sendMessageWithHistory: async (message, history = [], language = 'en', stream = false) => {
    try {
      const response = await apiClient.post(`/chat`, {
        message,
        history: history || [],
        language,
        stream,
      })
      return response.data || response
    } catch (error) {
      console.error('[chatApi.sendMessageWithHistory] Error:', error.response?.data || error.message)
      throw error
    }
  },
}

/**
 * WEATHER SERVICE - Works with existing /weather/risk endpoint
 */
export const weatherApi = {
  /**
   * Get weather risk score for a location
   * @param {number} latitude - Latitude
   * @param {number} longitude - Longitude
   * @returns {Promise<{flood_risk, drought_risk, rainfall, timestamp}>}
   */
  getRiskScore: async (latitude, longitude) => {
    try {
      const response = await apiClient.get(`/weather/risk`, {
        params: {
          latitude,
          longitude,
        },
      })
      return response.data || response
    } catch (error) {
      console.error('[weatherApi.getRiskScore] Error:', error.response?.data || error.message)
      throw error
    }
  },
}

/**
 * AUTH SERVICE - Will integrate with Dev B's backend
 * Endpoints: POST /api/v1/auth/register, POST /api/v1/auth/login
 */
export const authApi = {
  /**
   * Login with credentials
   * Endpoint: POST /auth/login
   * @param {string} email - Email or phone
   * @param {string} password - Password
   * @returns {Promise<{access_token, token_type, role}>}
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post(`/auth/login`, {
        email,
        password,
      })
      const data = response.data || response
      // Store token if available
      if (data.access_token) {
        localStorage.setItem('authToken', data.access_token)
        if (data.role) localStorage.setItem('authRole', data.role)
      }
      return data
    } catch (error) {
      console.error('[authApi.login] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Register new farmer
   * Endpoint: POST /auth/register
   * @param {Object} data - Farmer registration data
   * @returns {Promise<{access_token, token_type, role}>}
   */
  register: async (data) => {
    try {
      const response = await apiClient.post(`/auth/register`, data)
      const result = response.data || response
      if (result.access_token) {
        localStorage.setItem('authToken', result.access_token)
        if (result.role) localStorage.setItem('authRole', result.role)
      }
      return result
    } catch (error) {
      console.error('[authApi.register] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Logout
   */
  logout: async () => {
    try {
      await apiClient.post(`/auth/logout`)
    } catch (error) {
      console.warn('[authApi.logout] Error:', error.message)
    } finally {
      localStorage.removeItem('authToken')
      localStorage.removeItem('authRole')
    }
  },
}

/**
 * FARMERS SERVICE - Integrates with Dev B's backend
 * Endpoints: GET/POST/PUT /api/v1/farmers/{id}
 */
export const farmersApi = {
  /**
   * Get farmer profile
   * Endpoint: GET /farmers/{id}
   * @param {string} farmerId - Farmer ID
   */
  getProfile: async (farmerId) => {
    try {
      const response = await apiClient.get(`/farmers/${farmerId}`)
      return response.data || response
    } catch (error) {
      console.error('[farmersApi.getProfile] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Update farmer profile
   * Endpoint: PUT /farmers/{id}
   * @param {string} farmerId - Farmer ID
   * @param {Object} data - Updated profile data
   */
  updateProfile: async (farmerId, data) => {
    try {
      const response = await apiClient.put(`/farmers/${farmerId}`, data)
      return response.data || response
    } catch (error) {
      console.error('[farmersApi.updateProfile] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Register new farmer (public endpoint)
   * Endpoint: POST /farmers
   * @param {Object} data - Farmer registration data
   */
  registerFarmer: async (data) => {
    try {
      const response = await apiClient.post(`/farmers`, data)
      return response.data || response
    } catch (error) {
      console.error('[farmersApi.registerFarmer] Error:', error.response?.data || error.message)
      throw error
    }
  },
}

/**
 * CLAIMS SERVICE - Integrates with Dev B's backend
 * Endpoints: POST /api/v1/claims, GET /api/v1/claims/{id}, PATCH /api/v1/claims/{id}/status
 */
export const claimsApi = {
  /**
   * Create new claim
   * Endpoint: POST /claims
   * @param {Object} data - Claim data {farmer_id, damage_type, description, gps_lat, gps_lng, image_path?}
   * @returns {Promise<{id, status, ...}>}
   */
  createClaim: async (data) => {
    try {
      const response = await apiClient.post(`/claims`, data)
      return response.data || response
    } catch (error) {
      console.error('[claimsApi.createClaim] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Get claim details
   * Endpoint: GET /claims/{id}
   * @param {string|number} claimId - Claim ID
   */
  getClaimDetails: async (claimId) => {
    try {
      const response = await apiClient.get(`/claims/${claimId}`)
      return response.data || response
    } catch (error) {
      console.error('[claimsApi.getClaimDetails] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * List farmer's claims
   * Endpoint: GET /claims?status={status}&farmer_id={id}
   * @param {Object} filters - {status, farmer_id, date_range, etc.}
   */
  listClaims: async (filters = {}) => {
    try {
      const response = await apiClient.get(`/claims`, {
        params: filters,
      })
      return response.data || response
    } catch (error) {
      console.error('[claimsApi.listClaims] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Update claim status (Admin/Field Officer only)
   * Endpoint: PATCH /claims/{id}/status
   * @param {string|number} claimId - Claim ID
   * @param {Object} data - {status, decision_notes?, ...}
   */
  updateStatus: async (claimId, data) => {
    try {
      const response = await apiClient.patch(`/claims/${claimId}/status`, data)
      return response.data || response
    } catch (error) {
      console.error('[claimsApi.updateStatus] Error:', error.response?.data || error.message)
      throw error
    }
  },
}

/**
 * GRIEVANCES SERVICE - Integrates with Dev B's backend
 * Endpoints: POST /api/v1/grievances, GET /api/v1/grievances/{id}, PATCH /api/v1/grievances/{id}/status
 */
export const grievancesApi = {
  /**
   * Create new grievance
   * Endpoint: POST /grievances
   * @param {Object} data - Grievance data {category, description, farmer_id?, ...}
   */
  createGrievance: async (data) => {
    try {
      const response = await apiClient.post(`/grievances`, data)
      return response.data || response
    } catch (error) {
      console.error('[grievancesApi.createGrievance] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Get grievance details
   * Endpoint: GET /grievances/{id}
   * @param {string|number} grievanceId - Grievance ID
   */
  getGrievanceDetails: async (grievanceId) => {
    try {
      const response = await apiClient.get(`/grievances/${grievanceId}`)
      return response.data || response
    } catch (error) {
      console.error('[grievancesApi.getGrievanceDetails] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * List grievances
   * Endpoint: GET /grievances?status={status}&category={category}
   * @param {Object} filters - {status, category, assignee, date_range, etc.}
   */
  listGrievances: async (filters = {}) => {
    try {
      const response = await apiClient.get(`/grievances`, {
        params: filters,
      })
      return response.data || response
    } catch (error) {
      console.error('[grievancesApi.listGrievances] Error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Update grievance status
   * Endpoint: PATCH /grievances/{id}/status
   * @param {string|number} grievanceId - Grievance ID
   * @param {Object} data - {status, assignee?, notes?, ...}
   */
  updateStatus: async (grievanceId, data) => {
    try {
      const response = await apiClient.patch(`/grievances/${grievanceId}/status`, data)
      return response.data || response
    } catch (error) {
      console.error('[grievancesApi.updateStatus] Error:', error.response?.data || error.message)
      throw error
    }
  },
}

export default {
  chatApi,
  weatherApi,
  authApi,
  farmersApi,
  claimsApi,
  grievancesApi,
}
