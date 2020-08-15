const Main = imports.ui.main;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;

let container;

function init() {

  let monitor = Main.layoutManager.primaryMonitor;
  let size = 100;

  container = new St.Bin({
    style: 'background-color: gold',
    reactive : true,
    can_focus : true,
    track_hover : true,
    width: size,
    height: size,
  });
  
  container.set_position(monitor.width-size, monitor.height-size);
  
  container.connect("button-press-event", () => {
  
    let [xPos, yPos] = container.get_position();
    let newX = (xPos === 0) ? monitor.width-size : 0;
    
    container.ease({    
      x: newX,      
      //y: 10,
      //opacity: 100,
      duration: 2000,
      mode: Clutter.AnimationMode.EASE_OUT_BOUNCE,
      onComplete: () => {
          log('Animation is finished');
      }
    });
    
  });
}

function enable() {
  Main.layoutManager.addChrome(container, {
    affectsInputRegion : true,
    trackFullscreen : true,
  });
}

function disable() {
  Main.layoutManager.removeChrome(container);
}

