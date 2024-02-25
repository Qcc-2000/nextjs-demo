import Card from "./card";
import AnimatePresenceDemo from "./components/animate-presence";
import Basic from "./components/basic";
import Gesture from "./components/gesture";
import SlidesDemo from "./components/slides-demo";

const components = [
  <Basic key={"basic"} />,
  <Gesture key={"gesture: drag demo"} />,
  <AnimatePresenceDemo key={"exit demo"} />,
  <SlidesDemo key={"slides demo"} />,
];
export default function Home() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {components.map((component, index) => (
        <div key={index}>
          <Card content={component} />
        </div>
      ))}
    </div>
  );
}
