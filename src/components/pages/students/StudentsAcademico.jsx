import PageBase from "../../layout/PageBase/PageBase"
import StudentsFilter from "../../student/StudentsFilter"
import StudentsHeader from "../../student/StudentsHeader"
import StudentsTable from "../../student/StudentsTable"

export default function StudentsAcademico() {

    return (

        <PageBase title="Dados Académico">
            <div className="row">
                <div className="col-lg-3  pull-right">
                    <div className="widget style1 white-bg">
                        <div className="row">
                            <div className="col-xs-3 text-center line">
                                <i className="fa fa-user-circle fa-4x"></i>
                            </div>
                            <div className="col-xs-8 text-right">
                                <span> TOTAL DE ALUNOS</span>
                                <h2 className="font-bold line">4.232</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-2">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <p>Escolha o ano que desejas</p>
                        </div>
                        <div className="ibox-content">
                            <form role="form">
                                <div className="form-group">
                                    <label>Ano Lectivo</label>
                                    <select className="form-control" name="" id="">
                                        <option value="">2020-2021</option>
                                        <option value="">2021-2022</option>
                                    </select>
                                </div>
                                <div>
                                    <button className="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit"><strong>Buscar</strong></button>
                                    <label> - </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-10">
                    <div className="ibox float-e-margins">
                        <div className="ibox-content">
                            <div className="table-responsive">
                                <table className="table table-hover dataTables-example" id="#TableFormatada">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>NOME</th>
                                            <th>CURSO</th>
                                            <th>CLASSE</th>
                                            <th>TURMA</th>
                                            <th>DATA DA INSCRIÇÃO</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td>264</td>
                                            <td>Pinto André</td>
                                            <td>Masculino</td>
                                            <td>00453893LA074</td>
                                            <td>Cazenga</td>
                                            <td>02-04-2003</td>
                                            <td className="actions">
                                                <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Detalhes"
                                                    className="btn btn-success btn-xs" data-id="@aluno.Id" onclick="return visualizar('@aluno.Id');">
                                                    <i className="fa fa-print"></i>
                                                </a>
                                                <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Atualizar"
                                                    className="btn btn-primary btn-xs" data-id="@aluno.Id" onclick="return atualizar('@aluno.Id');">
                                                    <i className="fa fa-edit"></i>
                                                </a>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="placeModalHere"></div>
        </PageBase>

    )

}