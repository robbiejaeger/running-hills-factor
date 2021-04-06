# Running Hills Factor

How much should a runner factor in the hills for a particular route to alter an expected finish time? Running Hills Factor calculates how much time could be expected to be gained or lost while running due to hills.

### Methodology

For every percent grade value in a running route, there is a corresponding difference in expected pace per percent grade. For instance, if the route has a 3% incline, then it can be expected that a runner's pace would slow down ~15 seconds per mile per percent grade (45 seconds per mile slower). Similarly, if there is a 2% decline in the route, then it can be expected that a runner's pace would speed up ~8 seconds per mile per percent grade (16 seconds per mile faster).

* Uphill: every % grade incline slows down pace 15 seconds per mile by default (pacing done in minutes per mile)
* Downhill: every % grade decline increases pace 8 seconds per mile by default (pacing done in minutes per mile)

Running Hills Factor uses the percent grade to calculate the time gained or lost from each segment of the route provided and sums over the whole distance of the route.

## Getting Started

To install Running Hills Factor, use the command:

```bash
npm install running-hills-factor
```

Example usage using ES modules:

```js
import RunningHillsFactor from 'running-hills-factor';

const runningHillsFactor = new RunningHillsFactor();

runningHillsFactor.calculateHillsFactor('./example.gpx')
  .then(timeDifference => console.log('Total gained or lost time:', timeDifference))
  .catch(err => console.error('Error calculating hills factor:', err));
```

If you're using CommonJS modules, then you can bring in the class with:

```js
const RunningHillsFactor = require('running-hills-factor');

const runningHillsFactor = new RunningHillsFactor();
```

## API Documentation

Running Hills Factor is designed with a class to be able to create multiple instances of the calculator with different configuration options.

For example, one instance can be configured for a runner where for every % grade incline, they slow down 12 seconds per mile. Where another instance can represent another runner where for every % grade incline, they slow down 20 seconds per mile.

### class: RunningHillsFactor(options)

* `options` <[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>
  - `inclineFactor` <[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)> the number of seconds per mile each % grade incline slows down. _This number should be positive._ Defaults to `15` (seconds).
  - `declineFactor` <[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)> the number of seconds per mile each % grade decline speeds up. _This number should be positive._ Defaults to `8` (seconds).

Example `options` usage:

```js
const runningHillsFactor = new RunningHillsFactor({inclineFactor: 13, declineFactor: 7});
```

**RunningHillsFactor.calculateHillsFactor(filepath)**

* `filepath`<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)> Filepath to the running course route. Current support is for the [GPX file format](https://en.wikipedia.org/wiki/GPS_Exchange_Format) from [https://onthegomap.com/](https://onthegomap.com/).
* returns: <[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)> where the resolved value is the total time gained or lost in seconds, and the rejected value is an error.
