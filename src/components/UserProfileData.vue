<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0"><v-icon>mdi-account</v-icon>{{userName}}</h3>
                <h3 class="headline mb-0"><v-icon>mdi-email</v-icon>{{userEmail}}</h3>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
                <v-dialog  v-model="dialog" persistent max-width="550">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" text color="orange">Изменить мои данные</v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">Изменить мои данные?</v-card-title>
                        <v-card-text>
                            <v-alert :value="getError" type="warning">
                                {{getError}}
                            </v-alert>
                            <v-form v-model="valid">
                                <v-text-field label="Е-мейл" name="email" prepend-icon="mdi-email" type="email" v-model="email" :rules="emailRules">
                                </v-text-field>

                                <v-text-field id="password" label="Пароль" name="password" prepend-icon="mdi-lock" type="password" required v-model="password" :rules="passwordRules">
                                </v-text-field>
                            </v-form>
                            <h3>Я хочу изменить</h3>
                            <v-radio-group v-model="changeType">                          
                                <v-radio label="Имя" :value="'name'"></v-radio>
                                <v-text-field v-if="changeType == 'name'" label="Новое имя" name="newname" prepend-icon="mdi-account" type="text" required v-model="newname" :rules="nameRules">
                                </v-text-field>
                                <v-radio label="Е-мейл" :value="'email'"></v-radio>
                                <v-text-field v-if="changeType == 'email'" label="Новый е-мейл" name="newemail" prepend-icon="mdi-email" type="email" v-model="newemail" :rules="emailRules">
                                </v-text-field>
                                <v-radio label="Пароль" :value="'password'"></v-radio>
                                <v-text-field v-if="changeType == 'password'" label="Новый пароль" id="password" name="newpassword" prepend-icon="mdi-lock" type="password" required v-model="newpassword" :rules="passwordRules">
                                </v-text-field>
                            </v-radio-group>                                                 
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="dialog = false">Отменить</v-btn>
                            <v-btn color="green darken-1" text @click.prevent="changeUserData" :disabled="getProcessing || !valid">Изменить</v-btn>
                        </v-card-actions>
                    </v-card>                
                </v-dialog>
        </v-card-actions>
    </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            dialog: false,
            changeType: 'name',

            email: null,
            password: null,
            
            newname: null,
            newemail: null,
            newpassword: null,

            valid: false,
            nameRules: [
                (v) => !!v || 'Пожалуйста введите Ваше имя',
            ],
            emailRules: [
                (v) => !!v || 'Пожалуйста введите е-мейл',
                (v) => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(v) || 'Неправильный е-мейл'
            ],
            passwordRules: [
                (v) => !!v || 'Пожалуйста введите пароль',
                (v) => (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
            ],
        }
    },
    computed: {
        ...mapGetters(['userName', 'userEmail', 'getProcessing', 'getError'])
    },
    methods: {
        changeUserData() {
            this.$store.dispatch('CHANGE_USER_PROFILE_DATA', {
                email: this.email,
                password: this.password,
                newName: this.newname,
                newEmail: this.newemail,
                newPassword: this.newpassword,
                changeType: this.changeType,
            })
        }
    },
    created() {
        this.$bus.$on('user-profile-data-changed', () => {
            this.dialog = false
        })
    },
    beforeDestroy() {
        this.$bus.$off('user-profile-data-changed')
    }
}
</script>

<style scoped>

</style>