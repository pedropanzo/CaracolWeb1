import iconProfile from "./../../../assets/img/profile_small.jpg";
import lockbar from "./../../../assets/img/locklogo.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth"
import backlock from './../../../assets/img/back/backlock.jpg';

import './lockscreen.css'

const estilo = {
    minHeight: '100vh',
    display: 'flex',

    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    fontFamily: "'Nunito', sans-serif",
    backgroundImage: `url(${backlock})`,
};

const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];


const LockScreen = () => {
    const [hora, setHora] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {
        const atualizar = () => {
            const agora = new Date();

            const h = String(agora.getHours()).padStart(2, '0');
            const m = String(agora.getMinutes()).padStart(2, '0');
            const s = String(agora.getSeconds()).padStart(2, '0');
            setHora(`${h}:${m}:${s}`);

            const dia = diasSemana[agora.getDay()];
            const num = agora.getDate();
            const mes = meses[agora.getMonth()];
            const ano = agora.getFullYear();
            setData(`${dia}, ${num} de ${mes} de ${ano}`);
        };

        atualizar();
        const interval = setInterval(atualizar, 1000);

        return () => clearInterval(interval);
    }, []);

    const { user } = useAuth()


    return (<div style={estilo}>

        <div className="row animated fadeInDown" >
            <div className="col-md-4">

            </div>
            <div className="col-md-4">
                <center>
                    <img className="logoBar text-center lockscreen animated fadeInDown" src={lockbar} alt="" />
                </center>

                <div className="middle-box text-center lockscreen animated fadeInDown" >
                    <div>
                        <div className="m-b-md">
                            <img alt="image" className="img-circle circle-border" src={iconProfile} />
                        </div>
                        <h3>{user?.name}</h3>
                        <p> ---</p>
                        <form className="m-t" role="form" action="">
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="******" required="" />
                            </div>
                            <button type="submit" className="btn btn-primary block full-width">Desbloquear</button>
                        </form>
                    </div>
                </div>

                <center>
                    <h1><strong>{hora}</strong> </h1>
                    <p>{data}</p>
                </center>
            </div>
            <div className="col-md-4" >

            </div>
        </div>
    </div>);
}

export default LockScreen;