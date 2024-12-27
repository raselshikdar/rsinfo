<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';
	import Image from '$lib/components/atoms/Image.svelte';
	import Footer from '$lib/components/organisms/Footer.svelte';
	import Header from '$lib/components/organisms/Header.svelte';
	import RelatedPosts from '$lib/components/organisms/RelatedPosts.svelte';
	import TableOfContents from '$lib/components/organisms/TableOfContents.svelte';
	import dateformat from 'dateformat';

	import SubscribeNewsletterCard from '$lib/components/molecules/SubscribeNewsletterCard.svelte';
	import type BlogPost from '$lib/data/blog-posts/model';
	import { keywords, image as metaImage, siteBaseUrl, title } from '$lib/data/meta';
	import Giscus from '@giscus/svelte'; // Import Giscus

	export let data: { post: BlogPost };
	$: ({ post } = data);

	$: showCardLayout = Boolean(post?.showImage && post?.coverImage?.src);

	let metaKeywords = keywords;
	let genericSocialImageUrl: string | undefined;

	$: {
		if (post?.categories?.length) {
			metaKeywords = post.categories.concat(metaKeywords);
		}
		if (post?.tags?.length) {
			metaKeywords = post.tags.concat(metaKeywords);
		}
		if (post?.keywords?.length) {
			metaKeywords = post.keywords.concat(metaKeywords);
		}

		if (post) {
			genericSocialImageUrl = `${siteBaseUrl}/opengraph?text=${encodeURIComponent(post.title)}`;
			if (post.date) {
				genericSocialImageUrl += `&date=${encodeURIComponent(
					dateformat(post.date, 'mmm dd, yyyy')
				)}`;
			}
		}
	}
</script>

<svelte:head>
	{#if post}
		<meta name="keywords" content={metaKeywords.join(', ')} />

		<meta name="description" content={post.excerpt} />
		<meta property="og:description" content={post.excerpt} />
		<link rel="canonical" href="{siteBaseUrl}/{post.slug}" />

		<title>{post.title} - {title}</title>
		<meta property="og:title" content="{post.title} - {title}" />

		{#if post.socialImage?.src}
			<meta property="og:image" content="{siteBaseUrl}{post.socialImage.src}" />
		{:else if post.coverImage?.src}
			<meta property="og:image" content="{siteBaseUrl}{post.coverImage.src}" />
		{:else if genericSocialImageUrl}
			<meta property="og:image" content={genericSocialImageUrl} />
		{:else}
			<meta property="og:image" content={metaImage} />
		{/if}
	{/if}
</svelte:head>

{#if post}
	<div class="article-layout" class:has-cover={showCardLayout}>
		{#if showCardLayout && post.coverImage}
			<div class="cover-image-wrapper">
				<Image
					additionalClass="cover-image"
					src={`${post.coverImage.src}`}
					alt={post.coverImage.alt}
					lazy={false}
				/>
				<div class="cover-image-overlay" />
			</div>
		{/if}

		<Header />

		<main class="article-main" class:has-cover={showCardLayout}>
			<div class="article-content-wrapper" class:card-layout={showCardLayout}>
				{#if showCardLayout}
					<Card additionalClass="article-card">
						<slot slot="content" />
					</Card>
				{:else}
					<div style="overflow: hidden;"><slot /></div>
				{/if}

				{#if post.showToc}
					<TableOfContents />
				{/if}
			</div>

			<!-- Giscus Comment Section -->
			<div class="container giscus-container">
				<Giscus
					id="giscus-comments"
					repo="raselshikdar/ rsinf"
					repo-id="R_kgDOMEUUZA"
					category="General"
					category-id="DIC_kwDOMEUUZM4ClhwM"
					mapping="pathname"
					strict="0"
					reactions-enabled="1"
					emit-metadata="0"
					input-position="top"
					theme="light"
					lang="en"
					loading="lazy"
				/>
			</div>

			<div class="container subscribe-container">
				<SubscribeNewsletterCard />
			</div>

			{#if post.relatedPosts && post.relatedPosts.length > 0}
				<div class="container">
					<RelatedPosts posts={post.relatedPosts} />
				</div>
			{/if}

			{#if !showCardLayout}
				<div class="background-blurrer" />
				<div class="blob one" />
				<div class="blob two" />
				<div class="blob three" />
			{/if}
		</main>

		<Footer />
	</div>
{/if}

<style lang="scss">
	/* Your existing styles */
	.giscus-container {
		margin: 40px auto;
		max-width: 85ch;
	}
</style>
