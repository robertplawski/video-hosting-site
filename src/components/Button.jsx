export function SwitchButton (props){
  const {onClick, statement, enabledIcon, disabledIcon, className} = props;

  return  <button className = {`${className} appearance-none focus:outline outline-2 rounded-xl p-1 flex justify-center items-center` } onClick={onClick}>
            {
              statement ? enabledIcon
              : disabledIcon
            }
          </button>
}


