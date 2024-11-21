import React from "react";
import NavigationMenu from "@/components/NavigationMenu";
import IdleScreen from "@/components/IdleScreen";
export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavigationMenu />
            <hr />
            <main>{children}</main>
            <IdleScreen />
        </>
    );
}
