const Me = imports.misc.extensionUtils.getCurrentExtension();
const Gettext = imports.gettext;

Gettext.bindtextdomain( "example4", Me.dir.get_child("locale").get_path() );
Gettext.textdomain("example4");
const _ = Gettext.gettext;

function init() {
  log( _("Hello My Friend") );
  log( Gettext.ngettext("%d item", "%d items", 10).replace("%d", 10) );
}

function enable() {	
}

function disable() {
}

