import PageBase from "../../Layout/PageBase/PageBase";
import CostFilter from "../../service-cost/CostFilter";
import CostTable from "../../service-cost/CostTable";

export default function ServiceCostPage() {

    return (

        <PageBase title="Custo de serviço">
            <div className="container mt-4">

                <div className="row">

                    <div className="col-md-4">
                        <CostFilter />
                    </div>

                    <div className="col-md-8">
                        <CostTable />
                    </div>

                </div>

            </div>
        </PageBase>
    )

}