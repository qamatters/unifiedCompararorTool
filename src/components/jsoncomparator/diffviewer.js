import React from "react";
import ReactDiffViewer from "react-diff-viewer";

export default function Diff({ oldData, newData }) {
    return (
        <div className="viewer">
            <ReactDiffViewer
                oldValue={oldData}
                newValue={newData}
                useDarkTheme={true}
            />
        </div>
    )
}
