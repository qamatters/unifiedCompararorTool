import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Diff from "./diffviewer";

function JsonComparator() {
    const [oldData, setOldData] = useState("");
    const [newData, setNewData] = useState("");
    const [compare, setCompare] = useState(false);
    const [errorMsg, setErrorMsg] = useState({ "firstJson": "", "secondJson": "" });

    function setOld(event) {
        setCompare(false)
        let value = (event.target.value);
        setOldData(value)
    }
    function setNew(event) {
        setCompare(false)
        let value = (event.target.value);
        setNewData(value)
    }

    function handleClick() {
        let first = checkError(oldData);
        let second = checkError(newData);
        if (first === "" && second === "") {
            setCompare(prev => !prev);
            setDefault();
        }
        else {
            first !== "" && second !== "" ?
                setErrorMsg(() => ({ "firstJson": first, "secondJson": second }))
                : first !== ""
                    ? setErrorMsg(() => ({ "firstJson": first, "secondJson": "" }))
                    : setErrorMsg(() => ({ "firstJson": "", "secondJson": second }))
        }
    }

    function setDefault() {
        let value = compare ? "new" : "Compare";
        if (value === "new") {
            setNewData("");
            setOldData("");
            setErrorMsg(() => ({ "firstJson": "", "secondJson": "" }))
        }
    }

    const checkError = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return e.message;
        }
        return "";
    }

    const handleFormatClickForRequest = (type) => {
        const inputArea = type === "first" ? oldData : newData;
        let checkVal = checkError(inputArea)
        if (checkVal === "") {
            const value = JSON.stringify(JSON.parse(inputArea), null, 4);
            type === "first" ? setOldData(value) : setNewData(value);
        }

    }

    return (
        <>
            <div className="compare-container" data-testid="CompareJsonButton">
                <form>
                    <Form.Group controlId="compare" className="controls">
                        <Button variant="primary" size="sm" onClick={handleClick}>
                            {compare ? "Perform a new diff" : "Compare"}
                        </Button>
                    </Form.Group>
                </form>
            </div>
            {compare ?
                <Diff oldData={oldData} newData={newData} compare={compare} /> :
                <>
                    {
                        <div className="header-container">
                            {(errorMsg.firstJson || errorMsg.secondJson) &&
                                <>
                                    <div className={errorMsg.firstJson ? "error" : ""}>
                                        {errorMsg.firstJson}
                                    </div>
                                    <div className={errorMsg.secondJson ? "error" : ""}>
                                        {errorMsg.secondJson}
                                    </div>
                                </>}
                        </div>
                    }
                    <div className="container">
                        <textarea
                            className="large-area"
                            placeholder="Enter JSON to compare"
                            onChange={setOld}
                            value={oldData} >
                        </textarea>

                        <textarea
                            className="large-area"
                            placeholder="Enter JSON to compare"
                            onChange={setNew}
                            value={newData} >
                        </textarea>

                    </div>
                    <div className="footer-container">
                        <div className="controls">
                            <button
                                onClick={() => handleFormatClickForRequest("first")}
                                className="controls__button controls__button--format">
                                Format Your Request
                            </button>
                        </div>
                        <div className="controls">
                            <button
                                onClick={handleFormatClickForRequest}
                                className="controls__button controls__button--format">
                                Format Your Request
                            </button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default JsonComparator;
