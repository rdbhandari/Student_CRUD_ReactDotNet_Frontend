import React from "react";

export default function ListTile({data, setData, deleteData}) {
  return (
    <div className="list-group-item flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h4 className="mb-2">{data.studentName}</h4>
        <small>
          <button type="button" className="btn btn-sm" data-bs-toggle="modal" data-bs-target="#formModal" onClick={(e)=> setData(data)}>
            ✏️
          </button>
          <button type="button" className="btn btn-sm" onClick={()=> deleteData(data.id)}>
            ❌
          </button>
        </small>
      </div>
      <div className="ms-2">
        <p className="mb-1 text-success">{data.studentPhone}.</p>
        <small className="text-primary">
          {data.studentAddress.street},{data.studentAddress.pincode}, {data.studentAddress.country}
        </small>
      </div>
    </div>
  );
}
