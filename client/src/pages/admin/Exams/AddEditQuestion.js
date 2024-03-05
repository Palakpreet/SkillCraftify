import { Modal, Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addQuestionToExam, editQuestionById } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function AddEditQuestion(props) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: props.examId,
      };
      let response;
      if (props.selectedQuestion) {
        response = await editQuestionById({
          ...requiredPayload,
          questionId: props.selectedQuestion._id,
        });
      } else response = await addQuestionToExam(requiredPayload);
      if (response.success) {
        message.success(response.message);
        props.refreshData();
        props.setShowAddEditQuestionModal(false);
      } else {
        message.error(response.message);
      }
      props.setSelectedQuestion(null);
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <Modal
      title={props.selectedQuestion ? "Edit Question" : "Add Question"}
      visible={props.showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        props.setShowAddEditQuestionModal(false);
        props.setSelectedQuestion(null);
      }}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: props.selectedQuestion?.name,
          A: props.selectedQuestion?.options.A,
          B: props.selectedQuestion?.options.B,
          C: props.selectedQuestion?.options.C,
          D: props.selectedQuestion?.options.D,
          correctOption: props.selectedQuestion?.correctOption,
        }}
      >
        <Form.Item name="name" label="Question">
          <input type="text" style={{ width: "93%" }} />
        </Form.Item>
        <Form.Item name="correctOption" label="Answer">
          <input type="text" style={{ width: "93%" }} />
        </Form.Item>
        <div className="flex gap-5">
          <Form.Item name="A" label="Option A">
            <input type="text" style={{ width: "93%" }} />
          </Form.Item>
          <Form.Item name="B" label="Option B">
            <input type="text" style={{ width: "93%" }} />
          </Form.Item>
        </div>
        <div className="flex gap-5">
          <Form.Item name="C" label="Option C">
            <input type="text" style={{ width: "93%" }} />
          </Form.Item>
          <Form.Item name="D" label="Option D">
            <input type="text" style={{ width: "93%" }} />
          </Form.Item>
        </div>
        <div className="flex justify-end mt-2 gap-2">
          <button
            type="button"
            className="primary-outlined-btn"
            onClick={() => props.setShowAddEditQuestionModal(false)}
          >
            Cancel
          </button>

          <button
            className="primary-contained-btn"
            onClick={() => props.setSelectedQuestion(null)}
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}
export default AddEditQuestion;
