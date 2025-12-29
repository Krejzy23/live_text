import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

export const runtime = "nodejs";

export async function POST() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  const email = clerkUser.emailAddresses?.[0]?.emailAddress;
  if (!email) {
    return new Response("Missing email", { status: 400 });
  }

  const userInfo = {
    id: clerkUser.id,
    name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
    email,
    avatar: clerkUser.imageUrl,
    color: getUserColor(clerkUser.id),
  };

  const { status, body } = await liveblocks.identifyUser(
    { userId: email, groupIds: [] },
    { userInfo }
  );

  return new Response(body, { status });
}