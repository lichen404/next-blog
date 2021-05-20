import React from 'react';

type Props = {
    isDarkTheme: boolean,
    setDarkTheme: (payload: boolean) => void
}
export const Switch: React.FC<Props> = (props) => {
    return (
        <>
            <input type="checkbox" className="switch" id="switch_default" checked={props.isDarkTheme}
                   onChange={(e) => props.setDarkTheme(e.target.checked)}/>
            <label className="switch" htmlFor="switch_default"/>
            <style jsx>
                {`
                  .switch {
                    transition: all 250ms;
                    box-shadow: 0.2px 0.2px 1px 0.5px rgb(180, 180, 180);
                  }

                  input.switch {
                    display: none;
                  }

                  input:checked + label::after {
                    left: 17px;
                  }

                  input:checked + label {
                    background-color: #2d96bd;
                  }

                  label.switch {
                    border-radius: 8px;
                    cursor: pointer;
                    width: 30px;
                    height: 14px;
                    display: inline-block;
                    background-color: #e6e6e6;
                    position: relative;
                  }

                  label.switch::after {
                    transition: all 250ms;
                    background-color: #fff;
                    border-radius: 50%;
                    content: "";
                    position: absolute;
                    top: .5px;
                    left: 1px;
                    height: 12px;
                    width: 12px;
                    box-shadow: 0.2px 0.2px 1px 0.5px rgb(180, 180, 180);
                  }
                `}
            </style>
        </>


    );
};
