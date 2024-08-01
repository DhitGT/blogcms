<template>
  <h1 class="text-3xl text-red-500 font-bold underline">Hello world!</h1>
</template>
<script>
export default {
  async mounted() {
    await this.checkAuth()
  },

  // adsasdasdasdasd

  methods: {
    async checkAuth() {
      try {
        const auth = this.$firebase.auth

        await new Promise((resolve, reject) => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe()
            resolve(user)
          }, reject)
        })
          .then((user) => {
            if (user) {

              console.log('Current User:', user)
              // You can access user properties like user.uid, user.displayName, etc.
            } else {
              // No user is signed in, redirect to login page or handle accordingly
              this.$router.push('/auth/login')
            }
          })
          .catch((error) => {
            console.error('Error checking authentication:', error)
            // Handle error, such as displaying an error message
          })
      } catch (error) {
        console.error('Error initializing Firebase:', error)
        // Handle initialization error, if Firebase fails to initialize
      }
    },
  },
}
</script>
