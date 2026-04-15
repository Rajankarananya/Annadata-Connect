import { QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'

import i18n from '../i18n/config'
import { queryClient } from '../services/query/queryClient'
import { AuthProvider } from '../context/AuthContext'

export function AppProviders({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}
