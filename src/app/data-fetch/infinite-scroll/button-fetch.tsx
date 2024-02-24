"use client";
import { Spinner } from "@nextui-org/react";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

const DEMO_URL = "https://jsonplaceholder.typicode.com/albums";
const LIMIT = 10;
const INNITIAL_PAGE_SIZE = 1;

type Album = {
  userId: number;
  id: number;
  title: string;
};
const getKey: SWRInfiniteKeyLoader = (index, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${DEMO_URL}?_page=${index + 1}&_limit=${LIMIT}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ButtonFetch() {
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite<Album[]>(getKey, fetcher, {
      initialSize: INNITIAL_PAGE_SIZE,
    });
  console.log(data);
  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        {data?.map((page, index) =>
          page.map((album) => <Item key={album.id} {...album} />)
        )}
      </div>
      {isLoadingMore && <CenterSpinner />}
      {isReachingEnd ? (
        <DashedDivider text="End" />
      ) : (
        <button
          onClick={() => setSize(size + 1)}
          disabled={isLoadingMore}
          className="rounded-md bg-black text-white text-center p-4 hover:bg-gray-800 w-full mt-4"
        >
          Load more
        </button>
      )}
    </div>
  );
}

function UI() {}
function Item(album: Album) {
  return (
    <div className="p-4 border border-red-400">
      <h2>{album.title}</h2>
    </div>
  );
}
const DashedDivider = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center">
      <div className="flex-grow border-t  border-gray-400"></div>
      <div className="mx-4 text-gray-500">{text}</div>
      <div className="flex-grow border-t  border-gray-400"></div>
    </div>
  );
};
const CenterSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );
};
