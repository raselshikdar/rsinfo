<script lang="ts">
	import SubscribeCard from '$lib/components/molecules/SubscribeCard.svelte';
	import EmailIcon from '$lib/icons/socials/email.svelte';
	import Button from '../atoms/Button.svelte';
	import Sparkles from '../atoms/Sparkles.svelte';
</script>

<div class="subscribe-newsletter-card">
	<Sparkles>
		<SubscribeCard>
			<div class="card-content">
				<h2>Newsletter!</h2>
				<strong>Will never send you any form of spam messages.</strong>
			</div>

			<form
				action="https://buttondown.com/api/emails/embed-subscribe/rsblog.us.kg"
				method="post"
				target="popupwindow"
			>
				<div class="field-group">
					<label for="email">Your email</label>
					<input type="email" name="email" required />
					<input type="hidden" name="tag" value="website" />
				</div>
				<Button type="submit">
					<EmailIcon slot="icon" />
					Subscribe
				</Button>
			</form>
		</SubscribeCard>
	</Sparkles>
</div>

<style lang="scss">
	.subscribe-newsletter-card {
		> :global(*) {
			width: 100%;
		}
	}

	.card-content {
		h2 {
			text-align: center;
			margin-top: -10px;
		}
		p {
			margin: 0.75rem 0;
			line-height: 1.6em;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;

		max-width: 320px;
		margin: 40px auto 0;

		.field-group {
			display: flex;
			flex-direction: column;
			gap: 5px;
		}

		input {
			background-color: var(--color--blockquote-background);
			border-radius: 5px;
			padding: 10px 20px;
			width: 320px;
			font-size: 1rem;
			-webkit-tap-highlight-color: transparent;
			touch-action: manipulation;
			background-origin: border-box;
			background-repeat: no-repeat;
			border: 1px solid #c3c3c3;
			accent-color: var(--color--primary);
		}
	}
</style>
