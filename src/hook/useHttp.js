import { useCallback, useEffect, useState } from "react";

/**
 * SEND HTTP REQUEST
 */
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  // Error handling (*some error message responses are slready defined in backend)
  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }

  return resData;
}

/**
 * CUSTOM HOOK
 */
export default function useHttp(url, config, initialData) {
  // Response data
  const [data, setData] = useState(initialData);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Error message
  const [error, setError] = useState();

  /**
   * Clear the order data
   */
  function clearData() {
    setData(initialData);
  }

  /**
   * Define the send request function
   */
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true); // Send the signal of "start loading"

      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: data,
        });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }

      setIsLoading(false); // Send the signal of "finish loading"
    },
    [url, config]
  );

  /**
   * EXECUTE THE FUNCTION CONDITIONALLY
   */
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  /**
   * Expose the related data
   */
  return {
    data: data,
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
    clearData: clearData
  };
}
