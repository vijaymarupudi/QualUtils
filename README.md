# QualUtils: Qualtrics online experiment utilities

Helpers to configure online experiments from Qualtrics and for Qualtrics to store external experiment data.

## How to use

- [Set an embedded data field for each external page study you wish to
  run.](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data#CreatingAnEmbeddedDataElement)

- When you want a participant to run your external page study in your Qualtrics
  survey, make a page with only one descriptive question (Text / Graphics) .

- In the HTML part of the question, make sure to include a link (`<a>` tag)
  with the id `experiment-link`. E.g.: 

    ```html
    <p>Welcome.</p>
    <p><a id="experiment-link">Click here</a> to start the experiment.</p>
    ```

- [Add](https://www.qualtrics.com/support/survey-platform/survey-module/question-options/add-javascript/)
  Javascript to the question. After clearing the default JavaScript. Paste the
  following and edit the parameters of the `questionInitiate` function. The
  code below loads the library into Qualtrics.

    ```javascript
    let script = document.createElement('script');
    script.onload = function () {
        // read along for what to put here...
    };
    script.src = "https://cdn.jsdelivr.net/gh/vijaygopal1234/QualUtils@0.1.2/dist/QualUtils-0.1.2.js";
    document.head.appendChild(script);
    ```

    Call the `QualUtils.questionInitiate` function in the onload function. The
    `embeddedDataName` should match the name you created in the first step. The
    `experimentUrl` should be the externally hosted url of your experiment. The
    `configuration` parameter is sent to the external experiment.

    ```javascript
    QualUtils.questionInitiate(embeddedDataName: String, experimentUrl: String, configuration: <Any Javascript Object>)
    ```

    For example, you can send the parameters for a n-back using the
    configuration parameter by sending the object `{ n: 4 }` for a 4-back. How
    you use this is up to you!

    This code snippet disables the next button until the participant finishes the experiment.

- On the client side, you can use the library like this! `QualUtils.startExperiment` is a Promise that returns the configuration from Qualtrics. `QualUtils.sendData` sends data back to Qualtrics.

    ```javascript
    let script = document.createElement('script');
    script.onload = async function () {
        let configuration = await QualUtils.startExperiment()
        // do something with configuration

        // jsPsych.init({...})
        
        // sample data
        let data = { time: new Date().valueOf(), configuration: configuration }
        QualUtils.sendData(data)
        window.close()
        // the data is now in Qualtrics
    };
    script.src = "https://cdn.jsdelivr.net/gh/vijaygopal1234/QualUtils@0.1.2/dist/QualUtils-0.1.2.js";
    document.head.appendChild(script);
    ```

- The next button in the other tab has now been enabled!

## Advanced users

`QualUtils` is a UMD module. You can use it like this.

```javascript
import QualUtils from "./path-to-QualUtils.js"
```

or 

```javascript
const QualUtils = require("./path-to-QualUtils.js")
```

## Internal mechanism

- First, the page that the person has opened sends a message `{ type: 'statusSignal', payload: 'ready' }`

- Then, Qualtrics sends the page the configuration information `{ type: 'configuration', payload: ... }`

- The experiment then deals with the configuration and does its thing.

- After the experiment, it sends a message `{ type: 'studyData', ... }`
