import React from "react";
import MainContentWrapper from './MainContent.styles';
import ObjectListPanel from "../ObjectListPanel";
import PropertiesForm from "../PropertiesForm";

const MainContent = () => {
    return (
        <MainContentWrapper>
            <ObjectListPanel />
            <PropertiesForm />
        </MainContentWrapper>
    );
}

export default MainContent;
