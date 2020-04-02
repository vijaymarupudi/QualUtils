const EMBEDDED_DATA_NAME = "corsiData_block1";
const EXPERIMENT_URL = "https://vijaymarupudi.gitlab.io/uwlatl-experiment_1/";
const TIMELINE = [
  { setSize: 6, numberOfTrials: 4, feedback: false },
  { setSize: 8, numberOfTrials: 4, feedback: false },
  { setSize: 5, numberOfTrials: 4, feedback: false },
  { setSize: 7, numberOfTrials: 4, feedback: false },
  { setSize: 3, numberOfTrials: 2, feedback: false },
  { setSize: 6, numberOfTrials: 4, feedback: false },
  { setSize: 8, numberOfTrials: 4, feedback: false },
  { setSize: 5, numberOfTrials: 4, feedback: false },
  { setSize: 7, numberOfTrials: 4, feedback: false }
];

function test(EMBEDDED_DATA_NAME, EXPERIMENT_URL, TIMELINE) {
  Qualtrics.SurveyEngine.addOnload(function() {
    const qual = this;

    qual.disableNextButton();

    /* Configuration */

    /* Business code */

    const state = {
      experimentWindow: null
    };

    const link = document.querySelector("a#corsiExperimentLink");
    link.setAttribute("href", "#");

    // Respond to ready signal by sending configuration

    const readyListener = e => {
      if (
        typeof e.data === "object" &&
        e.data.type === "statusSignal" &&
        e.data.payload === "ready"
      ) {
        state.experimentWindow.postMessage(
          {
            type: "timeline",
            timeline: TIMELINE
          },
          "*"
        );

        window.removeEventListener("message", readyListener);
      }
    };

    window.addEventListener("message", readyListener);

    // Receive data

    const dataListener = e => {
      if (typeof e.data === "object" && e.data.type === "studyData") {
        const dataToBeSaved = JSON.stringify(e.data);
        Qualtrics.SurveyEngine.setEmbeddedData(
          EMBEDDED_DATA_NAME,
          dataToBeSaved
        );
        window.removeEventListener("message", dataListener);
        qual.enableNextButton();
        qual.clickNextButton();
      }
    };

    window.addEventListener("message", dataListener);

    link.addEventListener("click", e => {
      state.experimentWindow = window.open(
        EXPERIMENT_URL,
        "corsiExperimentWindow"
      );
    });
  });
}
