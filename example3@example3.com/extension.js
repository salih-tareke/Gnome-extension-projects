const Gio = imports.gi.Gio;
const Me = imports.misc.extensionUtils.getCurrentExtension();

function getSettings() {
  let GioSSS = Gio.SettingsSchemaSource;
  let schemaSource = GioSSS.new_from_directory(
    Me.dir.get_child("schemas").get_path(),
    GioSSS.get_default(),
    false
  );
  let schemaObj = schemaSource.lookup(
    'org.gnome.shell.extensions.example3', true);
  if (!schemaObj) {
    throw new Error('cannot find schemas');
  }
  return new Gio.Settings({ settings_schema : schemaObj });
}

function init() {

  let settings = getSettings();
  
  // my integer
  //settings.set_int('my-integer', 200);
  log( "my integer:" + settings.get_int('my-integer').toString() );

  // my double
  //settings.set_double('my-double', 2.1);
  log( "my double:" + settings.get_double('my-double').toString() );

  // my boolean
  //settings.set_boolean('my-boolean', true);
  log( "my boolean:" + settings.get_boolean('my-boolean').toString() );
  
  // my string
  //settings.set_string('my-string', 'new string');
  log( "my string:" + settings.get_string('my-string') );

  // my array
  //settings.set_strv('my-array', ['new', 'new2']);
  let arr = settings.get_strv('my-array');
  log( "my array:" + arr[1] );
  
  // my position
  //settings.set_enum('my-position', 2);
  log( "my position:" + settings.get_enum('my-position').toString() );
}

function enable() {	
}

function disable() {
}

