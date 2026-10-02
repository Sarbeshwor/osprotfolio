"use client";

import { createContext, useContext, useState } from "react";

type IntroState = { done: boolean; setDone: (v: boolean) => void };

const IntroContext = createContext<IntroState>({ done: false, setDone: () => {} });

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  return <IntroContext.Provider value={{ done, setDone }}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
