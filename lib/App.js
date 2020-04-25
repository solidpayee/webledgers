import React from '../web_modules/react.js';
import ReactDOM from '../web_modules/react-dom.js';
import NavbarSolidLogin from '../lib/components/bulma/Navbar.js';
import Circle from '../lib/Circle.js';
import cogoToast from '../web_modules/cogo-toast.js';
import ReconnectingWebSocket from '../web_modules/reconnecting-websocket.js';

// MODEL
// subject
//   day
//   hour

// main
// init
var subject = new URLSearchParams(document.location.search).get('uri') || 'https://melvin.solid.live/credit/count.ttl';
var ext = 'jsonld';

var UI = {};
UI.store = $rdf.graph();
UI.fetcher = new $rdf.Fetcher(UI.store);
UI.updater = new $rdf.UpdateManager(UI.store);

var cycle = { start: new Date().getTime(), splits: [] };
var subcycle = { start: new Date().getTime() };

if (!localStorage.getItem('startTime')) {
  localStorage.setItem('startTime', new Date().getTime());
}
if (!localStorage.getItem('startScore')) {
  localStorage.setItem('startScore', 0);
}
if (!localStorage.getItem('localTime')) {
  localStorage.setItem('localTime', new Date().getTime());
}
if (!localStorage.getItem('localScore')) {
  localStorage.setItem('localScore', 0);
}

// Create context for global store assignment
const StateContext = React.createContext();

const Provider = ({ stores, children }) => {
  // map that stores initialized versions of all user store hooks
  const storesMap = new Map();
  // complain if no instances provided for initialization
  if (!stores || !stores.length) {
    throw new Error('You must provide stores list to a <Provider> for initialization!');
  }
  // initialize store hooks
  // this is required because react expects the same number
  // of hooks to be called on each render
  // so if we run init in useStore hook - it'll break on re-render
  stores.forEach(store => {
    storesMap.set(store, store());
  });
  // return provider with stores map
  return React.createElement(
    StateContext.Provider,
    { value: storesMap },
    children
  );
};

function useStore(storeInit) {
  const map = React.useContext(StateContext);

  // complain if no map is given
  if (!map) {
    throw new Error('You must wrap your components with a <Provider>!');
  }

  const instance = map.get(storeInit);

  // complain if instance wasn't initialized
  if (!instance) {
    throw new Error('Provided store instance did not initialized correctly!');
  }

  return instance;
}

const store = () => {
  let initial = {};
  initial.count = new URLSearchParams(document.location.search).get('count') || 0;

  const [template, setTemplate] = React.useState(initial);

  const increment = amount => setTemplate({ count: count + amount });

  const touch = (amount, day = 0) => setTemplate({
    count: amount,
    day: day,
    now: new Date().getTime()
  });

  const decrement = () => setTemplate({ count: count + 30 });

  const getStore = () => {
    return template;
  };

  const reset = (count, day = 0, push = false) => {
    count = count || 0;

    let startTime = localStorage.getItem('startTime') || 0;
    let startScore = localStorage.getItem('startScore') || 0;
    let localTime = localStorage.getItem('localTime') || 0;
    let localScore = localStorage.getItem('localScore') || 0;
    let c = day % 360;
    let s = day % 30;
    let l = c - s;
    let t = count;
    let d = day;
    let e = Math.floor((new Date().getTime() - startTime) / 1000);
    let a = (1000 - Math.round(e / (s + l - startScore) * 100)) / 100;

    // console.log('day % 360', day % 360, 'a', a)

    if (day % 360 === 355) {
      // console.log('###### resetting', count, day, push)

      if (push) {
        pushLast(a);
        // console.log(localStorage.getItem('startTime'))
      }
      localStorage.setItem('startTime', new Date().getTime());
      localStorage.setItem('startScore', 0);
    }
    setTemplate({ count: count, day: day });

    // if (day % 5 === 0) {
    //   let e = Math.floor((new Date().getTime() - localTime) / 1000)
    //   let a = Math.round(e / 30)
    //   localStorage.setItem('localTime', new Date().getTime())
    //   localStorage.setItem('localScore', day % 30)
    //   cogoToast.info('Fast', {
    //     heading: (new Date().getTime() - parseInt(localTime)) / 1000
    //   })
    //   cogoToast.info('dates', {
    //     heading: new Date().getTime() - parseInt(localTime)
    //   })
    // }

    if (day % 30 === 0) {
      let e = new Date().getTime() - localTime;
      let a = Math.round(e / 300) / 100;
      localStorage.setItem('localTime', new Date().getTime());
      // localStorage.setItem('localScore', day % 30)
      // cogoToast.info('Pace', {
      //   heading: Math.round(1000 - a * 100) / 100,
      //   hideAfter: 60
      // })
      // cogoToast.info('Elapsed', { heading: e })
    }
  };

  return { template, increment, decrement, touch, reset };
};

