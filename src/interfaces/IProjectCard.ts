/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-04 13:47:30
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-07 23:49:55
 * @Description: Definition for the Project Card interface
 */

interface IProjectCard {
	projectId: string;
	projectName: string;
	permission: any;
}

export { IProjectCard };
