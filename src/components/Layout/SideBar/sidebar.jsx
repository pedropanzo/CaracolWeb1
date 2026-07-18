import iconProfile from "./../../../assets/img/profile_small.jpg";

import iconbooks from "./../../../assets/img/Icons/books.png";
import iconhome from "./../../../assets/img/Icons/home.png";
import iconmoney from "./../../../assets/img/Icons/money.png";
import iconprint from "./../../../assets/img/Icons/print.png";
import icontransport from "./../../../assets/img/Icons/transport.png";
import iconorder from "./../../../assets/img/Icons/order.png";
import iconsettings from "./../../../assets/img/Icons/settings.png";
import iconsms from "./../../../assets/img/Icons/sms.png";
import iconstaff from "./../../../assets/img/Icons/staff.png";
import iconStud from "./../../../assets/img/Icons/student.png";
import iconSmall from "./../../../assets/img/logo_small.png";

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { usePrintPanel } from "../../../context/PrintPanelContext";

const Sidebar = () => {
    const { openPrintPanel } = usePrintPanel();
    const location = useLocation()
    const { user } = useAuth()

    const menu = [
        {
            icon: iconprint,
            name: "Teste",
            onClick: () => openPrintPanel("Adm"),
        },
        {
            icon: iconhome,
            name: "Home | Dashboard",
            submenu: [
                { name: "Home", path: "/" },
                { name: "Dashboard 1", path: "/dashboard/dashboard1" },
                { name: "Dashboard 2", path: "/dashboard/dashboard2" },
            ],
        },
        { icon: iconsms, name: "SMS | Email", path: "/message/Message" },
        {
            icon: iconStud,
            name: "Aluno",
            submenu: [
                { name: "Inscrição", path: "/alunos/novo", func: "abrirInscricao: true" },
                { name: "Confirmação", path: "/alunos/confirmacao" },
                { name: "Dados Academicos", path: "/alunos/index" },
                { name: "Dados Pessoais", path: "/alunos/dados-pessoal" },
                { name: "Desistencia", path: "/alunos/desistente" },
                { name: "Suspensão", path: "/alunos/suspensao" },
            ],
        },
        {
            icon: iconstaff,
            name: "Funcionários",
            submenu: [
                { name: "Administrativos", path: "/administradores" },
                { name: "Professores", path: "/professores" },
                { name: "Usuários", path: "/usuarios" },
            ],
        },
        {
            icon: iconbooks,
            name: "Implementações",
            submenu: [
                { name: "Curso", path: "/Curso" },
                { name: "Classe", path: "/Classe" },
                { name: "Turma", path: "/Turma" },
                { name: "Discplina", path: "/Disciplina" },
                { name: "Horário", path: "/Horario" },
            ],
        },
        {
            icon: iconorder,
            name: "Pedagógico",
            submenu: [
                { name: "Lançamento de notas", path: "/lancamento-notas" },
                { name: "Cumprimento de notas", path: "/TransferredNotes" },
                { name: "Notas implantadas", path: "/notas-implantadas" },
                { name: "Transição de classe", path: "/Turma" },

                { name: "Cumprimento de notas", path: "/" },
                { name: "Transiçãodeclasse", path: "/transicaodeclasse" },

            ],
        },
        {
            icon: iconmoney, name: "Finanças",
            submenu: [
                { name: "Pagamentos", path: "/pagamento" },
                { name: "Despesas", path: "/Despesas" },
                { name: "Acumulados", path: "/Acumulados" },
                { name: "Estatísticas financeira", path: "/Estatisticas" },
                { name: "Banco", path: "/Banco" },

            ]
        },
        {
            icon: icontransport, name: "Serviço de Transporte",
            submenu: [
                { name: "Viaturas", path: "/Viaturas" },
                { name: "Controlo de Rotas", path: "/Despesas" },
                { name: "Controlo de pessageiros", path: "/passageiros" },
                { name: "Pagamentos", path: "/pagamentos" },
                { name: "Custos", path: "/custos" },
            ]
        },
        {
            icon: iconprint, name: "Impressões",
            submenu: [
                { name: "Imp. Administrativas", path: "/Imp-admin" },
                { name: "Imp. Pedagógicas", path: "/Imp-pedagogica" },
                { name: "Imp. Funcionarios", path: "/Imp-funcionario" },
                { name: "Imp. Finançeiras", path: "/Imp-financeiras" },
                { name: "Imp. Lista nominal de alunos", path: "/Imp-lista-nominal-alunos" },
                { name: "Imp. Lista nominal de professores", path: "/Imp-professores" },
                { name: "Imp. Alunos desistentes", path: "/Imp-lista-desistente-alunos" },
                { name: "Imp. Histórico de classes", path: "/Imp-historico-classes" },
                { name: "Imp. Historico de custos de serviços", path: "/Imp-historico-custos" },
                { name: "Imp. Historico de turmas criadas", path: "/Imp-historico-de-turmas-criadas" },
                { name: "Imp. Excessoes de pagamento", path: "/Imp-excessoes-de-pagamento" },
            ]
        },
        {
            icon: iconsettings,
            name: "Definições",
            submenu: [
                { name: "Ano lectivo", path: "/ano-lectivo" },
                { name: "Departamento", path: "/departamentos" },
                { name: "Serviços", path: "/servicos" },
                { name: "Custo de serviços", path: "/custo-servico" },
                { name: "Configurações", path: "/escolas" },
            ],
        },

    ]
    return (<>
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    { /*  =================== Perfil =================*/}
                    <li className="nav-header">
                        <div className="dropdown profile-element">
                            <span>
                                <img className="img-circle" src={iconProfile} />
                            </span>
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <span className="clear">
                                    <span className="block m-t-xs">
                                        <strong className="font-bold">
                                            {user?.name}
                                        </strong>
                                    </span> <span className="text-muted text-xs block">Director <b className="caret"></b></span>
                                </span>
                            </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="#profile.html">Perfil</a></li>
                                <li><a href="#contacts.html">Contactos</a></li>
                                <li className="divider"></li>
                                <li><a href="login.html">Logout</a></li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            <img alt="image" src={iconSmall} />
                        </div>
                    </li>

                    { /*  =================== Menu =================*/}

                    {menu.map((item) => (
                        <li key={item.name}>
                            {item.submenu ? (
                                <>
                                    <a className={`${location.pathname.startsWith(item.path) ? "active" : ""}`}>
                                        <img style={{ marginRight: "5px" }} src={item.icon} /> <span className="nav-label">  {item.name}</span></a>
                                    <ul className="nav nav-second-level collapse">
                                        {item.submenu.map((sub) => (
                                            <li key={sub.path}>
                                                <Link to={sub.path} state={sub.func}>{sub.name} </Link>



                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                
                                    item.name === "Teste" ? (
                                        <button
                                            type="button"
                                            title={item.name}
                                            className={`sb-btn`}
                                            onClick={item.onClick}
                                        >
                                            Teste
                                        </button>
                                    ) : (
                                        <Link to={item.path} className={`${location.pathname.startsWith(item.path)}`}>
                                            <img src={item.icon} style={{ marginRight: "5px" }} />
                                            <span>{item.name}</span>
                                        </Link>
                                    )
                                

                            )}
                        </li>
                    ))}
                    { /*  =====================================================*/}

                </ul>
            </div>
        </nav>
    </>);
}

export default Sidebar;