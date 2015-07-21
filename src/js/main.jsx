import regeneratorRuntime from 'babel-runtime/regenerator';
import Promise from 'bluebird';
import co from 'co';
import React from 'react';
import { run, HashLocation } from 'react-router';

import routes from './config/routes';
import { noteListActions, settingActions } from './context';

global.regeneratorRuntime = regeneratorRuntime;

co(function* () {
  yield Promise.all([noteListActions.fetch(), settingActions.fetch()]);

  run(routes, HashLocation, Root => {
    React.render(<Root />, document.getElementById('app'));
  });
})
.catch(err => console.log('main.jsx#entryPoint:\n', err));
