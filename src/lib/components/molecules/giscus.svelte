<script lang="ts">
  import Giscus from '@giscus/svelte';
  import { theme } from '$lib/stores/theme';
  import { onDestroy } from 'svelte';

  let currentTheme;

  // Subscribe to the theme store and update the current theme
  const unsubscribe = theme.subscribe(value => {
    currentTheme = value === 'dark' 
      ? 'dark' 
      : value === 'auto' 
      ? 'preferred_color_scheme' 
      : 'light';
  });

  // Cleanup the subscription on component destruction
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div id="comments">
  <Giscus
    id="comments"
    repo="raselshikdar/rsinfo"
    repoId="R_kgDOMEUUZA"
    category="General"
    categoryId="DIC_kwDOMEUUZM4ClhwM"
    mapping="pathname"
    strict="0"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    theme={currentTheme}
    lang="en"
    loading="lazy"
  />
</div>

<style>
  #comments {
    width: 100%;
    margin: 0 auto;
    padding-top: 20px;
  }
</style>
