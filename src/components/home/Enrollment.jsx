import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllEnrollments, withdrawEnrollment} from "../../store/slices/enrollmentSlice.js";
import {Button, Card, Col, Row, Popconfirm} from "antd";
import {useMessageContext} from "../../contexts/MessageProvider.jsx";

const Enrollment = () => {
    const dispatch = useDispatch();
    const enrollments = useSelector((state) => state.enrollment?.enrollments?.data);
    const studentId = useSelector((state) => state.auth.student?.data?.studentId);
    const messageApi = useMessageContext();

    useEffect(() => {
        dispatch(getAllEnrollments(studentId));
    }, [studentId]);

    const handleCourseWithdrawal = async (enrollmentId) => {
        try {
            const result = await dispatch(withdrawEnrollment(enrollmentId));
            if (result?.error) {
                throw new Error(result?.payload);
            }
            messageApi.success(result.payload.message);
        } catch (error) {
            messageApi.error(error.message || 'An error occurred during enrollment withdrawal');
        }

    }

    return (
        <Row gutter={[16, 16]} justify="start">
            {enrollments && enrollments.length > 0 ? enrollments.map((enrollment) =>
                (
                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        style={{ marginBottom: '16px' }}
                        key={enrollment.enrollmentId}
                    >
                        <Card title={enrollment.enrollmentId} variant="borderless">
                            {enrollment.course.name}
                            <div className="withdraw-button-container">
                                <Popconfirm
                                    title="Withdraw enrollment"
                                    description="Are you sure to withdraw from this course?"
                                    onConfirm={() => handleCourseWithdrawal(enrollment?.enrollmentId)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        disabled={enrollment.isWithdrawn}
                                        type="primary"
                                        danger
                                    >
                                        Withdraw
                                    </Button>
                                </Popconfirm>
                            </div>
                        </Card>
                    </Col>)
            ) : null }
        </Row>
    )
}

export default Enrollment;