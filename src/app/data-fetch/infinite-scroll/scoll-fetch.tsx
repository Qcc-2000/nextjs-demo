"use client";
import useScrollToBottom from "@/lib/use-scroll";
import { Spinner } from "@nextui-org/react";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

const DEMO_URL = "https://jsonplaceholder.typicode.com/albums";
const LIMIT = 20;
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

export default function ScrollFetch() {
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
  useScrollToBottom(() => {
    if (!isReachingEnd) {
      setSize(size + 1);
    }
  });
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4">
        {data?.map((page, index) =>
          page.map((album) => <Item key={album.id} {...album} />)
        )}
      </div>
      {isReachingEnd ? (
        <DashedDivider text="End" />
      ) : (
        isLoadingMore && (
          <CenterSpinner/>
        )
      )}
    </div>
  );
}

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
 return  <div className="flex items-center justify-center">
  <Spinner />
</div>
}
