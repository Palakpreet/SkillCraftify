import React, { useEffect } from "react";
import { addExam } from "../../../apicalls/exams";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { Col, Row, Form, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";
import { editExamById, getExamById } from "../../../apicalls/exams";
import { Tabs } from "antd";
const { TabPane } = Tabs;
function AddEditExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [examData, setExamData] = React.useState(null);
  const params = useParams();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;

      if (params.id) {
        response = await editExamById({
          ...values,
          examId: params.id,
        });
      } else {
        response = await addExam(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

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

  // function AddEditExam() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const [examData, setExamData] = React.useState(null);
  //   const params = useParams();
  //   console.log(params.id);
  //   const onFinish = async (values) => {
  //     try {
  //       dispatch(ShowLoading());
  //       let response;
  //       if (params.id) {
  //         response = await editExamById({
  //           ...values,
  //           examId: params.Id,
  //         });
  //       } else {
  //         response = await addExam(values);
  //       }
  //       if (response.success) {
  //         message.success(response.message);
  //         navigate("/admin/exams");
  //       } else {
  //         message.error(response.message);
  //       }
  //       dispatch(HideLoading());
  //     } catch (error) {
  //       dispatch(HideLoading());
  //       message.error(error.message);
  //     }
  //   };
  //   const getExamData = async () => {
  //     try {
  //       dispatch(ShowLoading());
  //       const response = await getExamById({
  //         examId: params.Id,
  //       });
  //       dispatch(HideLoading());
  //       console.log("response" + response);
  //       if (response.success) {
  //         setExamData(response.data);
  //         console.log("val" + response.data);
  //       } else {
  //         message.error(response.message);
  //       }
  //     } catch (error) {
  //       dispatch(HideLoading());
  //       message.error(error.message);
  //     }
  //   };
  //   useEffect(() => {
  //     if (params.id) {
  //       getExamData();
  //     }
  //   }, [params.id]);
  return (
    //   <div>
    //     <PageTitle title={params.id ? "Edit Exam" : "Add Exam"} />
    //     {true && (
    //       <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
    //         <Tabs defaultActiveKey="">
    //           <TabPane tab="Exam Details" key="1">
    //             <Row gutter={[10, 10]}>
    //               <Col span={8}>
    //                 <Form.Item label="Exam Name" name="name">
    //                   <input type="text" />
    //                 </Form.Item>
    //               </Col>
    //               <Col span={8}>
    //                 <Form.Item label="Exam Duration" name="duration">
    //                   <input type="number" />
    //                 </Form.Item>
    //               </Col>
    //               <Col span={8}>
    //                 <Form.Item label="Category" name="category">
    //                   <select>
    //                     <option value="javascript">Javascript</option>
    //                     <option value="react">React</option>
    //                     <option value="node">Node</option>
    //                     <option value="mongo">Mongo</option>
    //                   </select>
    //                 </Form.Item>
    //               </Col>
    //               <Col span={8}>
    //                 <Form.Item label="Total Marks" name="totalMarks">
    //                   <input type="number" />
    //                 </Form.Item>
    //               </Col>
    //               <Col span={8}>
    //                 <Form.Item label="Passing Marks" name="passingMarks">
    //                   <input type="number" />
    //                 </Form.Item>
    //               </Col>
    //             </Row>
    //           </TabPane>
    //           {params.id && (
    //             <TabPane tab="Questions" key="2">
    //               HEllo
    //             </TabPane>
    //           )}
    //         </Tabs>

    //         <div className="flex justify-end">
    //           <button className="primary-contained-btn" type="submit">
    //             Save
    //           </button>
    //         </div>
    //       </Form>
    //     )}
    //   </div>
    // );
    <div>
      <PageTitle title={params.id ? "Edit Exam" : "Add Exam"} />
      <div className="divider"></div>

      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exam Details" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Exam Name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Exam Duration" name="duration">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category">
                    <select name="" id="">
                      <option value="">Select Category</option>
                      <option value="Javascript">Javascript</option>
                      <option value="React">React</option>
                      <option value="Node">Node</option>
                      <option value="MongoDB">MongoDB</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Marks" name="totalMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
                <button
                  className="primary-outlined-btn"
                  type="button"
                  onClick={() => navigate("/admin/exams")}
                >
                  Cancel
                </button>
                <button className="primary-contained-btn" type="submit">
                  Save
                </button>
              </div>
            </TabPane>
            {params.id && <TabPane tab="Questions" key="2"></TabPane>}
          </Tabs>
        </Form>
      )}
    </div>
  );
}

export default AddEditExam;
