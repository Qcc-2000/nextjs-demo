import { generatePath } from "@/lib/generate-path";
import Link from "next/link";

export default function Home() {
  const pathList = generatePath("src/app", "/");
  console.log(pathList);
  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold py-4">Demos</h1>
        {pathList.map((path, index) => (
          <div key={index} className="py-2 hover:font-bold">
            <Link href={path} key={path}>
              {path}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
