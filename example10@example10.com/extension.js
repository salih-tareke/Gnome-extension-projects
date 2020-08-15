const {Gio, Shell, Meta} = imports.gi;
const Main = imports.ui.main;
const Me = imports.misc.extensionUtils.getCurrentExtension();

function getSettings() {
  let GioSSS = Gio.SettingsSchemaSource;
  let schemaSource = GioSSS.new_from_directory(
    Me.dir.get_child("schemas").get_path(),
    GioSSS.get_default(),
    false
  );
  let schemaObj = schemaSource.lookup(
    'org.gnome.shell.extensions.example10', true);
  if (!schemaObj) {
    throw new Error('cannot find schemas');
  }
  return new Gio.Settings({ settings_schema : schemaObj });
}

function init() {
}

function enable() {

  // Shell.ActionMode.NORMAL
  // Shell.ActionMode.OVERVIEW
  // Shell.ActionMode.LOCK_SCREEN
  // Shell.ActionMode.ALL
  let mode = Shell.ActionMode.ALL;

  // Meta.KeyBindingFlags.NONE
  // Meta.KeyBindingFlags.PER_WINDOW
  // Meta.KeyBindingFlags.BUILTIN
  // Meta.KeyBindingFlags.IGNORE_AUTOREPEAT
  let flag = Meta.KeyBindingFlags.NONE;

  let settings = getSettings();
  
  Main.wm.addKeybinding("my-shortcut", settings, flag, mode, () => {
    log('shortcut is working');
  });
}

function disable() {
  Main.wm.removeKeybinding("my-shortcut");
}

