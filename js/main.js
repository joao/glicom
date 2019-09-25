var app;



function render() {


  /* Hammer
  --------------------------------------------- */

  // Swipes + long press
  function register_menu_swipes() {

    let hammertime = new Hammer(document.querySelector('#app'))

    hammertime.get('press').set({
          time: 1000
      });

    hammertime.on('swiperight', (e) => {
      if (app.current != 1) {
        app.current = app.current - 1
      }
    })

    hammertime.on('swipeleft', (e) => {
      if (app.current != app.screens.length ) {
        app.current = app.current + 1
      }
    })


   hammertime.on('press', (e) => {
      app.menu = !app.menu
    })
  }


 /* Register clicks
  * Run on every update
  --------------------------------------------- */
 function register_clicker() {

   let hammerLeft = new Hammer(document.querySelector('.left'))
   let hammerRight = new Hammer(document.querySelector('.right'))

    hammerLeft.on('tap', (e) => {
      if (app.current != 1) {
        app.current = app.current - 1
      }
    })

    hammerRight.on('tap', (e) => {
      if (app.current != app.screens.length) {
        app.current = app.current + 1
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
        menu: false
    },
    computed: {

    },
    updated: function() {
      if (!app.menu) {
        register_clicker();
      }
    },
    mounted: function() {
      register_menu_swipes()
      register_clicker();
    }
  })






}