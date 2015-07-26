import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from '../components/app';
import NotesIndex from '../components/notes-index';
import Notes from '../components/notes';
import TrashedNotes from '../components/trashed-notes';
// import NotFound from '../components/notfound';

export default (
  <Route path="/" handler={App}>
    <Route name="notes" path="notes/:id" handler={Notes} />
    <Route name="trashed-notes" path="trash" handler={TrashedNotes} />
    <DefaultRoute name="notes-index" handler={NotesIndex} />
  </Route>
)
    // <Route name="trashed-notes" path="trashed/notes/:id" handler={TrashedNotes} />
