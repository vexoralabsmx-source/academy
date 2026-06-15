"use client";

import { useState, useTransition } from "react";
import { updateCurrentProfile } from "@/lib/profile/actions";
import type { Profile } from "@/types/user";
import { Button, Input, Textarea, Toast } from "@/components/ui";

export function ProfileSettingsForm({ profile }: { profile: Profile }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    username: profile.username ?? "",
    bio: profile.bio ?? "",
    avatarUrl: profile.avatar_url ?? "",
    websiteUrl: profile.website_url ?? "",
    githubUrl: profile.github_url ?? "",
    linkedinUrl: profile.linkedin_url ?? ""
  });

  function updateField(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      const result = await updateCurrentProfile(form);
      setMessage(result.message);
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <Input value={form.username} onChange={(event) => updateField("username", event.target.value)} placeholder="Username" />
      <Textarea value={form.bio} onChange={(event) => updateField("bio", event.target.value)} placeholder="Bio" />
      <Input value={form.avatarUrl} onChange={(event) => updateField("avatarUrl", event.target.value)} placeholder="Avatar URL" />
      <Input value={form.websiteUrl} onChange={(event) => updateField("websiteUrl", event.target.value)} placeholder="Website" />
      <Input value={form.githubUrl} onChange={(event) => updateField("githubUrl", event.target.value)} placeholder="GitHub" />
      <Input value={form.linkedinUrl} onChange={(event) => updateField("linkedinUrl", event.target.value)} placeholder="LinkedIn" />
      <Button disabled={isPending}>{isPending ? "Guardando..." : "Guardar cambios"}</Button>
      {message ? <Toast message={message} /> : null}
    </form>
  );
}
