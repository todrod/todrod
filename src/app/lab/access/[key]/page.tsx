import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { AccessForm } from "@/app/lab/access/[key]/AccessForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLabAccessCookieName, isLabAccessKey, labAccessConfig } from "@/lib/lab-access";

export const metadata: Metadata = {
  title: "Lab Access",
  description: "Password protected access to lab projects.",
};

type AccessState = {
  error: string;
};

export default async function LabAccessPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;

  if (!isLabAccessKey(key)) {
    notFound();
  }

  const config = labAccessConfig[key];
  const cookieStore = await cookies();
  const cookieName = getLabAccessCookieName(key);

  if (cookieStore.get(cookieName)?.value === "1") {
    redirect(config.redirectTo);
  }

  async function unlock(_: AccessState, formData: FormData): Promise<AccessState> {
    "use server";

    const submittedPassword = String(formData.get("password") ?? "").trim().toLowerCase();

    if (submittedPassword !== config.password.toLowerCase()) {
      return { error: "Incorrect password. Please try again." };
    }

    const responseCookies = await cookies();
    responseCookies.set(cookieName, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    redirect(config.redirectTo);
  }

  return (
    <div className="mx-auto flex w-full max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="w-full border-white/15 bg-card/70">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl">{config.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </CardHeader>
        <CardContent>
          <AccessForm action={unlock} />
        </CardContent>
      </Card>
    </div>
  );
}
