import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Stepper from '../../ui/Stepper'
import StudentStap1 from '../../forms/StudentStep1'
import StudentStap2 from '../../forms/StudentStep2'
import StudentStap3 from '../../forms/StudentStep3'
import PageBase from '../../Layout/PageBase/PageBase'

import  InscricaoAlunoModal  from "./InscricaoAlunoModal";

export default function StudentForm() {
 
    const location = useLocation();
    

   const [aberto, setAberto] = useState(
    () => location.state?.abrirInscricao == true
  );


    return (        
        < div >
        <InscricaoAlunoModal
            isOpen={aberto}
            onClose={() => setAberto(false)}
            onFinalSubmit={(dados) => console.log(dados)}
        />
        </div >       
    )
}