import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

export const connectMongo = async () => {
	mongoose.set('strictQuery', false)
	mongoose
		.connect(process.env.NEXT_PUBLIC_DATABASE_URL as string, {
			dbName: 'store',
		})
		.then(() => console.log('Connect to DB'))
}
