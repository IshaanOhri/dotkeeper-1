/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-28 03:26:57
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-28 03:53:52
 * @Description: Interface for browser details
 */

export interface IBrowserDetails {
	browser: string | undefined;
	version: string | undefined;
	os: string | undefined;
	platform: string | undefined;
	source: string | undefined;
}
