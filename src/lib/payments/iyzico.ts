import type {
  PaymentInitParams,
  PaymentInitResult,
  PaymentProvider,
} from "./types";

/**
 * Iyzico payment provider — STUB.
 *
 * TODO: Configure Iyzico before enabling this provider.
 *
 * 1. Open a merchant account at https://merchant.iyzipay.com/
 * 2. Get the following from the dashboard → Settings → API Keys:
 *      - IYZICO_API_KEY        (e.g. "sandbox-xxxxxx" or "iyzico-xxxxxx")
 *      - IYZICO_SECRET         (sandbox secret or live secret)
 *      - IYZICO_BASE_URL       ("https://sandbox-api.iyzipay.com" or "https://api.iyzipay.com")
 * 3. Add to `.env.local` (never commit):
 *      IYZICO_API_KEY=...
 *      IYZICO_SECRET=...
 *      IYZICO_BASE_URL=...
 *      IYZICO_CALLBACK_URL=https://mindid.com.tr/api/payments/iyzico/callback
 * 4. `npm install iyzipay` (https://www.npmjs.com/package/iyzipay)
 * 5. Implement `init()` below using `Iyzipay.checkoutFormInitialize.create()`
 *    to create a hosted-form session. Return:
 *      { sessionId, redirectUrl: result.paymentPageUrl }
 * 6. Implement `verifyWebhook()` using HMAC-SHA1 signature check
 *    (X-Iyzi-Signature header) per Iyzico webhook docs.
 * 7. Add an API route `src/app/api/payments/iyzico/callback/route.ts`
 *    to receive the redirect, verify the token via
 *    `Iyzipay.checkoutForm.retrieve()`, then mark the order as "paid".
 */

const IYZICO_NOT_CONFIGURED_MESSAGE =
  "Iyzico is not configured. See src/lib/payments/iyzico.ts for setup instructions. " +
  "Required env vars: IYZICO_API_KEY, IYZICO_SECRET, IYZICO_BASE_URL.";

export const iyzicoProvider: PaymentProvider = {
  id: "iyzico",
  displayName: "Kredi Kartı (Iyzico)",

  async init(_params: PaymentInitParams): Promise<PaymentInitResult> {
    throw new Error(IYZICO_NOT_CONFIGURED_MESSAGE);
  },

  async verifyWebhook(_payload: unknown, _signature: string): Promise<boolean> {
    throw new Error(IYZICO_NOT_CONFIGURED_MESSAGE);
  },
};

export const isIyzicoConfigured = (): boolean => {
  // TODO: switch to `Boolean(process.env.IYZICO_API_KEY && process.env.IYZICO_SECRET)`
  // once the credentials are in place.
  return false;
};
