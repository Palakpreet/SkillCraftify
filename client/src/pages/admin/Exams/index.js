import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";

function Exams() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between mt-2">
        <PageTitle title="Exams" />
        <button
          className="primary-outlined-btn flex item-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <i className="ri-add-line"></i>
          Add Exam
        </button>
      </div>
    </div>
  );
}

export default Exams;