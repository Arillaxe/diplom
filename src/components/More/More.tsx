import { useState } from 'react';
import { ChevronDownIcon } from 'evergreen-ui';
import './styles.css';

const More = (props: any) => {
  const { options = [] } = props;

  const [active, setActive] = useState(false);

  const onClick = () => {
    setActive(!active);
  };

  const onWrapperClick = () => {
    setActive(false);
  }

  return (
    <>
    <div className="more"> 
      <div className={`more-button${active ? ' active' : ''}`} onClick={onClick}>Меню <ChevronDownIcon color="#16325c" marginLeft="5px" marginBottom="-5px"/></div>
      {active && (
        <div className="more-dropdown">
          {options.map((option: any) => (
            <div className={`more-item${option.isEnabled() ? '' : ' disabled'}`} onClick={() => { if (!option.isEnabled()) return; setActive(false); option.action(); }}>{option.title}</div>
          ))}
        </div>
      )}
    </div>
    {active && <div className="more-wrapper" onClick={onWrapperClick}></div>}
    </>
  );
};

export default More;
