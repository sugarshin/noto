import regeneratorRuntime from 'babel-runtime/regenerator';
import React from 'react';
import { run, HashLocation } from 'react-router';

import routes from './config/routes';
import { noteListActions, settingActions } from './context';

global.regeneratorRuntime = regeneratorRuntime;

noteListActions.fetch();
settingActions.fetch();

run(routes, HashLocation, Root => {
  React.render(<Root />, document.getElementById('container'));
});
