import { useMemo, useRef, useState } from 'react'

import { FarmerBottomNav } from '../../../components/layout/FarmerBottomNav'
import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import { FarmerTopNav } from '../../../components/layout/FarmerTopNav'
import { apiClient } from '../../../services/api/client'
import './ChatbotPage.css'

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Namaste! Ask me about crop claims, scheme deadlines, or weather risks in your district.',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
]

const QUICK_PROMPTS = [
  'What is the PM Fasal Bima claim deadline?',
  'How to file a crop damage claim?',
  'What documents are required for claim approval?',
  'How does district weather risk affect claims?',
]

export function ChatbotPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')
  const [language, setLanguage] = useState('en')
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [copied, setCopied] = useState(false)
  const chatContainerRef = useRef(null)

  const historyPayload = useMemo(
    () => messages.filter((m) => m.id !== 'welcome').map((m) => ({ role: m.role, content: m.content })),
    [messages],
  )

  const scrollToBottom = () => {
    if (!chatContainerRef.current) {
      return
    }

    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }

  const addMessage = (role, content) => {
    const message = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      role,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, message])
    window.requestAnimationFrame(scrollToBottom)
  }

  const handleSend = async (forcedText) => {
    const nextText = (forcedText ?? draft).trim()
    if (!nextText || isLoading) {
      return
    }

    setErrorText('')
    setDraft('')
    addMessage('user', nextText)
    setIsLoading(true)

    try {
      // Use the multilingual endpoint with query parameters
      const response = await apiClient.post(`/chat/multilingual`, null, {
        params: {
          query: nextText,
          lang: language,
        },
      })

      const reply = response?.data?.response || response?.response || 'I could not generate a response right now.'
      addMessage('assistant', reply)
    } catch (error) {
      const detail = error?.response?.data?.detail || 'Unable to reach AI service. Please try again.'
      setErrorText(detail)
      addMessage('assistant', 'I am temporarily unavailable. Please try again in a moment.')
      console.error('[ChatbotPage.handleSend] Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      await handleSend()
    }
  }

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES)
    setErrorText('')
    setCopied(false)
  }

  const handleCopyLast = async () => {
    const lastAssistantMessage = [...messages].reverse().find((m) => m.role === 'assistant')
    if (!lastAssistantMessage) {
      return
    }

    try {
      await navigator.clipboard.writeText(lastAssistantMessage.content)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="chatbot-root bg-background font-body text-on-surface selection:bg-secondary-container">
      <FarmerTopNav />

      <main className="mx-auto min-h-screen max-w-4xl px-4 pb-28 pt-20 lg:px-0">
        <section className="mb-8 mt-4 text-center">
          <h1 className="font-headline mb-2 text-3xl font-extrabold text-primary">AI Advisor</h1>
          <p className="font-medium text-on-surface-variant">Your digital agronomist for smarter farming decisions</p>
        </section>

        <div className="relative flex min-h-[530px] flex-col overflow-hidden rounded-[2rem] bg-surface-container-low p-4 shadow-sm lg:p-6">
          <div className="mb-6 flex items-center justify-between px-2">
            <div className="flex gap-2">
              <span className="flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                {isLoading ? 'THINKING' : 'LIVE ADVICE'}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary" title="Clear Chat" type="button" onClick={handleClear}>
                <span className="material-symbols-outlined">delete_sweep</span>
              </button>
            </div>
          </div>

          <div ref={chatContainerRef} className="chat-container flex-1 space-y-6 overflow-y-auto px-2 pb-6">
            {messages.map((message) => {
              const isAssistant = message.role === 'assistant'

              if (isAssistant) {
                return (
                  <div key={message.id} className="flex max-w-[85%] gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-lg">
                      <span className="material-symbols-outlined text-xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                    </div>
                    <div className="asymmetric-card border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm">
                      <p className="mb-3 whitespace-pre-wrap leading-relaxed text-on-surface">{message.content}</p>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">AI ADVISOR • {message.timestamp}</span>
                    </div>
                  </div>
                )
              }

              return (
                <div key={message.id} className="ml-auto flex max-w-[85%] flex-row-reverse gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-container">
                    <span className="material-symbols-outlined text-xl text-primary">person</span>
                  </div>
                  <div className="rounded-2xl rounded-tr-none bg-primary-container p-5 text-on-primary-container shadow-md">
                    <p className="mb-1 whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">YOU • {message.timestamp}</span>
                  </div>
                </div>
              )
            })}

            {isLoading && (
              <div className="flex max-w-[85%] items-end gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
                  <span className="material-symbols-outlined text-xl text-white">psychology</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-none bg-surface-container-lowest px-6 py-4 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" style={{ animationDelay: '0.2s' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" style={{ animationDelay: '0.4s' }} />
                  <span className="ml-2 text-xs font-semibold italic text-primary/60">Analyzing your question...</span>
                </div>
              </div>
            )}

            {errorText && (
              <div className="rounded-xl border border-[#ba1a1a33] bg-[#fff2f2] px-4 py-3 text-sm text-[#7a1010]">
                {errorText}
              </div>
            )}
          </div>

          <div className="mt-4 px-2 pb-2">
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-4">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  className="shrink-0 rounded-full border border-transparent bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:border-primary hover:bg-primary hover:text-white"
                  type="button"
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto px-2">
            <div className="relative flex items-center gap-2 rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <button className="p-3 text-on-surface-variant transition-colors hover:text-primary" type="button">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <textarea
                className="flex-1 border-none bg-transparent py-3 font-medium text-on-surface placeholder:text-stone-400 focus:ring-0"
                placeholder="Ask about claims, schemes, crop support, or weather..."
                rows="1"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="flex items-center justify-center rounded-2xl bg-primary p-3 text-white shadow-lg transition-all hover:bg-primary-container active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={() => handleSend()}
                disabled={isLoading || !draft.trim()}
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between px-2">
              <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-error transition-opacity hover:opacity-80" type="button">
                <span className="material-symbols-outlined text-sm">emergency_share</span>
                Escalate to Expert
              </button>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-xs font-bold text-on-surface-variant transition-colors hover:text-primary" type="button" onClick={handleCopyLast}>
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  {copied ? 'Copied' : 'Copy Last'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-2xl border border-secondary-fixed bg-secondary-fixed/30 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
            <span className="material-symbols-outlined text-secondary">verified_user</span>
          </div>
          <div>
            <h4 className="font-headline text-sm font-bold text-on-secondary-fixed-variant">Trust Architecture</h4>
            <p className="text-xs leading-snug text-on-secondary-fixed-variant opacity-80">Recommendations are based on local regional data and validated agronomical science. Always consult local experts for large-scale operations.</p>
          </div>
        </div>
      </main>

      <FarmerBottomNav />

      <FarmerSidebar />
    </div>
  )
}
