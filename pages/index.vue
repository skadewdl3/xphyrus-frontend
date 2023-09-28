<script lang="ts" setup>
const { count, setCount } = toRefs(useTestStore());

</script>

<template>

  <Head>
    <title>Xyphrus</title>
  </Head>
  <h1 class="text-4xl">Home Page</h1>
  <p class="text-8xl">{{ count }}</p>
  <button class="bg-blue-400 px-4 py-2 rounded active:translate-y-1 transition-all" @click="setCount(count + 1)">Increment</button>
  <Editor />
</template>

<style lang="stylus">
</style>