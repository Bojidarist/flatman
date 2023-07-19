import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = (props: LayoutProps) => {
  return <div className="bg-orange-600">{props.children}</div>;
};
