"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";

type AccessState = {
  error: string;
};

type AccessFormProps = {
  action: (state: AccessState, formData: FormData) => Promise<AccessState>;
};

const initialState: AccessState = {
  error: "",
};

export function AccessForm({ action }: AccessFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-zinc-100">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-cyan-300/60 focus:outline-none"
          placeholder="Enter password"
          autoComplete="off"
          required
        />
      </div>
      {state.error ? <p className="text-sm text-rose-300">{state.error}</p> : null}
      <Button type="submit" disabled={isPending} className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
        {isPending ? "Checking..." : "Continue"}
      </Button>
    </form>
  );
}
