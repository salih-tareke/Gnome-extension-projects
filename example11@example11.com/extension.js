const {St, GObject} = imports.gi;
const Main = imports.ui.main;
const DND = imports.ui.dnd;

let container1, container2;

const MyContainer1 = GObject.registerClass(
class MyContainer1 extends St.Bin {

  _init () {
  
    super._init({
      style : 'background-color : gold',
      reactive : true,
      can_focus : true,
      track_hover : true,
      width : 120,
      height : 120,
      x : 0,
      y : 0,
    });
    
    this._delegate = this;
    
    this._draggable = DND.makeDraggable(this, {
      //restoreOnSuccess : true,
      //manualMode : false,
      //dragActorMaxSize : 80,
      //dragActorOpacity : 200,
    });
    
    this._draggable.connect("drag-begin", () => {
      log("DRAG BEGIN");
      this._setDragMonitor(true);
    });
    
    this._draggable.connect("drag-end", () => {
      log("DRAG END");
      this._setDragMonitor(false);
    });
    
    this._draggable.connect("drag-cancelled", () => {
      log("DRAG CANCELLED");
      this._setDragMonitor(false);
    });
    
    this.connect("destroy", () => {
      this._setDragMonitor(false);
    });
  
  }
  
  _setDragMonitor (add) {
  
    if (add) {
      this._dragMonitor = {
        dragMotion : this._onDragMotion.bind(this),
        //dragDrop : this._onDragDrop.bind(this),
      };
      DND.addDragMonitor(this._dragMonitor);
    } else if (this._dragMonitor) {
      DND.removeDragMonitor(this._dragMonitor);
    }
  
  }
  
  _onDragMotion (dragEvent) {
  
    if (dragEvent.targetActor instanceof MyContainer2) {
      return DND.DragMotionResult.MOVE_DROP;
    }
    
    // DND.DragMotionResult.COPY_DROP
    // DND.DragMotionResult.MOVE_DROP
    // DND.DragMotionResult.NO_DROP
    // DND.DragMotionResult.CONTINUE
    return DND.DragMotionResult.CONTINUE;
  }
  
  _onDragDrop (dropEvent) {
  
    // DND.DragDropResult.FAILURE
    // DND.DragDropResult.SUCCESS
    // DND.DragDropResult.CONTINUE
    return DND.DragDropResult.CONTINUE;
  }

});

const MyContainer2 = GObject.registerClass(
class MyContainer2 extends St.Bin {

  _init () {
  
    super._init({
      style : 'background-color : lime',
      reactive : true,
      can_focus : true,
      track_hover : true,
      width : 120,
      height : 120,
      x : 0,
      y : 750,
    });
    
    this._delegate = this;
  
  }
  
  acceptDrop (source, actor, x, y, time) {
  
    if (!source instanceof MyContainer1) {
      return false;
    }
    
    source.get_parent().remove_child(source);
    this.set_child(source);
    
    log('Drop has been accepted');
    
    return true;
  }

});

function init() {
  container1 = new MyContainer1();
  container2 = new MyContainer2();
}

function enable() {

  let chromeSettings = {
    affectsInputRegion : true,
    trackFullscreen : true,
  };

  Main.layoutManager.addChrome(container1, chromeSettings);
  Main.layoutManager.addChrome(container2, chromeSettings);
}

function disable() {
  Main.layoutManager.removeChrome(container1);
  Main.layoutManager.removeChrome(container2);
}

