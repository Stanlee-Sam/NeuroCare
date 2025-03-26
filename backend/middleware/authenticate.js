const admin = require('firebase-admin');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Safe Firebase Initialization
if (admin.apps.length === 0) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(require('../config/neurocare-29244-firebase-adminsdk-fbsvc-3f9373a6a1.json')),
    });
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

const verifyIdToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Unauthorized');
  }
};

const authenticate = async (req, res, next) => {
  console.log("Middleware triggered for:", req.path);
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  console.log("Received Token:", idToken);

  try {
    // Verifying and decoding the token
    const decodedToken = await verifyIdToken(idToken);
    console.log("Decoded token:", decodedToken);
    
    // Checking expiration time (in seconds, but we compare it to the current time in milliseconds)
    const isExpired = decodedToken.exp * 1000 < Date.now();
    if (isExpired) {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    }

    const { uid, email, name, } = decodedToken;
    console.log("Token details:", { uid, email, name });


    
    
    console.log("Checking user in the database by firebaseUid...");
    let user = await prisma.user.findUnique({
      where: { firebaseUid: uid },
    });

    if (!user) {
      console.log("User not found by firebaseUid. Checking by email...");
      // Check by email if the user is not found
      user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && !user.firebaseUid) {
        console.log("User found by email but without firebaseUid. Updating...");
        user = await prisma.user.update({
          where: { email },
          data: { firebaseUid: uid },
        });
      }
    }

    // If no user is found by either email or firebaseUid, create a new user
    if (!user) {
      console.log("Creating new user...");
      user = await prisma.user.create({
        data: {
          firebaseUid: uid,
          email: email || null,
          name: name || (email ? email.split('@')[0] : "New User"),
          password: "" // Empty password as it's a Firebase-based user
        },
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};


// Graceful Prisma disconnection
process.on('SIGINT', async () => {
  console.log("Closing Prisma connection...");
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = authenticate;
