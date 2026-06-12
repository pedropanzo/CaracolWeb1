import { Routes, Route } from 'react-router-dom'
import AppLayout from '../Layout/AppLayout'
import { PrivateRoute } from './PrivateRoute'
import AuthLayout from '../Layout/AuthLayout';     
import Login from '../pages/auth/Login';

import Dashboard from '../pages/dashboard/Dashboard';
import Dashboard1 from '../pages/dashboard/Dashboard1';
import Dashboard2 from '../pages/dashboard/Dashboard2';

import Message from '../pages/message/Message';

import StudentList from '../pages/students/StudentsList';
import StudentForm from '../pages/students/StudentForm';
import StudentsAcademico from '../pages/students/StudentsAcademico';
import StudentConfirm from '../pages/students/StudentConfirm';
import SuspensionPage from '../pages/students/SuspensionPage';
import StudentPage from '../pages/students/StudentPage';
import StudentDropOut from '../pages/students/StudentDropOut';
import Dopouts from '../pages/reports/student/PrintDropoutsStudent';
import SchoolForm from '../pages/school/SchoolForm';
import SchoolList from '../pages/school/SchoolList';
import AcademicYearPage from '../pages/academicYear/AcademicYear';
import DepartmentsList from '../pages/department/DepartmentsList';
import Services from '../pages/services/Services';
import NotFound from '../pages/notFound/NotFound';
import Register from '../pages/auth/register';
import Classes from '../pages/classes/Classes';
import Disciplina from '../pages/disciplina/DisciplinesPage';
import ServiceCostPage from '../pages/service-cost/ServiceCostPage'; 
import Grades from "../pages/grades/Grades";
import Banks from "../pages/banks/Banks";
import GradesEntry from "../pages/grades/GradesEntry";
import NominalList from '../pages/reports/student/NominalList';
import Profile from "../pages/user/Profile/Profile";
import Settings from "../pages/user/Settings/Settings";
import Lockscreen from "../pages/lockscreen/Lockscreen";
import AccumulatedValuesPage from "../pages/reports/accumulatedValues/AccumulatedValuesPage";
import Payment from '../pages/payment/Payment';
import StudentStatus from "../pages/student/StudentStatus";
import PrintSuspendedStudents from "../pages/student/PrintSuspendedStudents";
import PrintDropoutsStudent from '../pages/reports/student/PrintDropoutsStudent';
import SuspendedStudentsPrint from "../pages/reports/student/SuspendedStudentsPrint";
import TeachersReport from '../pages/reports/TeachersReport';
import EmployeesPrint from '../pages/reports/employee/EmployeesPrint';
import ClassHistoryReport from '../pages/reports/class/ClassHistoryReport';
import ServiceCostHistoryPage from "../pages/reports/ServiceCostHistoryPage";
import TurmasReportPage from "../pages/reports/TurmasReportPage";


export default function AppRoutes() {
  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

             
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />          
          <Route path="/dashboard/dashboard1" element={<Dashboard1 />} />
          <Route path="/dashboard/dashboard2" element={<Dashboard2 />} />

          <Route path="/message/Message" element={<Message />} />

          <Route path="/alunos" element={<StudentList />} />
          <Route path="/alunos/novo" element={<StudentForm />} />
          <Route path="/alunos/confirmacao" element={<StudentConfirm />} /> 
          <Route path="/alunos/index" element={<StudentsAcademico />} /> 
          <Route path="/alunos/dados-pessoal" element={<StudentPage />} />
          <Route path="/alunos/desistente" element={<StudentDropOut />} />
          <Route path='/alunos/suspensao' element={<SuspensionPage />} />


          <Route path="/escolas/nova" element={<SchoolForm />} />
          <Route path="/escolas" element={<SchoolList />} />

          <Route path="/ano-lectivo" element={<AcademicYearPage />} />
          <Route path="/departamentos" element={<DepartmentsList />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/Classe" element={<Classes />} />
          <Route path='/Disciplina' element={<Disciplina />} />
          <Route path='/custo-servico' element={<ServiceCostPage />} />
          <Route path='/lancamento-notas' element={<Grades />} />
          <Route path='/Banco' element={<Banks />} />
          <Route path='/notas-implantadas' element={<GradesEntry />} />
          <Route path='/Imp-lista-nominal-alunos' element={<NominalList />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path='/Acumulados' element={<AccumulatedValuesPage />} />
          <Route path="/pagamento" element={<Payment />} />
          <Route path="/transicaodeclasse" element={<StudentStatus/>} />
          <Route path="/Imp-pedagogica" element={<PrintSuspendedStudents/>} />
          <Route path="/Imp-lista-desistente-alunos" element={<PrintDropoutsStudent/>} />
          <Route path="/Imp-professores" element={<TeachersReport/>} />
          <Route path="/Imp-historico-custos" element={<ServiceCostHistoryPage/>} />
          <Route path="/Imp-historico-de-turmas-criadas" element={<TurmasReportPage/> } />
      
        </Route>
      </Route>

      <Route path="/lockscreen" element={<Lockscreen />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}
