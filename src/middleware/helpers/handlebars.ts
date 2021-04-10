/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-07 01:48:58
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-09 00:59:01
 * @Description: Helpers for handlebars
 */

const helpers = {
	ifEqual: function (v1: string, v2: string, options: any) {
		if (v1 === v2) {
			return options.fn(this);
		}
		return options.inverse(this);
	},
	// ifOwner: function(v1: string, options: any){
	// 	if(v)
	// }
};

export { helpers };
