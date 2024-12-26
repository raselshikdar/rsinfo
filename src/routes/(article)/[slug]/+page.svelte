<script lang="ts">
	import Tag from '$lib/components/atoms/Tag.svelte';
	import Markdown from '$lib/components/molecules/Markdown.svelte';
	import type BlogPost from '$lib/data/blog-posts/model';
	import dateformat from 'dateformat';

	export let data: { post: BlogPost };
	$: ({ post } = data);
</script>

{#key post}
	<div id="article-page">
		<div class="header">
			{#if post}
				<h1 style={`view-transition-name: title-${post.slug}`}>{post.title}</h1>
				<div class="meta">
					<div class="author-card">
						<div class="author-info">
							<img
								class="author-photo"
								src="https://1.gravatar.com/avatar/55420fb619c1de81ce4a02676320d39306b6a592663750877dd55047f45d9067?size=512"
								alt="Rasel Shikdar"
							/>
							<div class="author-details">
								<p class="note">
									<a href="/resume" class="author-name">
										<b>Rasel Shikdar</b>
										<svg 
											xmlns="http://www.w3.org/2000/svg" 
											viewBox="0 0 24 24" 
											fill="#1da1f2" 
											width="16" 
											height="16" 
											class="verification-badge"
										>
											<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1.1 14.7-3.6-3.6 1.4-1.4 2.2 2.2 5.2-5.2 1.4 1.4z" />
										</svg>
									</a>
								</p>
								<p class="administrator-note">(Administrator)</p>
								<p class="note">
									<i>
										{dateformat(post.date, 'UTC:dddd, dd mmm yyyy, h:MM TT')} - 
										<span class="reading-time">{post.readingTime}</span>
									</i>
								</p>
								{#if post.updated}
									<p class="note"><i>Updated {dateformat(post.updated, 'UTC:dddd, dd mmm yyyy, h:MM TT')}</i></p>
								{/if}
							</div>
						</div>
					</div>
				</div>
				{#if post.categories?.length || post.tags?.length}
					<div class="tags">
						{#if post.categories?.length}
							{#each post.categories as category}
								<Tag>{category}</Tag>
							{/each}
						{/if}
						{#if post.tags?.length}
							{#each post.tags as tag}
								<Tag>{tag}</Tag>
							{/each}
						{/if}
					</div>
				{/if}
			{/if}
		</div>
		<div class="article-content">
			{#if post}
				{#if post?.content}
					<Markdown content={post.content} />
				{/if}
			{/if}
		</div>
	</div>
{/key}

<style lang="scss">
	#article-page {
		--main-column-width: 60ch;
		padding-block: 60px;

		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;

		width: min(var(--main-column-width), 100%);
		margin: 0 auto;

		h1 {
			text-align: center;
		}

		.meta {
			display: flex;
			justify-content: center;
			width: 100%;
			padding: 15px 0;
		}

		.author-card {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: #f9f9f9;
			border-radius: 10px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
			padding: 20px;
			width: 100%;
			max-width: 500px;
			margin: 0 auto;

			@media (prefers-color-scheme: dark) {
				background: #333;
				color: white;
				box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
			}
		}

		.author-info {
			display: flex;
			align-items: center;
			gap: 20px;
			width: 100%;
		}

		.author-photo {
			width: 80px;
			height: 80px;
			border-radius: 50%;
			object-fit: cover;
			border: 2px solid #e0e0e0;

			@media (prefers-color-scheme: dark) {
				border-color: #444;
			}
		}

		.author-details {
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: left;
		}

		.administrator-note {
			font-size: 0.85em;
			color: rgba(var(--color--text-rgb), 0.6);
			margin: 5px 0;

			@media (prefers-color-scheme: dark) {
				color: rgba(255, 255, 255, 0.6);
			}
		}

		.note {
			font-size: 80%;
			color: rgba(var(--color--text-rgb), 0.8);
			margin: 0;

			@media (prefers-color-scheme: dark) {
				color: rgba(255, 255, 255, 0.8);
			}
		}

		.reading-time {
			color: red;

			@media (prefers-color-scheme: dark) {
				color: orange;
			}
		}

		.author-name {
			display: inline-flex;
			align-items: center;
			gap: 4px;

			.verification-badge {
				display: inline-block;
				vertical-align: middle;
			}
		}
	}

	.article-content {
		display: grid;
		grid-template-columns:
			1fr
			min(var(--main-column-width), 100%)
			1fr;

		:global(> *) {
			grid-column: 2;
		}

		:global(> .full-bleed),
		:global(> p:has(> .full-bleed)) {
			grid-column: 1 / 4;
			max-width: 2200px;
			max-height: 600px;
			margin-left: auto;
			margin-right: auto;

			width: calc(100% + (var(--inline-padding) * 2));
			translate: calc(var(--inline-padding) * -1);

			:global(> figure.full-bleed img) {
				margin-top: 0;
				border-radius: 0;
				box-shadow: none;
				max-height: 100%;
				object-fit: cover;
				width: 100%;

				@keyframes parallax-effect {
					0% {
						object-position: top;
					}
					25% {
						object-position: center;
					}
					50% {
						object-position: bottom;
					}
				}
			}
		}
	}

	.tags {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		flex-wrap: wrap;
	}
</style>
