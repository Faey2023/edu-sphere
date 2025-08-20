"use client";

import { NextIntlClientProvider } from "next-intl";
import { useLocale } from "@/context/LocaleContext";
import enMessages from "../locales/en.json";
import bnMessages from "../locales/bn.json";

const messagesMap: Record<string, Record<string, string>> = {
  en: enMessages,
  bn: bnMessages,
};

export function IntlWrapper({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale();
  const messages = messagesMap[locale] || enMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
