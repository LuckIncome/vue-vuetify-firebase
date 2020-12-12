import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VuetifyConfirm from 'vuetify-confirm';
import firebaseConfig from './config/firebase';
import firebase from 'firebase';
import 'firebase/firestore';
import VueYouTubeEmbed from 'vue-youtube-embed';
import FormattedDate from './filters/formattedDate';
import {setupBus} from './infrastructure/eventBus';

Vue.config.productionTip = false

Vue.use(VueYouTubeEmbed);
Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Да',
  buttonFalseText: 'Нет',
  width: 400,
});

Vue.filter('formattedDate', FormattedDate)

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
db.settings({
  timestampsInSnapshots: true
});

Vue.$db = db;

setupBus()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    let vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      vm.$store.dispatch('STATE_CHANGED', user)
    });
    this.$store.dispatch('LOAD_BOOKS')
  }
}).$mount('#app')
