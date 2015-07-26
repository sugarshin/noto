import Promise from 'bluebird';
import regeneratorRuntime from 'babel-runtime/regenerator';
import React from 'react';
import { run, HashLocation } from 'react-router';

import routes from './config/routes';

global.Promise = global.Promise || Promise;
global.regeneratorRuntime = regeneratorRuntime;

run(routes, HashLocation, Root => {
  React.render(<Root />, document.getElementById('container'));
});
