import { useState } from "react";
import PageBase from "../../layout/PageBase/PageBase";

// Bootstrap 3 CDN deve ser adicionado no index.html:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/3.4.1/css/bootstrap.min.css"/>

const styles = `
  
  .pag-title { text-align:center; font-size:2.2rem; font-weight:700; color:#1a1a2e; letter-spacing:2px; }
  .pag-title-underline { width:80px; height:4px; background:#2196F3; margin:4px auto 18px; border-radius:2px; }
  .section-box { background:#fff; border:1px solid #d5dce8; border-radius:6px; margin-bottom:14px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.07); }
  .section-header { background:#e3edf9; padding:7px 12px; font-weight:700; font-size:12px; color:#1a3a6b; border-bottom:1px solid #c5d3ea; display:flex; justify-content:space-between; align-items:center; }
  .panel-blue { background:#2196F3; color:#fff; padding:6px 10px; font-weight:600; font-size:11px; text-align:center; }
  .info-row { padding:5px 12px; font-size:12px; border-bottom:1px solid #f2f2f2; }
  .info-row b { color:#1a3a6b; margin-right:4px; }
  .info-row span { color:#333; }
  .list-item { padding:7px 12px; cursor:pointer; border-bottom:1px solid #f0f0f0; font-size:12px; transition:background .15s; }
  .list-item:hover { background:#e3f2fd; }
  .list-item.active { background:#2196F3; color:#fff; }
  .scrollable { max-height:130px; overflow-y:auto; }
  .serv-btn { background:#2196F3; color:#fff; border:none; border-radius:4px; padding:5px 11px; font-size:11px; margin:3px; cursor:pointer; transition:background .15s; }
  .serv-btn:hover { background:#1565C0; }
  .aluno-table { width:100%; border-collapse:collapse; font-size:12px; }
  .aluno-table th { background:#e3edf9; color:#1a3a6b; padding:6px 8px; font-weight:700; border-bottom:2px solid #c5d3ea; white-space:nowrap; }
  .aluno-table td { padding:6px 8px; border-bottom:1px solid #eee; }
  .aluno-table tr.selected-row td { background:#2196F3; color:#fff; }
  .aluno-table tr:hover:not(.selected-row) td { background:#f0f7ff; cursor:pointer; }
  .pedido-table { width:100%; font-size:12px; border-collapse:collapse; }
  .pedido-table th { font-size:11px; color:#555; border-bottom:2px solid #ddd; padding:5px 6px; background:#f7f9fc; }
  .pedido-table td { padding:6px 6px; border-bottom:1px solid #f0f0f0; }
  .total-bar { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:#e8f4ff; border-top:2px solid #2196F3; }
  .total-label { font-weight:700; font-size:13px; color:#1a3a6b; }
  .total-val { font-weight:700; font-size:17px; color:#2196F3; }
  .btn-action { border:none; border-radius:50%; width:38px; height:38px; font-size:15px; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; transition:opacity .15s; }
  .btn-action:hover { opacity:.85; }
  .fato-box { background:#fffde7; border:1px solid #ffe082; border-radius:6px; padding:10px 14px; font-size:12px; margin-bottom:12px; }
  .fato-box b { color:#e65100; }
  .ref-badge { background:#2196F3; color:#fff; padding:3px 10px; border-radius:3px; font-size:12px; font-weight:600; }
  .search-wrap { display:flex; align-items:center; background:#fff; border:1px solid #ccc; border-radius:20px; padding:4px 12px; flex:1; }
  .search-wrap input { border:none; outline:none; font-size:12px; flex:1; background:transparent; }
  .rm-btn { background:#e53935; color:#fff; border:none; border-radius:50%; width:19px; height:19px; font-size:12px; cursor:pointer; line-height:1; }
  ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-thumb { background:#90caf9; border-radius:4px; }
  .form-control-sm { height:26px !important; padding:2px 6px !important; font-size:12px !important; }
`;

