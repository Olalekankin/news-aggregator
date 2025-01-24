import React from "react"
import {Img} from '../Img'
import { Button } from "../Footer";

interface Props {
 className: String;
}
export default function Header({...props }: Props) {
 return (
  <header { ...props} className={` flex `}>
   <div className="lg:hidden">
    <Button>
     
    </Button>
   </div>
   <Img src="assets/logo.svg" alt="" className=""/>
   <div></div>
  </header>
 )
}