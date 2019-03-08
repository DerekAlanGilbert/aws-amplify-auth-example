
search
WRITE A POST 
How to Build Production-ready Vue Authentication
 dabit3 profile image Nader Dabit   Mar 4 Updated on Mar 05, 2019  ・11 min read
#vue #vuerouter #authentication
Production-ready Vue Authentication with AWS

To view the final code for this project at any time, click here.

In this tutorial, you'll learn how to build a real authentication flow into your Vue application using Vue Router, AWS Amplify, & Amazon Cognito. While the identity provider we'll be using is AWS with Amazon Cognito, the fundamental design of our application will be provider agnostic meaning you should be able to follow along using the provider of your choice.

Nader Dabit@dabit3
My first "big" post on Dev.to How to Build Production-ready Vue Authentication with Vue Router & AWS Amplify

The post covers most common scenarios
- Protected routes
- Redirects on auth events
- User persistence
- Custom auth flow
- MFA

dev.to/dabit3/how-to-…
12:36 PM - 04 Mar 2019
Twitter reply actionTwitter retweet action13Twitter like action27
Authentication overview
If you've ever tried rolling your own authentication service & implementation (both on the front & back end), you're already aware of the pain that comes along with it.

Thankfully today we have many amazing identity services & providers that handle all of this for us. You may already be familiar with services like Auth0, Okta, & Amazon Cognito that do the hard work behind the scenes so you don't have to by implementing the user & identity management that is a necessary requirement for most modern applications.

In this tutorial you'll learn how you can manage everything from user sign up, user sign in, forgot password, & MFA. You'll also learn how to implement protected client side routing with Vue Router so you can define which routes can be public & which routes need to be protected for only logged-in users.

By the end of this tutorial you'll have a good grasp on building & deploying Vue applications with enterprise-level security & authentication enabled.

Getting Started
Creating the Vue project
The first thing we'll do is scaffold a new Vue application using the Vue CLI. If you do not already have the Vue CLI installed, click here to follow the installation instructions.

vue create vue-auth

cd vue-auth
Once the project has been created & you are inside of the directory, let's install the necessary dependencies we'll need using either npm or yarn:

yarn add vue-router aws-amplify-vue aws-amplify
What is aws-amplify-vue? AWS Amplify has platform specific components that allow us to quickly scaffold & get up and running with important functionality like authentication flows, image uploads, & more.

Creating the folder structure
Let's now create the files that we'll be using to implement the authentication flow. Inside the src directory, create the following files:

touch src/router.js
touch src/components/Auth.vue
touch src/components/Home.vue
touch src/components/Profile.vue
touch src/components/Protected.vue
Working with Amplify
Installing the Amplify CLI
To add the authentication service we'll be using the AWS Amplify CLI. Let's go ahead and install that now:

npm install -g @aws-amplify/cli
Next, we'll need to configure the CLI. To do so, run the following command:

amplify configure
For a full walkthrough of how to configure the CLI, check out this video.

Now that we have our project created & the CLI installed we can create the authentication service we'll be using. To do so, we'll initialize a new Amplify project & then add authentication to it.

Initializing the Amplify project
To initialize a new Amplify project, run the init command:

amplify init
The init will initialize the project & walk you through some steps to configure your project name, environment, & other build settings. Choose a project & environment name, & then choose the default for the rest of the questions.

Adding the authentication service
Now that the Amplify project has been initialized, we can add the authentication service:

amplify add auth

# choose Yes when asked if we would like to use the default security configuration

amplify push
The default security configuration will give us smart defaults for this project. If you would like a custom configuration you can choose No, or you can later run amplify configure auth.

After amplify push finished running successfully, the authentication has been successfully created & we can now start writing our code!

You should notice you now have a file called aws-exports.js (holds base project configuration) in your src directory & a folder called amplify (hold detailed project configuration & custom code) in your root directory.

Writing the code
We'll be implementing authentication in two ways:

Part 1 - Using the preconfigured amplify-authenticator component from AWS Amplify Vue to quickly get our auth flow up & running.
Part 2 - Building out an entirely custom authentication flow.
Part 1 - Using the preconfigured amplify-authenticator component
Next we'll need to update main.js to configure the Vue project to work with Amplify & our new aws-exports.js file. We'll also need to let our application know about the router that we will be creating in the next step.

src/main.js
// src/main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

import App from './App'
import router from './router'
import config from './aws-exports'

Amplify.configure(config)
Vue.use(VueRouter)
Vue.use(AmplifyPlugin, AmplifyModules)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

Next, we'll configure our router. This is where we will also place the custom logic for the protected routes.

src/router.js
// src/router.js
import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from './components/Home'
import Profile from './components/Profile'
import Auth from './components/Auth'
import Protected from './components/Protected'

const routes = [
  { path: '/', component: Home },
  { path: '/auth', component: Auth },
  { path: '/protected', component: Protected, meta: { requiresAuth: true} },
  { path: '/profile', component: Profile, meta: { requiresAuth: true} }
]

const router = new VueRouter({
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(data => {
      if (data && data.signInUserSession) {
        user = data;
      }
      next()
    }).catch((e) => {
      next({
        path: '/auth'
      });
    });
  }
  next()
})

export default router
Details of src/router.js
<template>
  <div class="auth">
    <amplify-authenticator></amplify-authenticator>
  </div>
</template>

<script>

export default {
  name: 'auth'
}
</script>

<style>
.auth {
  margin: 0 auto;
  width: 460px;
}
</style>