const ALUNOS = [
  { id: 1, nome: "Aldair Dala Gunza", sexo: "Masculino", contacto: "946127123/929211010", encarregado: "Francisco Gunza" },
  { id: 2, nome: "Amado Josué Mateus Ezequiel", sexo: "Masculino", contacto: "923974929", encarregado: "Alirio Marinho Ezequiel" },
  { id: 3, nome: "Anabela Eliandra Tavares Kizua", sexo: "Feminino", contacto: "923490075", encarregado: "Alfredo Emilio Ernesto Kizua" },
  { id: 4, nome: "Andreia Mariela Luvualo André", sexo: "Feminino", contacto: "926871288", encarregado: "Thierry Dilson André" },
];
const MENSALIDADES = ["Setembro", "Outubro", "Novembro", "Dezembro", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"];
const OUTROS = ["Confirmação", "Prova 1º trimestre", "PASSEIO AO CFL", "Multa", "Matrícula", "Seguro Escolar"];
const SERVICOS = ["Folha de prova", "Transporte Sequele", "Matrícula Transporte", "Fato Completo", "Multa Transporte"];

export default function Payment() {
  const [alunoSel, setAlunoSel] = useState(ALUNOS[1]);
  const [search, setSearch] = useState("");
  const [mensalSel, setMensalSel] = useState("Setembro");
  const [outroSel, setOutroSel] = useState("Confirmação");
  const [pedidos, setPedidos] = useState([
    { natureza: "Fato Completo", referente: "Uniforme/Fatc", preco: 17000, qtd: 1 },
  ]);
  const [formaPag, setFormaPag] = useState("Banco");
  const [banco, setBanco] = useState("BIC PROPIN");
  const [operacao, setOperacao] = useState("Depósito");
  const [nDeposito, setNDeposito] = useState("17000");
  const [tipoPapel, setTipoPapel] = useState("A4");
  const [anoLectivo, setAnoLectivo] = useState("2024/2025");

  const total = pedidos.reduce((s, p) => s + p.preco * p.qtd, 0);
  const filtrados = ALUNOS.filter(a =>
    a.nome.toLowerCase().includes(search.toLowerCase())
  );

  const removerPedido = idx => setPedidos(pedidos.filter((_, i) => i !== idx));

  const fmt = n => n.toLocaleString("pt-BR") + ",00";

  return (
    <>

      <PageBase title="Pagamentos">
        <style>{styles}</style>
        <div className="container-fluid" style={{}}>

          {/* Título */}



          {/* ===== COLUNA ESQUERDA ===== */}
          <div className="col-xs-12 col-md-8">
            <div className="row">

              {/* Dados Pessoais */}
              <div class="row">
                <div class="col-lg-6">
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      Default Panel
                    </div>
                    <div class="panel-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                    </div>

                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="panel panel-primary">
                    <div class="panel-heading">
                      Primary Panel
                    </div>
                    <div class="panel-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="panel panel-success">
                    <div class="panel-heading">
                      Success Panel
                    </div>
                    <div class="panel-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="section-box">
                  <div className="section-header">Dados Pessoais/Académicos</div>
                  {[
                    ["Aluno nº:", alunoSel?.id],
                    ["Nome:", alunoSel?.nome],
                    ["Curso:", "Sem Opção"],
                    ["Turma:", "4M/A/4ª Classe-Manhã"],
                    ["Ano:", anoLectivo],
                  ].map(([l, v]) => (
                    <div className="info-row" key={l}>
                      <b>{l}</b><span style={{ fontSize: 11 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mensalidades */}
              <div className="col-xs-6 col-sm-4">
                <div className="section-box">
                  <div className="panel-blue">Mensalidades</div>
                  <div>
                    <div className="scrollable">
                      {MENSALIDADES.map(m => (
                        <div key={m} className={`list-item ${mensalSel === m ? "active" : ""}`} onClick={() => setMensalSel(m)}>{m}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Outros Pagamentos */}
              <div className="col-xs-6 col-sm-4">
                <div className="section-box">
                  <div className="panel-blue">Outros Pagamentos</div>
                  <div style={{ padding: 4 }}>
                    <div className="scrollable">
                      {OUTROS.map(o => (
                        <div key={o} className={`list-item ${outroSel === o ? "active" : ""}`} onClick={() => setOutroSel(o)}>{o}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fato Completo */}
            <div className="fato-box">
              <b>Fato Completo</b>
              <div style={{ display: "flex", gap: 20, marginTop: 6, flexWrap: "wrap", alignItems: "center" }}>
                <span>Custo: <b>17.000,00 kz</b></span>
                <span>ISE-0,00(%)</span>
                <span>Stock: 21</span>
                <input type="number" defaultValue="1" className="form-control form-control-sm" style={{ width: 55, display: "inline-block" }} />
              </div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontWeight: 600 }}>Referente</span>
                <span className="ref-badge">Uniforme/Fato ▾</span>
                <button style={{ background: "none", border: "none", color: "#2196F3", fontSize: 20, cursor: "pointer", fontWeight: 700 }}>✓</button>
              </div>
            </div>

            {/* Serviços */}
            <div className="section-box">
              <div className="section-header">
                <span>Serviços</span>
                <span style={{ fontSize: 18, cursor: "pointer" }}>⚙</span>
              </div>
              <div style={{ padding: 8, display: "flex", flexWrap: "wrap" }}>
                {SERVICOS.map(s => <button key={s} className="serv-btn">{s}</button>)}
              </div>
            </div>

            {/* Barra busca + datas */}
            <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
              <div className="search-wrap">
                <span style={{ color: "#888", marginRight: 6 }}>🔍</span>
                <input placeholder="Buscar Aluno..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <label style={{ margin: 0, fontSize: 12 }}>Data</label>
                <select className="form-control form-control-sm" defaultValue="09/04/2026">
                  <option>09/04/2026</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <label style={{ margin: 0, fontSize: 12 }}>Ano lectivo</label>
                <select className="form-control form-control-sm" value={anoLectivo} onChange={e => setAnoLectivo(e.target.value)}>
                  <option>2024/2025</option>
                  <option>2025/2026</option>
                </select>
              </div>
            </div>

            {/* Tabela Alunos */}
            <div className="section-box">
              <div style={{ overflowX: "auto", maxHeight: 200, overflowY: "auto" }}>
                <table className="aluno-table">
                  <thead>
                    <tr><th>ID</th><th>Nome</th><th>SEXO</th><th>CONTACTO</th><th>ENCARREGADO</th></tr>
                  </thead>
                  <tbody>
                    {filtrados.map(a => (
                      <tr key={a.id} className={alunoSel?.id === a.id ? "selected-row" : ""} onClick={() => setAlunoSel(a)}>
                        <td>{a.id}</td><td>{a.nome}</td><td>{a.sexo}</td><td>{a.contacto}</td><td>{a.encarregado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ===== COLUNA DIREITA: PEDIDOS ===== */}
          <div className="col-xs-12 col-md-4">
            <div className="section-box">
              <div className="section-header" style={{ justifyContent: "center", fontSize: 14 }}>Pedidos</div>

              <div style={{ padding: "8px 6px", minHeight: 80 }}>
                <table className="pedido-table">
                  <thead>
                    <tr>
                      <th>NATUREZA</th><th>REFERENTE</th><th>PREÇO</th><th>QTD</th><th>TOT.(IVA)</th><th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((p, i) => (
                      <tr key={i}>
                        <td>{p.natureza}</td>
                        <td>{p.referente}</td>
                        <td>{p.preco.toLocaleString()}</td>
                        <td>{p.qtd}</td>
                        <td>{fmt(p.preco * p.qtd)}</td>
                        <td>
                          <button className="rm-btn" onClick={() => removerPedido(i)}>×</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="total-bar">
                <span className="total-label">Total à pagar</span>
                <span className="total-val"> {fmt(total)} kz</span>
              </div>

              {/* Forma de Pagamento */}
              <div style={{ padding: "12px" }}>
                <div className="row" style={{ marginBottom: 10 }}>
                  <div className="col-xs-12" style={{ marginBottom: 8 }}>
                    <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 2 }}>Forma de pagamento</label>
                    <select className="form-control form-control-sm" value={formaPag} onChange={e => setFormaPag(e.target.value)}>
                      {["Banco", "Dinheiro", "Transferência"].map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="col-xs-12">
                    <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 2 }}>Banco / Operação</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      <select className="form-control form-control-sm" value={banco} onChange={e => setBanco(e.target.value)}>
                        {["BIC PROPIN", "BAI", "BFA", "Millennium"].map(b => <option key={b}>{b}</option>)}
                      </select>
                      <select className="form-control form-control-sm" value={operacao} onChange={e => setOperacao(e.target.value)}>
                        {["Depósito", "Transferência", "Cheque"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <label style={{ margin: 0, fontSize: 12, whiteSpace: "nowrap" }}>Nº de Depósito</label>
                  <input className="form-control form-control-sm" value={nDeposito} onChange={e => setNDeposito(e.target.value)} style={{ flex: 1 }} />
                </div>

                {/* Tipo de Papel */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: "1px solid #eee", marginBottom: 10 }}>
                  <span style={{ fontSize: 18 }} className="fa fa-print"></span>
                  <span style={{ fontWeight: 600, fontSize: 12 }}>Tipo de Papel</span>
                  {["A4", "Personalizado"].map(t => (
                    <label key={t} style={{ margin: 0, fontSize: 12, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                      <input type="radio" name="papel" value={t} checked={tipoPapel === t} onChange={() => setTipoPapel(t)} /> {t}
                    </label>
                  ))}
                </div>

                {/* Botões de Ação */}
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", paddingTop: 8, borderTop: "1px solid #eee" }}>
                  <button className="btn-action" style={{ background: "#2196F3", color: "#fff", fontSize: 22 }} title="Avançar">›</button>
                  <button className="btn-action" style={{ background: "#2196F3", color: "#fff" }} title="Duplicar">2×</button>
                  <button className="btn-action" style={{ background: "#2196F3", color: "#fff", fontSize: 16 }} title="Pagamento">💰</button>
                  <button className="btn-action" style={{ background: "#2196F3", color: "#fff", fontSize: 16 }} title="Recibo">📄</button>
                  <button className="btn-action" style={{ background: "#2196F3", color: "#fff", fontSize: 16 }} title="Limpar">🧹</button>
                  <button className="btn-action" style={{ background: "#2196F3", color: "#fff", fontSize: 18 }} title="Confirmar">✓</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </PageBase>
    </>
  );
}
