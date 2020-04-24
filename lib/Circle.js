function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from '../web_modules/react.js';
export default Circle;

function Circle(_ref) {
  let { rad, count } = _ref,
      props = _objectWithoutProperties(_ref, ['rad', 'count']);

  var defaultThreshold = 410;
  var threshold = new URLSearchParams(document.location.search).get('threshold') || defaultThreshold;

  if (rad > threshold) {
    rad = threshold;
  }

  let percent = rad / threshold;
  let red = Math.floor(percent * 212);
  let green = Math.floor(212 - red);
  let factor = threshold / 146.0;

  let p = 309 * (count / 360) * percent;
  let q = 309 * percent - p;

  // console.log(rad, percent, count, p, factor)

  return React.createElement(
    'svg',
    { width: '300', height: '300', viewBox: '-25 -25 400 400' },
    React.createElement('circle', {
      cx: '175',
      cy: '175',
      stroke: 'Moccasin',
      fill: 'none',
      strokeWidth: '30',
      r: 175
      //        r={rad / factor}
    }),
    React.createElement('circle', {
      cx: '175',
      cy: '175',
      strokeDashoffset: '1100',
      strokeDasharray: '1100',
      stroke: 'rgb(' + red + ', ' + green + ', 0)',
      transform: 'rotate(-90 175 175)',
      fill: 'none',
      strokeLinecap: 'round',
      strokeWidth: '30',
      style: {
        strokeDashoffset: (360 - count) * 1100 / 360,
        transition: '1s ease-out 0s'
      },
      r: 175
      //        r={rad / factor}
    }),
    React.createElement(
      'text',
      {
        fill: 'rgb(' + count % 30 * 255 / 30.0 + ', ' + (30 - count % 30) * 255 / 30.0 + ', 0)',
        x: '50%',
        y: '50%',
        dx: '-25',
        textAnchor: 'middle',
        style: {
          font: 'bold 5rem Helvetica, Arial, sans-serif'
        }
      },
      Math.floor(count * 12 / 360)
    )
  );
}