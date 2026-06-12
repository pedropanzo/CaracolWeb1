import { useState } from "react";

export default function SuspensionTable() {

    const [selected, setSelected] = useState(null)

    const students = [
        { id: 1, name: "Carlos Tunga Cangala" },
        { id: 3, name: "Domingas Cassinda Mariano" },
        { id: 5, name: "Érica Maria Melo Beianavi" },
        { id: 6, name: "Eliane Maria Fernando Vicente" }
    ]

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-content"></div>
                    <div className="table-responsive">
                        <table className="table table-hover dataTables-example">
                            <thead className="table-light">

                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                </tr>

                            </thead>

                            <tbody>

                                {students.map(s => (
                                    <tr
                                        key={s.id}
                                        onClick={() => setSelected(s.id)}
                                        className={selected === s.id ? "table-primary text-white" : ""}
                                        style={{ cursor: "pointer" }}
                                    >

                                        <td>{s.id}</td>
                                        <td>{s.name}</td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </div>


    )

}