import { PageHeader } from '../../../components/shared/PageHeader'

export function ChatbotPage() {
  return (
    <section>
      <PageHeader title="Chatbot" description="Multilingual chatbot with suggestions, timestamps, copy, and clear actions." />
      <div className="rounded-lg border border-[var(--color-border)] p-4">
        <p className="text-sm text-[var(--color-text-soft)]">Chat UI scaffold. Integrate chat history and send message APIs next.</p>
      </div>
    </section>
  )
}
