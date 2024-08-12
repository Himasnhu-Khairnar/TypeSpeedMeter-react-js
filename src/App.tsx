import TypingEffect from "./components/TypeWriting";
import Timer from "./components/Timer";

const App = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col text-indigo-600">
      <div className="w-full h-auto mt-10 flex flex-col" > 
      
        <Timer/>
    
        <TypingEffect />
      </div>
    </div>
  );
};

export default App;
