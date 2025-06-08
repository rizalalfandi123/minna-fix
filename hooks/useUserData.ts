import React from "react";
import { UserDataContext } from "~/contexts/userContext";

const useUserData = () => {
    const context = React.useContext(UserDataContext);

    if (!context) throw new Error("useUserData must be used within a UserDataProvider");

    return context;
};

export default useUserData;
