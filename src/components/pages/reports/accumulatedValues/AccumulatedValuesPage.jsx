import { useState } from "react";
import SearchBar from "./SearchBar";
import ReportHeader from "./ReportHeader";
import ValuesTable from "./ValuesTable";
import PageBase from "../../../layout/PageBase/PageBase"

export default function AccumulatedValuesPage() {

    const [search, setSearch] = useState("")

    const data = [
        { id: 133, name: "Isabel Rosária Pedro Roberto", value: 5000 },
        { id: 313, name: "Apolinário João Francisco Quissanga", value: 4000 },
        { id: 371, name: "Jaime De Jesus Lucas Kafumba", value: 3000 },
        { id: 523, name: "Desidério Eugénio Armando Manuel Cataca", value: 500 },
        { id: 718, name: "Manuela Nassende Nachiembe Kamuti", value: 7000 },
        { id: 751, name: "Vinília Simão Gaspar", value: 1000 },
        { id: 976, name: "Lauriano Salomão Domingos", value: 3000 },
        { id: 2256, name: "Fernando Buka João", value: 2000 }
    ]

    const filtered = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <PageBase title="Valores Acumulados">
            <div className="container mt-4">

                <h4 className="border-bottom border-primary pb-2 d-inline-block">
                    Valores acumulados
                </h4>

                <SearchBar search={search} setSearch={setSearch} />
                <ReportHeader />
                <ValuesTable data={filtered} />

            </div>
        </PageBase>
    )
}