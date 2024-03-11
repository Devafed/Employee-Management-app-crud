import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EmpCreate = () => {
  const [id, idchange] = useState("");
  const [employeeid, setEmployeeId] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [jobrole, setJobRole] = useState(undefined);
  const [error, setError] = useState({});
  const options = [
    "Java Developer",
    "Software Developer",
    "Front-End Developer",
    "Back-End Developer",
    "Data Analyst",
  ];
  const onOptionChangeHandler = (event) => {
    setJobRole(event.target.value);
  };

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newError = {};
    const pattern = new RegExp(/^\d{1,10}$/);

    if (!name || name.length === 0) {
      newError.name = "Username is Required!";
      isValid = false;
    } else if (name.length <= 3 || name.length >= 15) {
      newError.name = "Username is more then 3 and less then 15 is Required!";
      isValid = false;
    }
    if (!email) {
      newError.email = "Email is Required!";
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
      newError.email = "Enter Valid Email!";
      isValid = false;
    }
    if (!employeeid || employeeid.length === 0) {
      newError.employeeid = "Employeeid is Required!";
      isValid = false;
    } else if (employeeid.length >= 5) {
      newError.employeeid = "Employeeid is maximum 4 Character!";
      isValid = false;
    }
    if (!phone) {
      newError.phone = "Phonenumber is Required!";
      isValid = false;
    } else if (!pattern.test(phone)) {
      newError.phone = "Phonenumber is less then 10 or Invaild!";
      isValid = false;
    }
    setError(newError);
    return isValid;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { name, email, phone, jobrole, employeeid };
    if (validateForm()) {
      fetch("http://localhost:8000/employee", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(empdata),
      })
        .then((res) => {
          toast.success("Form saved successfully");
          setTimeout(() => {
            navigate("/");
          }, 5000);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const isVaildForm = Object.keys(error).length === 0;

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card bg-form" style={{ textAlign: "left" }}>
              <div className="card-title text-center pt-4">
                <h2>Employee Create</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        
                        type="text"
                        value={name}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {error.name && (
                        <span className="text-danger">{error.name}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        
                        type="email"
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        className="form-control"
                      ></input>
                      {error.email && (
                        <span className="text-danger">{error.email}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label>Employee ID</label>
                      <input
                        
                        type="text"
                        value={employeeid}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="form-control"
                      ></input>
                      {error.employeeid && (
                        <span className="text-danger">{error.employeeid}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        
                        type="tel"
                        value={phone}
                        onChange={(e) => phonechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {error.phone && (
                        <span className="text-danger">{error.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label>Job Role</label>
                      <select
                        
                        className="form-control"
                        onChange={onOptionChangeHandler}
                      >
                        <option value="">Please choose one option</option>
                        {options.map((option, index) => {
                          return <option key={index}>{option}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-3">
                    <div className="form-group">
                      <button className="btn" type="submit">
                        Submit
                      </button>
                      <Link to="/" className="btn back-btn">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default EmpCreate;
