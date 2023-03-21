import React , { useEffect, useState } from 'react';
import CountUp from "react-countup";
import VisibilitySensor from 'react-visibility-sensor';

function Counter(props)
{
    const [focus, setFocus] = React.useState(false);
    return(
        <div className="Counter">
            <CountUp start={focus ? 0 : null} end={props.end} duration={5} redraw={true}>
            { ({ countUpRef }) => (
              <div>
                <VisibilitySensor onChange={isVisible => {
                  if (isVisible){
                      setFocus(true);
                    } 
                  }}
                >
                <span ref={countUpRef} />
                </VisibilitySensor>
              </div>
            )}
          </CountUp>
        </div>
    );
}

export default Counter;