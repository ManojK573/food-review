import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(
			"mongodb://0.0.0.0:27017",
			{
				useUnifiedTopology: true,
				//useNewUrlParser: true,
				//useCreateIndex: true,
			}
		);
		console.log('Connected to database');
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
};

export default connectDB;
