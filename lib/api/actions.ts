"use server";

import { revalidatePath } from "next/cache";

export async function revalidate(path: string) {
  "use server";
  // console.log("Revalidating path:", path);
  revalidatePath(path);
}

// Revalidate all cached paths (useful when currency/language changes)
export async function revalidateAll() {
  "use server";
  // Using '/' with 'layout' type invalidates all routes
  revalidatePath("/", "layout");
}
