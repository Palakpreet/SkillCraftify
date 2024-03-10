import { message } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";
import { getExamById } from "../../../apicalls/exams";
import Instructions from "./instructions";

function WriteExam() {
  const [examData, setExamData] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({
        examId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);
  return (
    examData && (
      <div>
        <div className="mt-2"></div>
        <div className="divider"></div>
        <h1 className="text-center">{examData.name}</h1>
        <div className="divider"></div>
        <Instructions examData={examData} />
      </div>
    )
  );
}

export default WriteExam;
