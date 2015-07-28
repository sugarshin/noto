import Promise from 'bluebird';
import regeneratorRuntime from 'babel-runtime/regenerator';
import React from 'react';
import { run, HashLocation } from 'react-router';

import routes from './config/routes';
import { APP_ELEMENT_ID } from './constants/constants';

global.Promise = global.Promise || Promise;
global.regeneratorRuntime = regeneratorRuntime;

run(routes, HashLocation, Root => {
  React.render(<Root />, document.getElementById(APP_ELEMENT_ID));
});
