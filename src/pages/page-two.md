---
title: Subscribe
---

<p>
Want to be informed when I post new articles? simply enter your
email address below. maybe you'll not get any email i'm doing this only for test, you can 
unsubscribe any time. 
</p>

<form data-members-form="subscribe" class="subscribe-form">

<div id="app" class="form-group">
	<label for="subscribe-email" class="screen-reader-text">Your email address</label>
	<input v-model="email" type="email" class="subscribe-email" placeholder="Your email address"> 
	<button @click="doSubscribe" :disabled="working" class="button" type="submit">Subscribe</button>
	<p style="font-weight: bold">
	{% raw %}
{{ status }}
	{% endraw %}
</p>
</div>
</form>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script defer type="text/javascript" src="/assets/subscribe.js"></script>