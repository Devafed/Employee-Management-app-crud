import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EmployeeListing = () => {
  const [empdata, empdatachange] = useState(null);

  const navigate = useNavigate();

  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };
  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove user?")) {
      fetch("http://localhost:8000/employee/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          toast.success("User Removed successfully ");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log();
        toast.success(err.message, {
          autoClose: 5000,
        });
      });
  }, []);
  return (
    <div className="container">
      <div className="card bg-listing">
        <div className="card-title mt-3">
          <h2>Employee Management List</h2>
        </div>
        <div className="card-body">
          <div className="divbtn mb-3">
            <Link to="employee/create" className="btn">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>SI.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>EmployeeId</th>
                <th>Phone</th>
                <th>Job Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.employeeid}</td>
                    <td>{item.phone}</td>
                    <td>{item.jobrole}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        className="btn grn-btn"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item.id);
                        }}
                        className="btn back-btn"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default EmployeeListing;
