import DisciplineFilter from "../../disciplines/DisciplineFilter"
import DisciplineInfo from "../../disciplines/DisciplineInfo"
import DisciplineTable from "../../disciplines/DisciplineTable"
import PageBase from "../../Layout/PageBase/PageBase"

export default function DisciplinesPage() {

    return (
        <PageBase title="Disciplinas">
            <div className="container mt-4">

                <DisciplineInfo />

                <div className="row">
                    <div className="col-md-4">
                        <DisciplineFilter />
                    </div>

                    <div className="col-md-8">
                        <DisciplineTable />
                    </div>
                </div>
            </div>
        </PageBase>
    )

}