import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Diff from "./diffviewer";

function JsonComparator() {
    const [oldData, setOldData] = useState();
    const [newData, setNewData] = useState();
    const [compare, setCompare] = useState(false);

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
        setCompare(prev => !prev);
        setDefault();
    }

    function setDefault() {
        let value = compare ? "new" : "Compare";
        value === "new" && setNewData(() => { })
        value === "new" && setOldData(() => { })
    }

    return (
        <>
            <div className="compare" data-testid="CompareJsonButton">
                <form>
                    <Form.Group controlId="compare" className="compare-button">
                        <Button className="mt-3" variant="primary" size="sm" onClick={handleClick}>
                            {compare ? "Perform a new diff" : "Compare"}
                        </Button>
                    </Form.Group>
                </form>
            </div>
            {compare ?
                <Diff oldData={oldData} newData={newData} compare={compare} /> :
                <div className="container">
                    <textarea
                        className="large-area large-area--input"
                        placeholder="Enter JSON to compare"
                        onChange={setOld}
                        value={oldData} >
                    </textarea>
                    <textarea
                        className="large-area large-area--input"
                        placeholder="Enter JSON to compare"
                        onChange={setNew}
                        value={newData} >
                    </textarea>
                </div>
            }
        </>
    )
}

export default JsonComparator;