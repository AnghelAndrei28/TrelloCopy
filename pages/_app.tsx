import "@/styles/globals.css";
import type { AppProps } from "next/app";
import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'
import { v4 as uuidv4 } from 'uuid';

if (typeof window !== 'undefined') { // checks that we are client-side
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug(); // debug mode in development
      },
    });

    const id = uuidv4();
    posthog.identify(id, { id });
  } else {
    console.error('PostHog key is not defined');
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PostHogProvider client={posthog}>
        <Component {...pageProps} />
      </PostHogProvider>
    </>
  )
}
