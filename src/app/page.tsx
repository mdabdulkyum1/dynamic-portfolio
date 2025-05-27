import MyBanner from "./components/MyBanner/MyBanner";
import Projects from "./components/Projects/Projects";


export default function Home() {
  return (
    <>
    <div className="">
        {/* Banner */}
        <MyBanner />
        <Projects></Projects>
    </div>
    </>
  );
}
