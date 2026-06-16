import StudentInfo from "../../student/StudentInfo"
import AcademicHistory from "../../student/AcademicHistory"
import StudentConfirmForm from "../../student/StudentConfirmForm"

import {
    studentInfo, history, courses, classes, turmas
} from "./mockStudent"
import PageBase from "../../layout/PageBase/PageBase"

export default function StudentConfirm() {
    return (
        <PageBase title="Confirmação">

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-5">
                        <StudentInfo student={studentInfo} />
                        <AcademicHistory history={history} />
                    </div>
                    <div className="col-md-7">
                        <StudentConfirmForm
                            courses={courses}
                            classes={classes}
                            turmas={turmas}
                        />
                    </div>
                </div>
            </div>
        </PageBase>
    )
}
