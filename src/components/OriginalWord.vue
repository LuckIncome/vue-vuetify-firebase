<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-avatar v-bind="attrs" v-on="on" v-if="word.type == 1" color="teal" :size="size">
                    <span class="white--text">W</span>
                </v-avatar>
            </template>
            <span>Слово / das Wort</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-avatar v-bind="attrs" v-on="on" v-if="word.type == 2" color="indigo" :size="size">
                    <span class="white--text">RW</span>
                </v-avatar>
            </template>
            <span>Выражение / die Redewening</span>
        </v-tooltip>
        {{getFullOriginalWord(word)}} <v-icon v-if="canPronounceWord" @click="pronounce(word)">mdi-note</v-icon>
    </div>
</template>

<script>
import {getFullOriginalWord} from '../helpers/words'
export default {
   props: {
        word: Object,
        size: Number,
        showAudio: {
            type: Boolean,
            default: false
        }
   },
   data() {
       return {
           canPronounceWord: false,
           voice: null
       }
   },
   methods: {
       getFullOriginalWord: getFullOriginalWord,
       pronounce(word) {
           let msg = new SpeechSynthesisUtterance()
           msg.voice = this.voice
           msg.rate = 1
           msg.pitch = 1
           msg.volume = 1
           msg.text = this.getFullOriginalWord(word)
           speechSynthesis.speak(msg)
       }
   },
   created() {
       if(this.showAudio) {
        if('speechSynthesis' in window) {
            let germanVoice = speechSynthesis.getVoices().filter(v => v.name.toLocaleLowerCase().indexOf('deutsch') >= 1)
            if(germanVoice.length) {
                this.canPronounceWord = true
                this.voice = germanVoice[0]
            }
        }
       }
   }
}
</script>

<style scoped>

</style>