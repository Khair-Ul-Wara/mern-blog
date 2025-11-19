import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // "Bearer <token>"

  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

    // Attach decoded payload to req.user
    req.user = decoded; // { id, username }

    next();
  } catch (error) {
    console.error("❌ Token verification error:", error);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};
