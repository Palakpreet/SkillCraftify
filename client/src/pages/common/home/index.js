import React, { useEffect, useState, useReducer } from "react";
import { message, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
        console.log(exams);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (<div>
      <PageTitle title={`Hi ${user?.name}, Welcome to SkillCraftify`} />
      <div className="divider"></div>
      <Row gutter={[16, 16]}>
        {exams.map((exam) => {
          return (
            <Col span={6}>
              <div className="card flex flex-col gap-1 p-2 mt-2">
                <h1 className="text-2xl">
                  <b>{exam?.name}</b>
                </h1>
                <h1 className="text-md">Category : {exam.category}</h1>
                <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
                <h1 className="text-md">Duration : {exam.duration}</h1>
                <button
                  className="primary-outlined-btn"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>)
  );
}

export default Home;