function pushLast(val) {
  if (!val) return;
  // console.log('###### pushing', val)

  let last = localStorage.getItem('last');
  if (!last) {
    localStorage.setItem('last', JSON.stringify([]));
  }
  let ret = JSON.parse(localStorage.getItem('last'));
  if (val !== ret[ret.length - 1]) {
    ret.push(val);
    localStorage.setItem('last', JSON.stringify(ret));
  }
}

function showSegmentToast(displayTime, segment) {
  cogoToast.info(displayTime, {
    heading: 'Segment ' + segment + ' complete',
    hideAfter: 150
  });
  console.log('Segment', segment, 'complete in', displayTime);
  console.log('split times', cycle.splits);
  let total = cycle.splits.reduce((a, b) => {
    a + b;
  });
  console.log('total', total);
  console.log('average', Math.round(total / (segment + 1)));
}

function hasTransitioned(oldVal, newVal, threshold) {
  let transitioned = false;
  if (!isNaN(oldVal) && !isNaN(newVal) && Math.floor(newVal / threshold) > Math.floor(oldVal / threshold)) {
    transitioned = true;
  }
  return transitioned;
}

function processSubcycleTransition(subcycle, lastPoints) {
  let diff = subcycle.end - subcycle.start;
  if (diff && diff > 0) {
    let seconds = Math.round(diff / 1000);
    let displayTime = seconds + ' seconds';
    let segment = Math.floor(lastPoints / 30) % 12;
    cycle.splits[segment] = seconds;
    showSegmentToast(displayTime, segment);
  }
}

