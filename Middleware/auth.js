const jwt = require("jsonwebtoken");

//Token to check the user authentication
function authenticateToken(req, res, next) {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Ensure the token starts with "Bearer"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    // Verify the token
    jwt.verify(token, "secretKey", (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      // Attach user info to request object
      req.user = user;
      next();
    });
  } catch (err) {
    console.error("Error in authenticateToken middleware:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = authenticateToken;
