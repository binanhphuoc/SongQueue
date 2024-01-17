// eslint-disable-next-line unused-imports/no-unused-imports
import _NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    username: string
    password: string
  }
}
