import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

// ✅ ADD THIS
import orderRoutes from "./routes/orderRoutes.js";

const startServer = async () => {
  await connectDB();

  // ✅ ADD THIS
  app.use("/api/orders", orderRoutes);

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer();