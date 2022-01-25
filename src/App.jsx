import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

const App = () => {

    // changing the background styling

    document.body.className = "user-bg";

    // setting usestate for form inputs and json data

    const [fullName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [listOccupation, setListOccupation] = useState("");
    const [usState, setUsState] = useState("");
    const [disable, setDisable] = useState(true);
    const [newData, setNewData] = useState({});

    const [formData, setFormData] = useState(
        {
            name: "",
            email: "",
            password: "",
            occupations: [],
            states: []
        }
    );

    // fetching data for the form using useeffect

    useEffect(() => {
        fetch("https://frontend-take-home.fetchrewards.com/form")
            .then(res => res.json())
            .then(formData => setFormData(formData))
            .catch(err => console.log(err))
    }, []);

    // handling changes in the input fields 

    const handleNameChange = e => {
        setName(e.target.value);
        handleEmpty();
    };

    const handleEmailChange = e => {
        setEmail(e.target.value);
        handleEmpty();
    };

    const handlePassChange = e => {
        setPassword(e.target.value);
        handleEmpty();
    };

    const handleOccChange = e => {
        setListOccupation(e.target.value);
        handleEmpty();
    };

    const handleUsStateChange = e => {
        setUsState(e.target.value);
        handleEmpty();
    };

    // making sure form data to post stays up to date with inputs

    function handleFormData() {

        const newData =
        {
            name: fullName,
            email: email,
            password: password,
            occupation: listOccupation,
            state: usState
        }
        setNewData(newData);
    };

    // making sure form cannot be submitted with empty fields, checking that inputs are not empty and re-enabling submit button

    function handleEmpty() {
        handleFormData();
        if ((fullName !== "") && (email !== "") && (password !== "") && (listOccupation !== "") && (usState !== "")) {
            setDisable(false);
        };
    };

    // clearing form input fields after submission

    function clearForm() {

        setName("");
        setEmail("");
        setPassword("");
        setListOccupation("");
        setUsState("");
    }

    // handling form submission and POST, converting data to json, alerting that the submission was successful, and clearing inputs

    const handleSubmit = e => {
        handleFormData();
        e.preventDefault();
        fetch("https://frontend-take-home.fetchrewards.com/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newData)
        }).then(function (response) {
            console.log(response)
        });

        clearForm();

        // using sweet alert for a dynamicand customizable success message 

        swal({
            title: "Form Submitted!",
            icon: "success",
            button: "Sweet!"
        });


    };

    return (
        <>
            {/* formatting primary container and title  */}

            <div className="container col-12 d-flex flex-wrap justify-content-center">
                <div className="col-12 d-flex justify-content-center m-2">
                    <div className="card col-sm-6 m-2 rosy-bg">
                         <h1 className="text-center display-font text-light">Create New User:</h1>
                    </div>
                </div>

                {/* formatting form */}

                <div className="col-sm-6 shadow m-2 p-3 rosy-bg rounded">
                    <form action="https://frontend-take-home.fetchrewards.com/form" onSubmit={handleSubmit}>

                        <div className="input-group form-font mb-2">
                            <span className="input-group-text">Full Name:</span>
                            <input type="text" name="name" className="form-control" placeholder="Full Name" value={fullName} onChange={handleNameChange} />
                        </div>

                        <div className="input-group form-font mb-2">
                            <span className="input-group-text">Email:</span>
                            <input type="email" name="email" className="form-control" placeholder="Email" value={email} onChange={handleEmailChange} />
                        </div>

                        <div className="input-group form-font mb-2">
                            <span className="input-group-text">Password:</span>
                            <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={handlePassChange} />
                        </div>

                        <div className="input-group form-font mb-2">
                            <span className="input-group-text">Occupation:</span>
                            <select id="occupationSelect" className="form-select" name="occupation" value={listOccupation} onBlur={handleOccChange} onChange={handleOccChange} >
                                <option value="">Select your occupation</option>
                                {/* mapping fetched data as select occupation options  */}
                                {formData.occupations.map((occupation) =>
                                    <option key={`occupation-id-${occupation}`} value={`${occupation}`} >
                                        {occupation}
                                    </option>
                                )};
                            </select>
                        </div>

                        <div className="input-group mb-2 form-font justify-content-between">

                            <div>
                                <span className="input-group-text">State:</span>
                                <select id="stateSelect" className="form-select" name="state" value={usState} onBlur={handleUsStateChange} onChange={handleUsStateChange} >
                                    <option value="">State</option>
                                     {/* mapping fetched data as select state options  */}
                                    {formData.states.map((state, index) =>
                                        <option key={`state-id-${index}`} value={`${state.name}`} >
                                            {state.abbreviation}
                                        </option>
                                    )};
                                </select>
                            </div>

                            {/* submit button, disabled until all fields are not empty */}

                            <button type="submit" className="btn btn-success m-2 align-self-end" disabled={disable}>Create User</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default App;