import StudentInfo from "../../Student/StudentInfo"
import AcademicHistory from "../../Student/AcademicHistory"
import StudentConfirmForm from "../../Student/StudentConfirmForm"

import {
    studentInfo, history, courses, classes, turmas
} from "./mockStudent"
import PageBase from "../../Layout/PageBase/PageBase"

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
