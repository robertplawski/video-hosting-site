export function SwitchButton (props){
  const {onClick, statement, enabledIcon, disabledIcon, className} = props;

  return  <div className = {className} onClick={onClick}>
            {
              statement ? enabledIcon
              : disabledIcon
            }
          </div>
}


