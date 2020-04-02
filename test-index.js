const button = document.createElement("button");
button.innerText = "Click me to finish experiment";


function startExperiment() {

}


let listener;
window.addEventListener(
  "message",
  (listener = e => {
    const message = e.data;

    if (message.type === "configuration") {
      console.log("Data received.", message.payload);
      window.removeEventListener("message", listener);

    }
  })
);

window.opener.postMessage({ type: "statusSignal", payload: "ready" });
