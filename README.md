# E-commerce demo

## Tech stack

- Next.js
- TypeScript
- Tailwind CSS
- Stripe
- Zustand
- Framer Motion

## Stripe Local Setup
- `brew install stripe/stripe-cli/stripe`
- `stripe login`
- `stripe listen --forward-to localhost:3000/api/strapi-webhook`
- `stripe trigger payment_intent.succeeded`

## Sources

- https://medium.com/@akanksha.t05/how-to-add-husky-in-a-next-js-app-9a10817b761d
- https://medium.com/yavar/setting-up-a-eslint-prettier-husky-and-lint-staged-integration-with-typescript-in-next-js-13-14-68044dfae920
- https://medium.com/@vaibhavsinha619/setting-up-prettier-eslint-husky-and-lint-staged-with-a-next-js-and-typescript-project-75d1a804e1fd
- https://pertic-store-demo.myshopify.com/ - password = 1
- https://blog.logrocket.com/guide-adding-google-login-react-app/
- https://medium.com/@mak-dev/zustand-with-next-js-14-server-components-da9c191b73df
- https://docs.pmnd.rs/zustand/guides/nextjs
- https://blog.logrocket.com/integrating-google-maps-react/
- https://youtu.be/_TVrn-pyTo8
- https://www.jamesshopland.com/blog/nextjs-firebase-admin-sdk

## TODO:
- Product variants
- Product Image modal
- Subscribe modal
- Image Optimization
- on addProduct update stripe products as well
- getProductsByTags
- tags as a separate sql table
- reviews as a separate sql table
- ProductPage Overview split
- related products carousel
- code splitting
- investigate multiple rerenders
- set default state for modals 
- product filters into zustand
- reset password
- forgot password
- address and email modal
- orders add pay button
- add global loader when clicked on checkout
- add pagination to orders page
- revise tests
- update mocks so that tested are only necessary components
- investigate using of snapshot testing
- wishilist icon on ipad and mobile
- next router mock - https://github.com/vercel/next.js/discussions/42527#discussioncomment-7205143
- adjust test to use mock values
- rework fetching to not use callbacks
- product image preview not working
- add notification when user logs in and logs out

## Account Pages:
- https://thesusoutdoors.com/account/addresses - Pass123
- 