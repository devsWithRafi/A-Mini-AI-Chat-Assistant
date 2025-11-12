import '../index.css';

const OnlineIndicator = () => {
  return (
    <span
      className="relative flex items-center justify-center z-1 bg-[#85ff85] w-[11px] h-[11px] rounded-full
        before:content-[''] before:absolute before:w-[18px] before:h-[18px] before:bg-[#85ff8580] 
         before:translate-x-[-50%] before:translate-y-[-50%] before:top-[50%] before:left-[50%]
        before:rounded-full before:z-[-1] before:animate-[blinkOnlineIndicator_1.5s_linear_infinite] max-sm:w-[9px] 
        max-sm:h-[9px] max-sm:before:w-[14px] max-sm:before:h-[14px] -mt-[2px]"
    ></span>
  );
};

export default OnlineIndicator;
