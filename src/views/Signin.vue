<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Вход</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-alert :value="error" type="warning">
                            {{error}}
                        </v-alert>
                        <v-form>
                            <v-text-field label="Е-мейл" name="email" prepend-icon="mdi-account" type="email" required v-model="email" :rules="emailRules">
                            </v-text-field>

                            <v-text-field id="password" label="Пароль" name="password" prepend-icon="mdi-lock" type="password" required v-model="password" :rules="passwordRules">
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click.prevent="signin" :disabled="processing">Войти</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null,
            valid: false,
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
        error() {
            return this.$store.getters.getError
        },
        processing() {
            return this.$store.getters.getProcessing
        },
        isUserAuthenticated() {
            return this.$store.getters.isUserAuthenticated
        }
    },
    watch: {
        isUserAuthenticated(val) {
            if (val === true) {
                this.$router.push("/")
            }
        }
    },
    methods: {
        signin() {
            this.$store.dispatch('SIGNIN', {email:this.email, password:this.password})
        }
    }
}
</script>

<style scoped>

</style>