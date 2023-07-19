import { useSession } from "next-auth/react";

export default function Calculator() {
  const { data: session } = useSession();
  const username = session?.user?.email || "default";
  const gradioAppUrl = new URL(process.env.NEXT_PUBLIC_GRADIO_APP_URL || "https://openbio-calculator.hf.space");
  gradioAppUrl.searchParams.set("username", username);

  return (
    <div className="container mx-auto p-10 h-screen">
      <iframe src={gradioAppUrl.toString()} width="100%" height="100%"></iframe>
    </div>
  );
}
