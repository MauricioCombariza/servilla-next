import { ReactElement } from "react";

interface ListType {
    icon: ReactElement;
    title: string;
    link: string;
    nested?: boolean;
    nestedServ?:boolean
    private: boolean;
    id: number;
    className:string;
    onclick?:React.MouseEvent<HTMLButtonElement>
  }
  interface ListDetailType {
    icon: ReactElement;
    title: string;
    link: string;
    private: boolean;
    id: number;
    className:string;
  }

  export type {ListType, ListDetailType}

  
