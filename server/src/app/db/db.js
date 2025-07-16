import mongoose from 'mongoose'

const ConnectDB = async()=>{
try {
 await mongoose.connect(`${process.env.DB_URI}`);
       console.log('Connected!');
} catch (error) {
  console.error('Connection failed')
  process.exit(0);
}
}

export default ConnectDB;