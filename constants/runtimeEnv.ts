type RuntimeEnv = {
  NEXT_PUBLIC_BASE_URL: string | undefined;
};

declare global {
  interface Window {
    __ENV__: RuntimeEnv;
  }
}

const RUNTIME_ENV_KEYS: (keyof RuntimeEnv)[] = ['NEXT_PUBLIC_BASE_URL'];

export function getRuntimeEnv(): RuntimeEnv {
  if (typeof window === 'undefined') {
    // Server-side: bracket notation prevents Next.js from inlining at build time.
    return Object.fromEntries(RUNTIME_ENV_KEYS.map((key) => [key, process.env[key]])) as RuntimeEnv;
  }

  // Client-side: values were injected into window.__ENV__ by the root layout
  // Server Component, so they are available synchronously with no fetch needed.
  return window.__ENV__;
}

// export const ENV_KEYS = ['NEXT_PUBLIC_BASE_URL'] as const;