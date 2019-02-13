/*
cron
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)

*/

module.exports = {
	schedule: {
		cron: '0 0 */1 * * *',
		// interval: '10s',
		type: 'all',
	},
	async task(ctx) {
		await ctx.service.homeService.syncDataToDB()
	}
}