import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import StudentForm from "./pages/dashboard/dashboard";

function App() {

  return (
    <>
      <div >
        {/* <center><h1>CRUD : Students</h1></center> */}
        <center><h1>CRUD STUDENTS</h1></center>
        <StudentForm/>
      </div>
    </>
  )
}

export default App
