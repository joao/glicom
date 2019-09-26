
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


 /* Register clicks
  * Run on every update
  --------------------------------------------- */
 // function register_clicker() {

 //   let hammerLeft = new Hammer(document.querySelector('.left'))
 //   let hammerRight = new Hammer(document.querySelector('.right'))

 //    hammerLeft.on('tap', (e) => {
 //      if (app.current != 1) {
 //        app.current = app.current - 1
 //      }
 //    })

 //    hammerRight.on('tap', (e) => {
 //      if (app.current != app.screens.length) {
 //        app.current = app.current + 1
 //      }
 //    })

 //  }





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
       animatedDias: function() {
         return this.diasAnimado.toFixed(0);
       }
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
    },
    watch: {
      // dias: function(newValue) {
      //   TweenLite.to(this.$data, 1, { diasAnimado: newValue, ease: Linear.easeNone });
      // }
    },
  })






}