import { useState, useEffect} from "react";
import ListTile from "./components/list_tile";
import axios from 'axios';

export default function StudentForm() {
  const [id, setID] = useState("");
  const [studentname, setStudentname] = useState("");
  const [phone, setPhone] = useState("985412365");
  const [street, setStreet] = useState("Bidhannagar");
  const [pincode, setPincode] = useState("700091");
  const [country, setCountry] = useState("Russia");
  const [APIData, setAPIData] = useState([]);
  const URL = "http://localhost:5156/api/Student";

  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = () =>{
    axios.get(URL)
        .then((response) => {
            setAPIData(response.data);
            console.log(response.data)
        })
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(id !== ''){
      const payload = 
      {
          "id" : id,
          "studentName": studentname,
          "studentPhone": phone,
          "studentAddress": {
              "street": street,
              "pincode": pincode,
              "country": country
          }
      }
      axios.put(`${URL}/${id}`, payload);
    }else{
      const payload = 
      {
          "studentName": studentname,
          "studentPhone": phone,
          "studentAddress": {
              "street": street,
              "pincode": pincode,
              "country": country
          }
      }   
      axios.post(URL, payload);
    }
    fetchData();
  }
  const clearForm = () =>{
    // setID('');setStudentname(''); setPhone (''); setStreet (''); setPincode (''); setCountry ('');
    setID('');setStudentname(''); setPhone ('985412365'); setStreet ('Bidhannagar'); setPincode ('700091'); setCountry ('Russia');
  }

  const setData = (data) => {
    setID(data.id);
    setStudentname(data.studentName);  
    setPhone(data.studentPhone)
    setStreet(data.studentAddress.street);  
    setPincode(data.studentAddress.pincode);
    setCountry(data.studentAddress.country);
  } 

  const deleteData = (id) => {
    axios.delete(`${URL}/${id}`);
  }

  return (
    <div className="container-xl">
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm mr-1 "
          data-bs-toggle="modal"
          data-bs-target="#formModal"
          data-bs-backdrop='static'
          onClick={clearForm}
        >
          Add New Student
        </button>
      </div>

      <div className="list-group border rounded my-3 p-1" id="data-list">
        {
          APIData.toReversed().map((data)=>{
            return(
              <ListTile key={data.id} data = {data} setData = {setData} deleteData = {deleteData}/>
            );
          })
        }
      </div>

      <div
        className="modal fade"
        id="formModal"
        tabIndex="-1"
        aria-labelledby="formModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form action="" onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="formModalLabel">
                New Student Registration
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container mt-5">
                  <div className="form-group my-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={studentname}
                      onChange={(e) => setStudentname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group my-1">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      required
                    />
                  </div>
                  <div className="form-group my-1">
                    <textarea
                      className="form-control"
                      placeholder="Street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col">
                      <input
                        type="number"
                        maxLength="7"
                        className="form-control"
                        placeholder="Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick= {clearForm}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
