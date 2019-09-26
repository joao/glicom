
var app;
var dias_bolsa = 1460;
var dias_timer = 100; // ms
var dias_subtract = 1;
var interval;


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





  /* Vue app
  --------------------------------------------- */
  app = new Vue({
    el: '#app',
    data: {
        screens: screens,
        current: 1,
        menu: false,
        dias: dias_bolsa,
        diasAnimado: dias_bolsa
    },
    computed: {
    },
    methods: {
      startCountdown: function() {
        setInterval(() => {
          if (app.dias >= 1) {
            app.dias = app.dias - dias_subtract;
          } else {
            clearInterval();
          }
        }, dias_timer);
      },
      removeCountdown: function() {

      },
      previous: function() {
        if (app.current != 1) {
          app.current = app.current - 1
        }
      },
      next: function() {
        if (app.current != app.screens.length) {
          app.current = app.current + 1
        }
      },
      goTo: function(screen_number) {
        app.current = screen_number
      },
      restartGame: function() {
        app.goTo(1);
        app.menu = false;
        app.dias = dias_bolsa;
      },
      gameOver: function() {

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
      window.addEventListener('keydown', function(ev) {
        if (ev.key == 'a') {
          app.goTo(2);
        } else if (ev.key == 'b') {
          app.goTo(3);
        } else if (ev.key == 'c') {
          app.goTo(4)
        } else if (ev.key == 'd') {
          app.goTo(5)
        }
       });
    },
    watch: {
    },
  })






}