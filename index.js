import http from "node:http";
import url from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import { getMimeType, doesFileExists } from "./lib/utils.js";

const server = http.createServer(async (req, res) => {
  const method = req.method;
  const parsedUrl = url.parse(req.url, true);

  console.log(parsedUrl.pathname);

  if (method === "GET") {
    if (parsedUrl.pathname === "/") {
      res.writeHead(302, { Location: "/index.html" });
      res.end();
      return;
    } else {
      const fileAbsPath = path.resolve("public", parsedUrl.pathname.slice(1));
      const isFileExists = await doesFileExists(fileAbsPath);
      if (isFileExists) {
        const fileContent = await fs.readFile(fileAbsPath);

        res.writeHead(200, {
          "Content-Type": getMimeType(path.extname(parsedUrl.pathname.slice(1))),
          "Content-Length": Buffer.byteLength(fileContent),
        });
        res.write(fileContent);
        res.end();
        return;
      }
    }
  }

  const body = "Not Found!";

  res.writeHead(404, {
    "Content-Type": "text/plain",
    "Content-Length": Buffer.byteLength(body),
  });
  res.write(body);
  res.end();
});

server.listen(3000, () => {
  console.log("Server runs on port 3000");
});
