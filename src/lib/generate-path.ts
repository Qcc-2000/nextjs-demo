import fs from "fs";
import path from "path";
/**
 * Generate all pacakge path for the given route
 */
const PAGE_FILE = "page.tsx";
const LAYOUT_FILE = "layout.tsx";
export function generatePath(realPath: string, relativePath: string): string[] {
  let res: string[] = [];
  if (!fs.statSync(realPath).isDirectory()) return res;

  if (!containPageFile(realPath)) return res;
  console.log(realPath, relativePath);
  res.push(relativePath);
  const entries = fs.readdirSync(realPath);
  entries.forEach((entry) => {
    if (containSubpackage(realPath)) {
      for (const subpackage of generatePath(
        path.join(realPath, entry),
        path.join(relativePath, entry)
      )) {
        res.push(subpackage);
      }
    }
  });

  return res;
}

const containSubpackage = (base: string): boolean => {
  if (!fs.statSync(base).isDirectory()) return false;
  const entries = fs.readdirSync(base);
  return entries.some((entry) => {
    // const entryPath = path.join(base, entry);
    // if (containPageFile(entryPath)) {
    //   return true;
    // }
    const entryPath = path.join(base, entry);
    return fs.statSync(entryPath).isDirectory();
  });
};
const containPageFile = (base: string): boolean => {
  if (!fs.statSync(base).isDirectory()) return false;
  const entries = fs.readdirSync(base);
  return entries.some((entry) => {
    return entry === PAGE_FILE || entry === LAYOUT_FILE;
  });
};
