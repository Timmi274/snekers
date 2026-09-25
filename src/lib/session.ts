import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value ?? uuidv4();
  return sessionId;
}
