import Vapi from '@vapi-ai/web';

const vapiToken = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN || process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "";

// Safely instantiate Vapi without crashing SSR or unconfigured client
export const vapi = typeof window !== 'undefined' && vapiToken ? new Vapi(vapiToken) : null;
export const isVapiConfigured = Boolean(vapiToken && vapiToken.length > 5);
