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
		cron: '0 0 0 * * *',
		type: 'all',
	},
	async task(ctx) {
		console.log("定时统计任务启动")
		await ctx.service.homeService.clearTodayVisit()
	}
}