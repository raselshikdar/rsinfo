<script lang="ts">
  import Giscus from '@giscus/svelte';
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';

  let currentTheme;
  
  // Subscribe to the theme store
  theme.subscribe(value => {
    currentTheme = value === 'dark' ? 'dark' : value === 'auto' ? 'preferred_color_scheme' : 'light';
  });
</script>

<div id="comments">
  <Giscus
    id="comments"
    repo="raselshikdar/blog.rasel.us.kg"
    repoId="R_kgDOMvaoPA"
    category="General"
    categoryId="DIC_kwDOMvaoPM4CiV6f"
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
