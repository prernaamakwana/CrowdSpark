module.exports = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Authentication required." });
    }

    console.log("👤 User Role:", req.user.role); // Debug log

    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }

    console.log("✅ Admin verified:", req.user.email);
    next();
  } catch (error) {
    console.error("❌ Admin verification error:", error);
    res.status(500).json({ msg: "Admin check failed due to server error." });
  }
};