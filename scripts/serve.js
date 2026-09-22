import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

// Serve only public application assets; never expose repository or local files.
const assets = new Map([
  ["/", ["../index.html", "text/html"]],
  ["/index.html", ["../index.html", "text/html"]],
  ["/src/styles.css", ["../src/styles.css", "text/css"]],
  ["/src/app.js", ["../src/app.js", "text/javascript"]],
  ["/src/calculator.js", ["../src/calculator.js", "text/javascript"]],
]);

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  const asset = assets.get(request.url.split("?")[0]);
  if (!asset) {
    response.writeHead(404);
    response.end();
    return;
  }

  try {
    const body = await readFile(new URL(asset[0], import.meta.url));
    response.writeHead(200, {
      "Content-Type": `${asset[1]}; charset=utf-8`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(500);
    response.end("Unable to load this application asset.");
  }
});

server.on("error", (error) => {
  console.error(`Unable to start local preview: ${error.message}`);
  process.exitCode = 1;
});
server.listen(4173, "127.0.0.1", () => {
  console.log("CyMas preview: http://127.0.0.1:4173 (Ctrl+C to stop)");
});
