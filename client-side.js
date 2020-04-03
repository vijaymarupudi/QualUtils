export function sendData(data) {
  window.opener.postMessage({ type: "studyData", payload: data }, "*");
}

// Signals ready to Qualtrics, and then receives the configuration
export function startExperiment() {
  if (!window.opener) {
    throw new Error("This experiment was not opened from Qualtrics.");
  }

  window.opener.postMessage({ type: "statusSignal", payload: "ready" }, "*");

  return new Promise(resolve => {
    function listener(e) {
      const message = e.data;

      if (message.type === "configuration") {
        window.removeEventListener("message", listener);
        resolve(message.payload);
      }
    }

    window.addEventListener("message", listener);
  });
}

export function isFromQualtrics() {
  return !!window.opener;
}
