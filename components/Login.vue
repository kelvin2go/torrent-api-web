<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      v-if="!$auth.loggedIn"
      max-width="500px"
      dark
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary lighten-2"
          dark
          v-on="on"
        >
          Login
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Login
        </v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
          >

            <v-text-field
              v-model="form.identifier"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :rules="requiredRules"
              label="Password"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'visibility_off' : 'visibility'"
              @click:append="show1 = !show1"
              required
            ></v-text-field>

          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            @click="dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="login"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-else>
      {{$auth.user.username}}
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
            stylue="height: 64px;"
          >
             <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <a
                href="#"
                @click="$auth.logout"
              > LOGOUT</a> 
      </v-list-item-title>
      </v-list-item>
      </v-list>
      </v-menu> -->
    </div>
  </div>
</template>


<script>
const API_URL = process.env.API_URL
export default {
  data: () => ({
    valid: true,
    dialog: false,
    email: '',
    requiredRules: [v => !!v || 'password is required'],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    form: {
      identifier: '',
      password: ''
    },
    show1: false,
  }),
  mounted () {
  },
  methods: {
    getMessage () {
      this.socket1.emit('getMovie', { id: 'helloid' }, (resp) => {
        this.messageRxd = resp
      })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    login () {
      this.loading = true
      this.error = {}
      const that = this

      // const { data } = await this.$axios.post(`${API_URL}/auth/local`, this.form)
      this.$auth.loginWith('local', {
        data: this.form
      }).then(function (data) {
        that.$router.push('/movie')
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        that.loading = false
      })

    },
  },
}
</script>