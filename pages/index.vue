<script lang="ts" setup>
// Import the rocket image
import heroImage from '@assets/images/hero.svg'

// This page should use the layouts/index.vue layout
definePageMeta({
  layout: 'index',
})
</script>

<template>

  <div class="hero text-center font-display">
    <div class="hero-image">
      <!-- Display the hero image -->
      <img :src="heroImage" class="inline-block w-[95%] sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5" alt="Hero Image">
    </div>
    <div class="hero-text mt-12">
      <!-- Display the page title -->
      <h1 class="title lg:text-5xl sm:text-4xl text-3xl">Welcome to <span class="text-primary">.xphyrus</span></h1>
      <!-- Display the page subtitle -->
      <h3 class="subtitle md:text-lg text-md  mt-2">A Microservice based OA platform</h3>
    </div>
    <div class="hero-cta inline-flex items-center justify-center mt-8">
      <!-- Display the login button -->
      <Button text="Login" class="mr-2" animate />
      <!-- Display the register button -->
      <Button text="Register" animate />
    </div>
  </div>
</template>