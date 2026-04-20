import React from "react";
import { ProjectParamsContext } from "../providers/ProjectParamsProvider";

export const useProjectParams = () => {
    const context = React.useContext(ProjectParamsContext);
    if (!context) {
        throw new Error("useProjectParams must be used within ProjectParamsProvider");
    }
    return context;
};
