// Translator interface - engine-agnostic adapter pattern
// Allows swapping i18n implementation without changing consumer code

export type Translator = {
  init: (options?: { lng?: string }) => Promise<void>;
  t: (key: string, opts?: any) => string;
  useT: () => (k: string, opts?: any) => string;
  changeLanguage: (lng: string) => Promise<void>;
  getAvailableLanguages: () => string[];
};

// Export a default adapter instance
// Initially pointing to react-i18next adapter
import * as ReactI18nAdapter from './reactAdapter';

const adapter: Translator = ReactI18nAdapter.createAdapter();

export default adapter;

