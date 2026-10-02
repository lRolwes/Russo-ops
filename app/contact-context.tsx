"use client";

import { createContext, useContext } from "react";
import { EMAIL, PHONE, PHONE_HREF } from "./site-content";
import type { ContactInfo } from "@/lib/opportunities";

const ContactContext = createContext<ContactInfo>({ phone: PHONE, phoneHref: PHONE_HREF, email: EMAIL });

export function ContactProvider({ value, children }: { value: ContactInfo; children: React.ReactNode }) {
  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export const useContact = () => useContext(ContactContext);
