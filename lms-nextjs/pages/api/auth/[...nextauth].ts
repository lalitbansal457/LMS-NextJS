import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { signIn, signOut } from "next-auth/react"

export default NextAuth({
  providers: [
    // OAuth authentication providers
    
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  callbacks: {
      async signIn(user, account, profile) {
        console.log(user, account, profile);
        if (account.provider === 'google' &&
            profile.verified_email === true
            ) {
          return true
        } else {
          return false
        }
      },
    }
  // SQL or MongoDB database (or leave empty)
  //database: process.env.DATABASE_URL,
}

)