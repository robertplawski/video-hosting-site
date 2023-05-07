export function Tooltip(props){
  const {onClick, statement, enabledIcon, disabledIcon, className, children, caption} = props;
  // JOIN THESE TWO DIV'S INTO ONE
  return  <div className="flex justify-center align-center relative">
            <div className="peer">
              {children}
            </div>
            <div className="peer-hover:opacity-100 opacity-0 transition duration-100 bg-blue-500 flex justify-center items-center text-xs absolute pointer-events-none z-50">
                <div className="absolute w-4 h-4 rotate-45 absolute top-[-1.25rem] bg-inherit"/>
                <div  className = {`${className} absolute transition duration-100 absolute top-[-2.5rem] bg-inherit p-2 rounded-2xl whitespace-nowrap`} >
                  {caption}
                </div>
            </div>

          </div>
}
