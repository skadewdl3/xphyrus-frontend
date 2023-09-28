<script setup lang="ts">
</script>

<template>
  <nav class="w-full px-4 2xl:px-60 xl:px-40 lg:px-28 md:px-20 sm:px-10 flex items-center justify-between py-4 font-display">
    <NuxtLink to="/">
      <div class="navbar-logo cursor-pointer">
        <h1 class="text-3xl">.xphyrus</h1>
      </div>
    </NuxtLink>

    <div class="navbar-links items-center justify-end hidden md:flex">
      <NuxtLink to="/create" class="mx-4">Create</NuxtLink>
      <NuxtLink to="/assesment" class="mx-4">My Assesment</NuxtLink>
      <NuxtLink to="/joined" class="mx-4 mr-0">Joined</NuxtLink>
    </div>

    <!-- TODO: Make a mobile menu -->
    <div class="navbar-links-menu md:hidden">Menu</div>
  </nav>

  <main class="w-full px-60">
  
    <Head>
      <title>Xyphrus - Microservice based OA platform</title>
    </Head>
  
    <slot />
  </main>
</template>

<style lang="stylus">

</style>