{
    
    //
    // Inject gamepad events as keyboard events
    //
    
    // set this to true to log button events to the console 
    // (useful to discover button id's) for a new controller
    const LOG_BUTTON_PRESSES = true;

    // gamepad device state
    let pad = {
        device: null,
        mapping: [
            // [button_id, char_code_to_inject, last_button_state] 
            [8,  'a', false],
            [9,  'b', false],
            [10, 'c', false], 
            [11, 'd', false]
        ]
    };
    
    window.addEventListener("gamepadconnected", (ev) => {
        if (pad.device === null) {
            pad.device = ev.gamepad.index;
            console.log("Using controller:", ev.gamepad.id)
        }
        
        console.log("Start polling controller...");
        window.requestAnimationFrame(poll_pads);
    });
    
    window.addEventListener("gamepaddisconnected", (ev) => {
        if (ev.gamepad.index === pad.device) {
            pad.device = null;
            console.log("Detaching controller:", ev.gamepad.id)
        }
    });
    
    const poll_pads = () => {
        if (pad.device === null) {
            console.log("Controller polling stopped");
            return;
        }
        
        let pad_state = navigator.getGamepads()[pad.device];
        
        if (LOG_BUTTON_PRESSES) {
            for (let button_id = 0; button_id < pad_state.buttons.length; button_id++) {
                if (pad_state.buttons[button_id].pressed) {
                    console.log(`Controller button ${button_id} pressed`);
                }
            }
        }

        for (button_mapping of pad.mapping) {
            let [button_id, to_char, last_state] = button_mapping;
            let new_state = pad_state.buttons[button_id].pressed;
            if (new_state != last_state) {
                if (new_state === false) {
                    inject_keypress (to_char);
                }
                button_mapping[2] = new_state;
            }
        }
        
        window.requestAnimationFrame(poll_pads);
    }
    
    const inject_keypress = (char_code) => {
        let ev = new KeyboardEvent ("keydown", { bubbles: true, cancelable: true, key: char_code, char: char_code });
        document.body.dispatchEvent(ev);
    }
}