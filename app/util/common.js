'use strict'
// 
// helper function
// 

// 生成随机位数的数字
function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

module.exports = {
	rand
}