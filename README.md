# QualUtils: Qualtrics online experiment utilities

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

- [Paste](https://www.qualtrics.com/support/survey-platform/survey-module/question-options/add-javascript/)
  the library Javascript to the question (after clearing the default
  Javascript). After pasting library Javascript, call the library function
  `questionInitiate`. It follows this signature.

    ```
    QualUtils.questionInitiate(embeddedDataName: String, experimentUrl: String, configuration: <Any Javascript Object>)
    ```

    Feel free to use your own values.

It is recommended that you type your code in a text editor and then paste the output into the Qualtrics Javascript panel.

- Given that you've configured your external experiment properly. This should work!

## Internal mechanism

- First, the page that the person has opened sends a message `{ type: 'statusSignal', payload: 'ready' }`

- Then, Qualtrics sends the page the configuration information `{ type: 'configuration', payload: ... }`

- The experiment then deals with the configuration and does its thing.

- After the experiment, it sends a message `{ type: 'studyData', ... }`
