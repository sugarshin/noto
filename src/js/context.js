import NoteListActions from './actions/note-list-actions';
import NoteActions from './actions/note-actions';
import SettingActions from './actions/setting-actions';

import NoteStore from './stores/note-store';
import SettingStore from './stores/setting-store';
import RefineTagStore from './stores/refine-tag-store';

export default {
  noteListActions: new NoteListActions(),
  noteActions: new NoteActions(),
  settingActions: new SettingActions(),

  noteStore: new NoteStore(),
  settingStore: new SettingStore(),
  refineTagStore: new RefineTagStore()
}
