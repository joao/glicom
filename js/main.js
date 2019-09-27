
var app;
var dias_bolsa = 1460;
var dias_timer = 100; // ms
var dias_subtract = 1;
var dias_interval;


function render() {


  /* Hammer
  --------------------------------------------- */

  // Swipes + long press
  function register_press() {

    let hammertime = new Hammer(document.querySelector('#app'))

    hammertime.get('press').set({
          time: 1000
      });

   hammertime.on('press', (e) => {
      if (app.menu != true) {
        app.menu = true
      }
    })
  }




 // // Modal component
 //  Vue.component('screen', {
 //    template: '#component-screen',
 //  })


  /* Vue app
  --------------------------------------------- */
  app = new Vue({
    el: '#app',
    data: {
        screens: screens,
        current_screen: 1,
        menu: false,
        dias: dias_bolsa,
        diasAnimado: dias_bolsa
    },
    computed: {
    },
    methods: {
      startCountdown: function() {
        dias_interval = setInterval(() => {
          if (app.dias >= 1) {
            app.dias = app.dias - dias_subtract;
          } else {
            clearInterval();
          }
        }, dias_timer);
      },
      stopCountdown: function() {
        clearInterval(dias_interval)
      },
      previous: function() {
        if (app.current_screen != 1) {
          app.current_screen = app.current_screen - 1
        }
      },
      next: function() {
        if (app.current_screen != app.screens.length) {
          app.current_screen = app.current_screen + 1
        }
      },
      goTo: function(screen_number) {
        app.current_screen = screen_number
      },
      restartGame: function() {
        app.goTo(1);
        app.menu = false;
        app.dias = dias_bolsa;
      },
      badGameOver: function() {
        
      },
      successGameOver: function() {
      
      },
      keyEvent(event) {
        // console.log(event.key);
        if (event.key == 'a') {
          document.querySelectorAll("[data-key='"+ event.key + "']")[0].click();
          //app.goTo(2);
        } else if (event.key == 'b') {
          app.goTo(3);
        } else if (event.key == 'c') {
          app.goTo(4)
        } else if (event.key == 'd') {
          app.goTo(5)
        }
      }
    },
    updated: function() {
      if (!app.menu) {
        register_press();
      }
    },
    mounted: function() {
      register_press();
      this.startCountdown();
      // a = 65; b = 66; c = 67; d = 68)
      window.addEventListener('keydown', function(event) {
        app.keyEvent(event)
        // if (event.key == 'a') {
        //   app.goTo(2);
        // } else if (event.key == 'b') {
        //   app.goTo(3);
        // } else if (event.key == 'c') {
        //   app.goTo(4)
        // } else if (event.key == 'd') {
        //   app.goTo(5)
        // }
       });
      document.querySelector('.loading').classList.add('dn')
      document.querySelector('#dias').classList.remove('dn')
      document.querySelector('.static_screens').classList.remove('dn')
    },
    watch: {
    },
  })






}