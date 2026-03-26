import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

const emails: string[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/subscribe", (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!emails.includes(email)) {
      emails.push(email);
    }
    console.log("New subscriber:", email);
    console.log("Total subscribers:", emails.length);
    
    // Simulate a slight delay for realism
    setTimeout(() => {
      res.json({ success: true, message: "Subscribed successfully" });
    }, 1000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
