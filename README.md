# TODO-API
Todo api that make with express js, to run this app, first you must install all dependencies:
```
npm install
```

Then, run your server with command:
```
npm run dev
```

## Setup Environment Variables
Copy the `config/.env.example` file to `.env` and fill in the required values:
```bash
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_CLUSTER=your_cluster_url
DB_NAME=your_database_name
DB_APP_NAME=your_application_name
```

Or you can replace connection string in `db.js` with tour connection string mongoDB
```javascript
const conn = await mongoose.connect(
      // replace with your connection string mongoDB
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`
    );
```
