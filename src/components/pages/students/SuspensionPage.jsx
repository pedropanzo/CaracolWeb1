import PageBase from "../../Layout/PageBase/PageBase";
import SuspensionHeader from "../../suspensao/SuspensionHeader";
import SuspensionTable from "../../suspensao/SuspensionTable";

export default function SuspensionPage() {

    return (
        <PageBase title="Área de suspensão">            
            <SuspensionHeader />
            <SuspensionTable />
        </PageBase>
    )
}