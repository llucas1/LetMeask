import { ButtonHTMLAttributes, HtmlHTMLAttributes } from "react"

import '../Style/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export function Button(props: ButtonProps){
    return(
        <button className="button" {...props}/>
    )

}