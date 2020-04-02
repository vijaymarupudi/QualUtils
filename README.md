# QualUtils: Qualtrics online experiment utilities

## How to use

- [Set an embedded data field for each external page study you wish to
  run.](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data#CreatingAnEmbeddedDataElement)

- When you want a participant to run your external page study, make a page with
  only one question in qualtrics.
  [Add](https://www.qualtrics.com/support/survey-platform/survey-module/question-options/add-javascript/)
  the library Javascript to the question. After the library Javascript, call
  the library function `initiate`. It follows this signature

```
QualUtils.initiate(embeddedDataName: String, experimentUrl: String, timeline: Any)
```

- In the HTML part of the question, make sure to include a link (`<a>` tag)
  with the id `experiment-link` i.e.

```html
<p>Welcome.</p>
<p><a id="experiment-link">Click here</a> to start the experiment.</p>
```

- Given that you've configured your external experiment properly. This should work!

## Internal mechanism

- First, the page that the person has opened sends a message `{ type: 'statusSignal', payload: 'ready' }`

- Then, Qualtrics sends the page the configuration information `{ type: 'timeline', payload: ... }`

- The experiment then deals with the configuration and does its thing.

- After the experiment, it sends a message `{ type: 'studyData', ... }`
