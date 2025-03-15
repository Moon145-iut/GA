const express = require('express')//import korechi
const app = express()//now calling the express functions
const port = 3000

// Middleware to parse JSON requests
app.use(express.json());

// Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware to verify Firebase ID token
const authenticate = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

//mongo
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017/IDK?directConnection=true";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Define a new endpoint to store video metadata
    app.post('/uploadVideo', authenticate, async (req, res) => {
      const { id, title, videoUrl, thumbnailUrl, uploadedAt, category } = req.body;
      const videoMetadata = { id, title, videoUrl, thumbnailUrl, uploadedAt, category };

      try {
        const collection = client.db("videoDB").collection("videos");
        await collection.insertOne(videoMetadata);
        res.status(200).send("Video metadata stored successfully.");
      } catch (error) {
        console.error("Error storing video metadata:", error);
        res.status(500).send("An error occurred while storing video metadata.");
      }
    });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); // Commented out to keep the connection open for API requests
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {//get info from anywhere
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})