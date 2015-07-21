import React from 'react';
import { Route, Redirect, NotFoundRoute } from 'react-router';

import App from '../components/app';
import Note from '../components/note';
// import NotFound from '../components/notfound';

export default (
  <Route path="/" handler={App}>
    <Route name="notes" path="notes/:id" handler={Note} />
  </Route>
)
  //  <Route name="trash" path="trash/notes/:id" handler={TrashedNotes} />
