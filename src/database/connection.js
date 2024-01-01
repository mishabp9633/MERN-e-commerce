import  mongoose  from 'mongoose';
mongoose.set('strictQuery', false);

const connection_string = process.env.MONGO_CONNECTION_STRING

  export async function initialize(){
    try{
         await mongoose.connect(connection_string)
            
            console.log('mongod connected');
        }catch(err){
          console.log('mongoDB connection error:', err)
           throw err    
    }
}

  