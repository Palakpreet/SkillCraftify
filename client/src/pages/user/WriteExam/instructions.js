import React from "react";

function Instructions(props) {
  return (
    <div className="flex flex-col item-center gap-5">
      <ul className="flex flex-col gap-1">
        <h1 className="text-2xl underline">Instructions</h1>
        <li>Exam must be completed in {props.examData.duration} seconds.</li>
        <li>
          Exam will be autosubmitted after {props.examData.duration} seconds.
        </li>
        <li>Once submitted, you cannot change your answers.</li>
        <li>Do not refresh the page.</li>
        <li>
          You can use <span className="font-bold">"Previous"</span> and{" "}
          <span className="font-bold">"Next"</span> buttons to navigate between
          questions.
        </li>
        <li>
          Total marks of the exam is{" "}
          <span className="font-bold">{props.examData.totalMarks}</span>
        </li>
        <li>
          Passing marks of the exam is{" "}
          <span className="font-bold">{props.examData.passingMarks}</span>
        </li>
      </ul>
      <button
        className="primary-outlined-btn"
        onClick={() => {
          props.setView("questions");
        }}
      >
        Start Now
      </button>
    </div>
  );
}

export default Instructions;
