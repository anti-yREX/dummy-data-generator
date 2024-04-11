import React from "react";
import {
    MainContentWrapper,
    FlexWrapper,
    TitleWrapper,
} from './MainContent.styles';
import ObjectListPanel from "../ObjectListPanel";
import PropertiesForm from "../PropertiesForm";

const MainContent = () => {
    return (
        <MainContentWrapper>
            <TitleWrapper>
                Dummy Data Creator
            </TitleWrapper>
            <FlexWrapper>
                <ObjectListPanel />
                <PropertiesForm />
            </FlexWrapper>
        </MainContentWrapper>
    );
}

export default MainContent;