function Points() {
  const { template, reset, touch } = useStore(store);

  // play a sound if there is a transition
  function postProcessPoints(points) {
    let lastPoints = localStorage.getItem('localScore');
    // console.log('subcycle', subcycle, 'lastPoints', lastPoints)

    if (hasTransitioned(lastPoints, points, 360)) {
      cycle.end = new Date().getTime();
      subcycle.end = new Date().getTime();

      processSubcycleTransition(subcycle, lastPoints);

      new Audio('./audio/cheer.ogg').play();
      cycle = { start: new Date().getTime(), splits: [] };
      subcycle = { start: new Date().getTime() };
    } else if (hasTransitioned(lastPoints, points, 30)) {
      subcycle.end = new Date().getTime();

      processSubcycleTransition(subcycle, lastPoints);

      new Audio('./audio/heal.ogg').play();
      subcycle = { start: new Date().getTime() };
    }
    // console.log('setting last ponts to', points)
    localStorage.setItem('localScore', points);
  }

  function fetchCount(subject) {
    // console.log('fetching', subject)
    // let ext = subject.split('.').pop()

    if (ext === 'ttl') {
      UI.fetcher.load(subject, { force: true }).then(response => {
        let s = null;
        let p = UI.store.sym('urn:query:hour');
        let o = null;
        let w = UI.store.sym(subject.split('#')[0]);
        let hour = UI.store.statementsMatching(s, p, o, w);
        // console.log('hour', hour)
        let hourInt = parseInt(hour[0].object.value);
        // console.log('hour', hour[0].object.value)

        p = UI.store.sym('urn:query:day');
        let day = UI.store.statementsMatching(s, p, o, w);
        let dayInt = parseInt(day[0].object.value);
        // console.log('day', day[0].object.value)

        render(hourInt, dayInt, true);
      }, err => {
        console.log(err);
      });
    }

    function getValue(data, value) {
      return data[0][value][0]['@value'];
    }

    // temporary hack as .jsonld not working with rdflib
    if (ext === 'jsonld') {
      fetch(subject, { headers: { Accept: 'application/ld+json' } }).then(response => {
        return response.json();
      }).then(data => {
        let vals = data[0];
        let day = vals['urn:query:day'][0]['@value'];
        let hour = vals['urn:query:hour'][0]['@value'];
        // console.log(JSON.stringify(data))
        render(hour, day, true);
      });
    }
  }

  // RENDER
  function render(hourInt, dayInt, res) {
    postProcessPoints(dayInt);
    reset(hourInt, dayInt, res);
    renderTitle(hourInt, dayInt);
  }

  function renderTitle(hourInt, dayInt) {
    let c = dayInt % 360;
    let s = dayInt % 30;
    let now = Math.floor(c / 30) + '.' + Math.floor(s / 5);
    document.title = now + ' | ' + hourInt + ' | ' + dayInt;
  }

  // UPDATES
  React.useEffect(() => {
    fetchCount(subject);

    let uri = location.href;
    let wss = uri.replace('http', 'ws');
    let w = new ReconnectingWebSocket('wss://melvin.solid.live/');
    w.onmessage = function (m) {
      let data = m.data;
      cogoToast.success(data, { position: 'top-right' });

      if (data.match(/pub .*/)) {
        UI.store = $rdf.graph();
        UI.fetcher = new $rdf.Fetcher(UI.store);
        fetchCount(subject);
      }
    };
    w.onopen = function () {
      console.log('websocket open');
      w.send('sub ' + subject);
    };
    w.onerror = function () {
      console.log('websocket error');
    };
    w.onclose = function () {
      console.log('websocket closed');
    };
  }, []);

  // MAIN
  let startTime = localStorage.getItem('startTime') || 0;
  let startScore = localStorage.getItem('startScore') || 0;
  let c = template.day % 360;
  let s = template.day % 30;
  let now = Math.floor(c / 30) + '.' + Math.floor(s / 5);
  let l = c - s;
  let t = template.count;
  let d = template.day;
  let e = Math.floor((new Date().getTime() - startTime) / 1000);
  let a = (1000 - Math.round(e / (s + l - startScore) * 100)) / 100;

  return React.createElement(
    'div',
    { className: 'is-info' },
    React.createElement(
      'div',
      null,
      React.createElement(Circle, { rad: template.count, count: template.day % 360 })
    ),
    React.createElement('hr', null),
    React.createElement(
      'div',
      { className: 'buttons' },
      React.createElement(
        'span',
        { className: 'button is-large is-warning' },
        'Now ',
        now
      ),
      React.createElement(
        'span',
        { className: 'button is-large is-link' },
        'Day ',
        d
      ),
      React.createElement(
        'span',
        { className: 'button is-large is-success' },
        'Hour ',
        t
      )
    ),
    React.createElement('hr', null)
  );
}

// APP
ReactDOM.render(React.createElement(
  Provider,
  { stores: [store] },
  React.createElement(NavbarSolidLogin, {
    className: 'is-link',
    title: 'Webledgers',
    sourceCode: 'https://github.com/solidpayee/webledgers/'
  }),
  React.createElement(
    'div',
    { className: 'section' },
    React.createElement(Points, null)
  )
), document.getElementById('root'));