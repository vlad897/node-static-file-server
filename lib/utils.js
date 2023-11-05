import fs from "node:fs/promises";
import path from "node:path";

export const getMimeType = (fileExtName) => {
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".jpg": "image/jpeg",
  };

  return mimeTypes[fileExtName] || "text/plain";
};

export const doesFileExists = async (fileName) => {
  try {
    const stat = await fs.stat(fileName);

    return stat.isFile();
  } catch (err) {
    return false;
  }
};
