"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorProps {
    error: Error;
}

const ERROR: React.FC<ErrorProps> = ({ error }) => {
    useEffect(() => {
        console.log(error);
    }, [error]);

    return <EmptyState title="저런..." subtitle="뭔가 단단히 잘못되었군요?" />;
};

export default ERROR;
