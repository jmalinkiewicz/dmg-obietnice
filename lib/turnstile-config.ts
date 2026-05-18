/** Cloudflare test site key (invisible, always passes) — dev only. */
const DEV_SITE_KEY = "1x00000000000000000000BB";

export function getTurnstileSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? DEV_SITE_KEY;
}
