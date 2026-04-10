import { QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'

import i18n from '../i18n/config'
import { GlobalTranslator } from '../i18n/GlobalTranslator'
import { queryClient } from '../services/query/queryClient'

export function AppProviders({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <GlobalTranslator />
        {children}
      </QueryClientProvider>
    </I18nextProvider>
  )
}
