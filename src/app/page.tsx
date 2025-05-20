import Button from "@/components/global/Buttons/Button";
import Harun from "./components/Harun";


export default function Home() {
  return (
    <>
    <div className="my-20 flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
       <Button text={"Download Resume"}></Button>
    </div>
    <Harun></Harun>
    </>
  );
}
