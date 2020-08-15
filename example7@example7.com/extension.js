const Main = imports.ui.main;
const St = imports.gi.St;

let button;

function init() {

  let pMonitor = Main.layoutManager.primaryMonitor;

  button = new St.Bin({
    style_class : 'bg-color',
    reactive : true,
    can_focus : true,
    track_hover : true,
    height : 30,
    width : pMonitor.width,
  });
  
  button.set_position(0, pMonitor.height - 30);
  
  button.connect("enter-event", () => {
    log('entered');
  });
  
  button.connect("leave-event", () => {
    log('left');
  });
  
  button.connect("button-press-event", () => {
    log('clicked');
    //Main.notify('Message Title', 'Message Body');
    if (Main.overview.visible) {
      Main.overview.hide();
    } else {
      Main.overview.show();
    }
  });
}

function enable() {
  //Main.uiGroup.add_child(button);
  Main.layoutManager.addChrome(button, {
    affectsInputRegion : true,
    affectsStruts : true,
    trackFullscreen : true,
  });
}

function disable() {
  //Main.uiGroup.remove_child(button);
  Main.layoutManager.removeChrome(button);
}

