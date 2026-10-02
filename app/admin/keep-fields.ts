"use client";

import { startTransition, type FormEvent } from "react";

/** Submit handler that runs a form action WITHOUT React's automatic reset, so a validation error
 *  never wipes what the person typed. Use as <form onSubmit={keepFields(action)}>. */
export function keepFields(action: (fd: FormData) => void) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };
}
