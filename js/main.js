
var app;


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
      app.menu = !app.menu
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
        menu: false
    },
    computed: {

    },
    methods: {
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
      }
    },
    updated: function() {
      if (!app.menu) {
        register_press();
      }
    },
    mounted: function() {
      register_press();
    }
  })






}