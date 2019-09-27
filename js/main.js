
var app;
var dias_bolsa = 1460;
var dias_timer = 100; // ms
var dias_subtract = 1;
var dias_interval;
var answers_tried ;

/*
https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
*/
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


function render() {




  // Modal component
  Vue.component('modal', {
    template: '#modal',
  })


  /* Vue app
  --------------------------------------------- */
  app = new Vue({
    el: '#app',
    data: {
        screens: screens,
        current_screen: 1,
        dias: dias_bolsa,
        diasAnimado: dias_bolsa,
        answers_tried: []
    },
    computed: {
    },
    methods: {
      startCountdown: function() {
        dias_interval = setInterval(() => {
          if (app.dias >= 1) {
            app.dias = app.dias - dias_subtract;
          } else {
            app.stopCountdown()
            current_screen = 90
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
        //app.answers_tried = [] // reset answers tried
        if (screen_number == 3) { // Starts game
          document.querySelector('#dias').classList.remove('dn')
          app.startCountdown();

        }
        console.log(screen_number);
      },
      restartGame: function() {
        app.menu = false;
        app.goTo(1);
        app.dias = dias_bolsa;
      },
      badGameOver: function() {
        
      },
      successGameOver: function() {
      
      },
      checkAnswer(event) {
        answer_value = event.target.getAttribute('data-truth');
        console.log(answer_value);
      },
      keyEvent(event) {
        if (event.key == 'r') {
          location.reload(); 
        } else if (event.key == 'a') {
          document.querySelectorAll("button[data-key='"+ event.key + "']")[0].click();
        } else if (event.key == 'b') {
          document.querySelectorAll("button[data-key='"+ event.key + "']")[0].click();
        } else if (event.key == 'c') {
          document.querySelectorAll("button[data-key='"+ event.key + "']")[0].click();
        } else if (event.key == 'd') {
          document.querySelectorAll("button[data-key='"+ event.key + "']")[0].click();
        }
      }
    },
    updated: function() {
      if (!app.menu) {
        //register_press();
      }
    },
    mounted: function() {
      //register_press();
      //this.startCountdown();
      // a = 65; b = 66; c = 67; d = 68)
      window.addEventListener('keydown', function(event) {
        app.keyEvent(event)
  
       });
      /* Loading... */
      document.querySelector('.loading').classList.add('dn')
      document.querySelector('.static_screens').classList.remove('dn')

      /* for proper 100vh */
      window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    }, // End of mounted
    watch: {
    },
  })






}