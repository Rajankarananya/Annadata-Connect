import { APP_LANGUAGE_OPTIONS } from '../../i18n/language'

export function LanguageSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap rounded-xl bg-surface-container-low p-1">
      {APP_LANGUAGE_OPTIONS.map((language) => (
        <button
          key={language.code}
          type="button"
          onClick={() => onChange(language.code)}
          className={
            value === language.code
              ? 'rounded-lg bg-surface-container-lowest px-4 py-1.5 text-sm font-bold text-primary shadow-sm transition-all'
              : 'rounded-lg px-4 py-1.5 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container-high'
          }
        >
          {language.label}
        </button>
      ))}
    </div>
  )
}
