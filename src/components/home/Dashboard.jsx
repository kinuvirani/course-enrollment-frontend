import {useEffect} from "react";
import { Card, Col, Row, Button } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getAllCourses} from "../../store/slices/courseSlice.js";
import {enrollIntoCourse} from "../../store/slices/enrollmentSlice.js"

const Dashboard = () => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.course.courses?.data);
    const studentId = useSelector((state) => state.auth.student?.data?.studentId);

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    const handleCourseEnrollment = (courseId) => {
        const enrollmentData = {
            courseId,
            studentId
        };
        dispatch(enrollIntoCourse(enrollmentData));
    }

    return (
        <Row gutter={[16, 16]} justify="start">
            {courses && courses.length > 0 ? courses.map((course) =>
                (
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      style={{ marginBottom: '16px' }}
                      key={course.courseId}
                    >
                    <Card title={course.courseId} variant="borderless">
                        {course.name}
                        <div className="course-actions">
                            <Button
                                style={{ backgroundColor: '#001529', color: 'white' }}
                                onClick={() => handleCourseEnrollment(course.courseId)}
                            >
                                Enroll
                            </Button>
                        </div>
                    </Card>
                </Col>)
            ) : null }
        </Row>
    )
}

export default Dashboard;