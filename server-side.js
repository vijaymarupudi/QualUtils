/* global Qualtrics */

const state = {
  experimentWindow: null
};

function checkReady() {
  return new Promise(resolve => {
    const readyListener = e => {
      if (
        typeof e.data === "object" &&
        e.data.type === "statusSignal" &&
        e.data.payload === "ready"
      ) {
        window.removeEventListener("message", readyListener);
        resolve();
      }
    };

    window.addEventListener("message", readyListener);
  });
}

function receiveData() {
  return new Promise(resolve => {
    const dataListener = e => {
      if (typeof e.data === "object" && e.data.type === "studyData") {
        window.removeEventListener("message", dataListener);
        resolve(e.data);
      }
    };

    window.addEventListener("message", dataListener);
  });
}

export async function questionInitiate(
  qual,
  embeddedDataName,
  experimentUrl,
  configuration
) {
  // Prevent participant from proceeding next.
  qual.disableNextButton();

  // find experiment link
  const link = document.querySelector("a#experiment-link");
  // make it look clickable
  link.setAttribute("href", "#");
  // handle click
  link.addEventListener("click", () => {
    state.experimentWindow = window.open(experimentUrl, "ExperimentWindow");
  });

  // Respond to ready signal by sending configuration
  await checkReady();
  state.experimentWindow.postMessage(
    { type: "configuration", payload: configuration },
    "*"
  );

  // Set data
  const data = await receiveData();
  const dataToBeSaved = JSON.stringify(data);
  Qualtrics.SurveyEngine.setEmbeddedData(embeddedDataName, dataToBeSaved);

  // to prevent bug where data is not fully uploaded
  setTimeout(() => {
    qual.enableNextButton();
    qual.clickNextButton();
  }, 4000);

}
