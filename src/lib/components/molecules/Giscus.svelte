<script lang="ts">
  import { Giscus } from '@giscus/svelte';

  export let repo: string;
  export let repoId: string;
  export let category: string;
  export let categoryId: string;
  export let mapping: string = 'pathname';
  export let reactionsEnabled: string = "1";
  export let emitMetadata: string = "0";
  export let inputPosition: string = "top";
  export let theme: string = "preferred_color_scheme";
  export let lang: string = "en";
  export let loading: string = "lazy";
</script>

<Giscus
  {repo}
  {repoId}
  {category}
  {categoryId}
  {mapping}
  {reactionsEnabled}
  {emitMetadata}
  {inputPosition}
  {theme}
  {lang}
  {loading}
/>
