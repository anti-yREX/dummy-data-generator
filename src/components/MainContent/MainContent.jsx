import React from "react";
import MainContentWrapper from './MainContent.styles';
import ObjectListPanel from "../ObjectListPanel";

const MainContent = () => {
    return (
        <MainContentWrapper>
            <ObjectListPanel />
            <div>Properties Form</div>
        </MainContentWrapper>
    );
}

export default MainContent;
