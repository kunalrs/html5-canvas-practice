let utils = {};

utils.captureMouse = function(element) {
    let mouse = {x: 0, y: 0};
    element.addEventListener("mousemove", function(event){
       let x, y;
       if(event.pageX || event.pageY) {
           x = event.pageX;
           y = event.pageY;
       } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
       }

       x -= element.offsetLeft;
       y -= element.offsetTop;

       mouse.x = x;
       mouse.y = y;
    });

    return mouse;
};


utils.captureTouch = function(element) {
    let touch = { x: null, y: null, isPressed: false };

    element.addEventListener("touchstart", function(event) {
        touch.isPressed = true;
    });

    element.addEventListener("touchend", function(event) {
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
    });

    element.addEventListener("touchmove", function(event) {
        let x, y,
        touch_event = event.touches[0]; // first touch
        if(touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        } else {
            x = touch_event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = touch_event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        x -= element.offsetLeft;
        y -= element.offsetTop;

        touch.x = x;
        touch.y = y;
    });

    return touch;
}

if(!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000/60);
        }
    );
}
