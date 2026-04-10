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
    const response = await apiClient.post('/chat/multilingual', null, {
      params: {
        query: message,
        lang: language,
      },
    })
    return response.data
  },

  /**
   * Send message with history (streaming support)
   * @param {string} message - Current message
   * @param {Array} history - Conversation history
   * @param {string} language - Response language
   * @param {boolean} stream - Enable streaming?
   */
  sendMessageWithHistory: async (message, history = [], language = 'en', stream = false) => {
    const response = await apiClient.post('/chat', {
      message,
      history,
      language,
      stream,
    })
    return response.data
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
    const response = await apiClient.get('/weather/risk', {
      params: {
        latitude,
        longitude,
      },
    })
    return response.data
  },
}

/**
 * AUTH SERVICE - Waiting for Dev B contracts
 * [TODO] Integrate once /auth endpoints are available from Dev B
 */
export const authApi = {
  /**
   * [PENDING] Login with credentials
   * Expected endpoint: POST /auth/login
   * @param {string} email - Email or phone
   * @param {string} password - Password
   * @returns {Promise<{token, user, role}>}
   * [Dev B: Provide endpoint & response format]
   */
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    })
    return response.data
  },

  /**
   * [PENDING] Register new farmer
   * Expected endpoint: POST /auth/register
   * @param {Object} data - Farmer registration data
   * @returns {Promise<{token, user, role}>}
   * [Dev B: Provide endpoint & request schema]
   */
  register: async (data) => {
    const response = await apiClient.post('/auth/register', data)
    return response.data
  },

  /**
   * [PENDING] Logout
   * Expected endpoint: POST /auth/logout
   */
  logout: async () => {
    await apiClient.post('/auth/logout')
    localStorage.removeItem('authToken')
    localStorage.removeItem('authRole')
  },
}

/**
 * FARMERS SERVICE - Waiting for Dev B contracts
 * [TODO] Integrate once /farmers endpoints are available from Dev B
 */
export const farmersApi = {
  /**
   * [PENDING] Get farmer profile
   * Expected endpoint: GET /farmers/{id}
   * @param {string} farmerId - Farmer ID
   */
  getProfile: async (farmerId) => {
    const response = await apiClient.get(`/farmers/${farmerId}`)
    return response.data
  },

  /**
   * [PENDING] Update farmer profile
   * Expected endpoint: PUT /farmers/{id}
   * @param {string} farmerId - Farmer ID
   * @param {Object} data - Updated profile data
   */
  updateProfile: async (farmerId, data) => {
    const response = await apiClient.put(`/farmers/${farmerId}`, data)
    return response.data
  },
}

/**
 * CLAIMS SERVICE - Waiting for Dev B contracts
 * [TODO] Integrate once /claims endpoints are available from Dev B
 */
export const claimsApi = {
  /**
   * [PENDING] Create new claim
   * Expected endpoint: POST /claims
   * @param {Object} data - Claim data (crop_type, sowing_date, damage_description, image?, etc.)
   * @returns {Promise<{claim_id, status, ...}>}
   * [Dev B: Provide endpoint, schema, file upload handling]
   */
  createClaim: async (data) => {
    const response = await apiClient.post('/claims', data)
    return response.data
  },

  /**
   * [PENDING] Get claim details
   * Expected endpoint: GET /claims/{id}
   * @param {string} claimId - Claim ID
   */
  getClaimDetails: async (claimId) => {
    const response = await apiClient.get(`/claims/${claimId}`)
    return response.data
  },

  /**
   * [PENDING] List farmer's claims
   * Expected endpoint: GET /claims?status={status}&farmer_id={id}
   * @param {Object} filters - {status, farmer_id, date_range, etc.}
   */
  listClaims: async (filters = {}) => {
    const response = await apiClient.get('/claims', {
      params: filters,
    })
    return response.data
  },

  /**
   * [PENDING] Update claim status (Admin only)
   * Expected endpoint: PATCH /claims/{id}/status
   * @param {string} claimId - Claim ID
   * @param {Object} data - {status, decision_notes, ...}
   */
  updateStatus: async (claimId, data) => {
    const response = await apiClient.patch(`/claims/${claimId}/status`, data)
    return response.data
  },
}

/**
 * GRIEVANCES SERVICE - Waiting for Dev B contracts
 * [TODO] Integrate once /grievances endpoints are available from Dev B
 */
export const grievancesApi = {
  /**
   * [PENDING] Create new grievance
   * Expected endpoint: POST /grievances
   * @param {Object} data - Grievance data
   */
  createGrievance: async (data) => {
    const response = await apiClient.post('/grievances', data)
    return response.data
  },

  /**
   * [PENDING] Get grievance details
   * Expected endpoint: GET /grievances/{id}
   * @param {string} grievanceId - Grievance ID
   */
  getGrievanceDetails: async (grievanceId) => {
    const response = await apiClient.get(`/grievances/${grievanceId}`)
    return response.data
  },

  /**
   * [PENDING] List grievances
   * Expected endpoint: GET /grievances?status={status}&category={category}
   * @param {Object} filters - {status, category, assignee, date_range, etc.}
   */
  listGrievances: async (filters = {}) => {
    const response = await apiClient.get('/grievances', {
      params: filters,
    })
    return response.data
  },

  /**
   * [PENDING] Update grievance status
   * Expected endpoint: PATCH /grievances/{id}/status
   * @param {string} grievanceId - Grievance ID
   * @param {Object} data - {status, assignee, notes, ...}
   */
  updateStatus: async (grievanceId, data) => {
    const response = await apiClient.patch(`/grievances/${grievanceId}/status`, data)
    return response.data
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
