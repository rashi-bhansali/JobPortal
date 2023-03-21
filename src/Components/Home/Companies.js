import React from 'react';
import HSBC from '../Images/HSBC.png';
import Google from '../Images/Google1.png';

function Companies(){
    return (
        <div className="companies">
            <div className="Heading pt-5" style={{color:"black"}}>
                <h1>Companies We've Helped</h1>
                <p>Some of the companies we've helped recruit excellent applicants over the years.</p>
            </div>
            <div className="row mx-0">
                <img src={HSBC} className="col-md-3"></img>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm_IhZXAZAKzDwQimjL4yU8c0SjHfLHS5u1w&usqp=CAU" className="col-md-3 py-5"></img>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBomjNnWMCU5o3GE6Tok4xgdBv5chJF0x6g&usqp=CAU" className="col-md-3"></img>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADFCAMAAACM/tznAAAAclBMVEX////8/PxSUlJLS0tGRkZOTk49PT1CQkJISEj19fVAQEBbW1uYmJju7u63t7ebm5uAgICSkpLp6elhYWHW1taGhoZ0dHS+vr46OjpWVlbi4uLHx8exsbGoqKiOjo5qamp4eHgzMzPMzMwfHx8uLi7c3NxXekCyAAAHSElEQVR4nO2b6XajOBBGHbSymNWYzRjb037/VxxJrJmMkm4nkjin6/vRbShRKV2k0gIcDiAQCAQCgUAg0OHNdQBW9KavJgCwGIY7AQAAoDdZDMOdAAAA0JsshuFOAAAA6E0Ww3AnAAAA9CaLYbgTAAAAepPFMNwJAAAAvcliGO4EAACA3mQxDHcCAABAb7IYhjsBAACgN1kMw50AAADQmyyG4U4AAADoTRbDcCcAAAD0JothuBMAAAB6k8Uw3AkAAAC9yWIY7gQAAIDeZDEMdwIAAEBvshiGOwEAAKA3WQzDnQAAANCbLIbhTgAAAOhNFsNwJwAAAPQmi2G4EwAAAHrTT/j3T11VPdr9wjQKIE9CyrAQY+fq297MyCCAt5JybxZhaJ8IzAHI0Vp9pfr2PYdmZAzAkb2rPcE4LYsdpgJjAEKyqT4PhsoXHvtvuTQiUwC6+1J7xJr+OLk8fcenERlrAW04pYAmefrPeKr58Vs+TcgQgC4/HJJA1T8dEAtq/xvOjMoMgOM9aKLTo1DpT/aCSJy8XPdIwQyAC5ddnwxzGqDPwyGu8fl1j8ZkBsCwHQIECyTOddij+8uBZgD4+N0MIEhVxTtMyh/6Az8oIwBOwXrzgyKeur7AgjfeIxIEYdbK30nD5fBQNKH4t+VNIk9GDReZ9NqEo1A+lvRGb6U8X5Td6KzyVJnxwj+TEQA9ne9+IWYAb8dxMVhhjz0X5w1HlLI6kwcRrwWAmAVquXBDgaikz7hsL7d7LZzxuv5nBMDxCCBFHq0pp6k6ioXruq5/ZX8eqxEAbwkdk0BY3kKRDX+poFPi4XgucsGozPNHqTpHhKgA4JFQmZ6U97KqVLYO/3hsObqK/5QtQTMAgo5+eyNUtYEYs4cocnxhmDE0D2iHcSlAFIhCucPTcKh0RSxfSisAF8ymBn0mXJRG6WQ9YrTc2Q0ALuJr2WiKcfBqfjUCoFINehkJyE2elIlh/CXVi9u6lBcA/AMhxXR4oriKMZ27y+cAFFIBYOlcfygTAPyahtEpL9GcCFVVMzS3BVUGIUSSdjyIELreEH7MxoEUIVkmDRoAKD/6GarVnY8xuZVlmb4QsgkAR9nYGb4VMwCVnBMu+gNZCvkp5ZyO42KEPCaGiOUPysayNAAdAI8xhviY90USxDSg953kgHzq/3MXYGoV3NbnM2HbYj0iWBGIEI97vOkTA1kbgBZAUZC5RcWY94+u63bSAtp1GiA50HRMd76YIQfvnPqNR+UJlQPOZL3pFcbdUkqfA3rOxm4jRoE9JcGWrtVHNG0Xw38ByErL+qhRIKfTMHiQk8bfAOCLuQIZ1NHORoG1BRB2FQNCOyPYAMhpeakyNGb+cR7QYzzvGP0mAJFXAtUEZBeohF6gYLYFlI9HcsZ3Va+8SUoSzGX6WuQwzJlik7G7nOc0vJ7mBhWlGwA1W7JDxOgI4IbVdJFyRTCmiFFK7zuZCfrFtCHaNJghMo0CF4aQhxbnjyQ93/qxNlWUyR/PLJpmis8sW8d1P4uWHXVRcgzrEkXyRxxdJbNTFim9sPNuZibYhds94TG9q2lB+NWV1mVmOSwQeOuSeJz/dYIJ2d+WiBEAzZA8jnG4AFD91BcA0Aud1LCMAEgRwkGRzgDwOFadiccvL/s0JTP7AXw7E6TTElAu2ve3J2YEwGOTAolc4yhXR+Yx8SPf196wEQCb54J48A/dWXX9J5M58PmLN9mOGoKZYXBeB3q8zxPCkMyCbeMF3bRjTof2Sx+WZAbAvClIylsgh38qHxRR1BzmHXOymx1yQ1tiFz4+GRy3xDy5yXe4FgJDPq8T6E4eE5p6OPqWMORtNJ9P5rcmcPnZ5fZkCoBYq2bB+nxo3g722Tw23KLPHdiSKQDpcMnb69oI1u18tTo472YsNPZ+QEEDr0zXneFCVjmZGsCO1kTmXpIqKSGbZ6SE9PF5WiC9vH1jQD8L4N0lp4Hydy8K4elo2sfah34WwDNjNeZKXiXGvEtaeB/Fuq89WdNPd4G3qpieC2JeVq2fV8MHAORrN/ZkIAc8bxMCggNK+Yf6s129MmokCbYpJR/qvdz/PWUAc0+Hz4EOAM2/vtyijA2Dj+Zj41epYWdvixp8W7wP/qcfoH11ALPfC+Qf+wEhu5kDTzL7xUhH8Pv7j3ayCF5l+pOZC1mXxYTuZw20yPxHU12J1HczjJ4fX5e2LitfjeWnrupO+7v7UvDZHADQmyyG4U4AAADoTRbDcCcAAAD0JothuBMAAAB6k8Uw3AkAAAC9yWIY7gQAAIDeZDEMdwIAAEBvshiGOwEAAKA3WQzDnQAAANCbLIbhTgAAAOhNFsNwJwAAAPQmi2G4EwAAAHqTxTDcCQAAAL3JYhjuBAAAgN5kMQx3AgAAQG+yGIY7AQAAoDdZDMOdAAAA0JsshuFOAAAA6E0Ww3AnAAAA9CaLYbgTAAAAepPFMNwJAAAAvcliGO4EAADAJ6a/QhZhg/avfwGwaEcspAx+yQAAAABJRU5ErkJggg==" className="col-md-3 py-5"></img>
            </div>
        </div>
    );
}

export default Companies;