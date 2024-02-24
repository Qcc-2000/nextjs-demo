"use client";

import { useState } from "react";
import { Switch } from "@nextui-org/switch";
import ScrollFetch from "./scoll-fetch";
import ButtonFetch from "./button-fetch";
export default function XFetch() {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div>
      <div className="my-2 flex justify-end">
        <Switch isSelected={isSelected} onValueChange={setIsSelected}>
          Scroll-Infinite-Fetch
        </Switch>
      </div>
      <div>{isSelected ? <ScrollFetch /> : <ButtonFetch />}</div>
    </div>
  );
}
