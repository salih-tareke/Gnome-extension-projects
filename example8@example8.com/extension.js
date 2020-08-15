const Main = imports.ui.main;
const St = imports.gi.St;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Me = imports.misc.extensionUtils.getCurrentExtension();

let myPopup;

const MyPopup = GObject.registerClass(
class MyPopup extends PanelMenu.Button {

  _init () {
  
    super._init(0);
    
    let icon = new St.Icon({
      //icon_name : 'security-low-symbolic',
      gicon : Gio.icon_new_for_string( Me.dir.get_path() + '/icon.svg' ),
      style_class : 'system-status-icon',
    });
    
    this.add_child(icon);
    
    let pmItem = new PopupMenu.PopupMenuItem('Normal Menu Item');
    pmItem.add_child( new St.Label({ text : 'Label added to the end' }) );
    this.menu.addMenuItem(pmItem);
    
    pmItem.connect('activate', () => {
      log('clicked');
    });
    
    this.menu.addMenuItem( new PopupMenu.PopupSeparatorMenuItem() );
    
    this.menu.addMenuItem(
      new PopupMenu.PopupMenuItem(
        "User cannot click on this item",
        {reactive : false},
      )
    );
    
    this.menu.connect('open-state-changed', (menu, open) => {
      if (open) {
        log('opened');
      } else {
        log('closed');
      }
    });
    
    // sub menu
    let subItem = new PopupMenu.PopupSubMenuMenuItem('sub menu item');
    this.menu.addMenuItem(subItem);
    subItem.menu.addMenuItem( new PopupMenu.PopupMenuItem('item 1') );
    subItem.menu.addMenuItem( new PopupMenu.PopupMenuItem('item 2'), 0 );
    
    // section
    let popupMenuSection = new PopupMenu.PopupMenuSection();
    popupMenuSection.actor.add_child( new PopupMenu.PopupMenuItem('section') );
    this.menu.addMenuItem(popupMenuSection);
    
    // image item
    let popupImageMenuItem = new PopupMenu.PopupImageMenuItem(
      'Menu Item with Icon',
      'security-high-symbolic',
    );
    this.menu.addMenuItem(popupImageMenuItem);
    
    // you can close, open and toggle the menu with
    // this.menu.close();
    // this.menu.open();
    // this.menu.toggle();
  }

});

function init() {
}

function enable() {
  myPopup = new MyPopup();
  Main.panel.addToStatusArea('myPopup', myPopup, 1);
}

function disable() {
  myPopup.destroy();
}

