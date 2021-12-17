const SUBSCRIBE_API = '/.netlify/functions/mailchimp-check?email=';
Vue.config.productionTip = false
Vue.config.devtools = false
const app = new Vue({
	el:'#app',
	data: {
		email:'',
    	working:false,
		status:''
	},
	methods: {
		async doSubscribe() {
			if(this.email === '') return;
			this.working = true;
			console.log('do add for'+this.email);
			this.status = 'Attemping to subscribe you...';
			
			fetch(SUBSCRIBE_API + this.email)
			.then(res => {
				return res.json()
			})
			.then(res => {
				console.log('status',res.status);
				if(res.status === 'subscribed') {
					this.status = 'You have been subscribed!';
				} else if(res.status === 400) {
					this.status = `There was an error: ${res.detail}`;
				}
				this.working = false;
			})
			.catch(e => {
				console.log('error result', e);
			});
		}
	}
})