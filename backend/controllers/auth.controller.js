const admin = require("firebase-admin");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.registerUser = async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ error: "No token provided" });
  }
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    let user = await prisma.user.findUnique({
      where: { firebaseUid: uid },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: uid, // Use Firebase UID as primary key (if your schema is changed accordingly)
          firebaseUid: uid,
          email: email || "unknown@example.com",
          name: name || "New User",
          password: "", // Since Firebase handles authentication
        },
      });
      console.log("User created in PostgreSQL:", user);
    } else {
      console.log("User already exists:", user);
    }

    return res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
