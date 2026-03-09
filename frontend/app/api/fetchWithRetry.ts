import pRetry from "p-retry";

export async function fetchWithRetry(url: any, options: any = {}) {
  return pRetry(
    async () => {
      const res = await fetch(url, options);
      if ([502, 503, 504].includes(res.status)) {
        throw new Error(`Server not ready: ${res.status}`);
      }
      return res;
    },
    {
      onFailedAttempt: ({ attemptNumber, retriesLeft }) => {
        console.warn(
          `Attempt ${attemptNumber} failed. ${retriesLeft} retries left...`,
        );
      },
    },
  );
}
