/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:21:23
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-03 14:51:02
 * @Description: File for exporting all environment variables
 */

export const NODE_ENV: string = String(process.env.NODE_ENV);
export const PORT: number = Number(process.env.PORT);
export const HOST: string = String(process.env.HOST);
export const MONGO_URI: string = String(process.env.MONGO_URI);
export const GOOGLE_CLIENT_ID: string = String(process.env.GOOGLE_CLIENT_ID);
export const GOOGLE_CLIENT_SECRET: string = String(process.env.GOOGLE_CLIENT_SECRET);
export const GOOGLE_CALLBACK: string = String(process.env.GOOGLE_CALLBACK);
