import { useMemo, useState } from "react";
import PageBase from "@/layout/PageBase/PageBase";
import { banksMock } from "../banks/banksMock";

const ALUNOS = [
  { id: 1, nome: "Aldair Dala Gunza", sexo: "Masculino", contacto: "946127123 / 929211010", encarregado: "Francisco Gunza", turma: "4.ª Classe · Manhã" },
  { id: 2, nome: "Amado Josué Mateus Ezequiel", sexo: "Masculino", contacto: "923974929", encarregado: "Alirio Marinho Ezequiel", turma: "4.ª Classe · Manhã" },
  { id: 3, nome: "Anabela Eliandra Tavares Kizua", sexo: "Feminino", contacto: "923490075", encarregado: "Alfredo Emilio Ernesto Kizua", turma: "5.ª Classe · Tarde" },
  { id: 4, nome: "Andreia Mariela Luvualo André", sexo: "Feminino", contacto: "926871288", encarregado: "Thierry Dilson André", turma: "6.ª Classe · Manhã" },
];

const MENSALIDADES = ["Setembro", "Outubro", "Novembro", "Dezembro", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"];
const OUTROS = ["Confirmação", "Prova 1.º trimestre", "Passeio escolar", "Multa", "Matrícula", "Seguro escolar"];
const SERVICOS = ["Folha de prova", "Transporte Sequele", "Matrícula transporte", "Fato completo", "Multa transporte"];
const PRECO_MENSALIDADE = 15000;
const PRECOS_OUTROS = [5000, 2500, 8000, 1000, 12000, 3000];
const PRECOS_SERVICOS = [500, 10000, 15000, 17000, 2000];
const METHODS = ["Banco", "Transferência", "Dinheiro"];
const ACTIVE_BANKS = banksMock.filter((bank) => bank.estado === "Activo");
const INITIAL_PAYMENT_DATE = "2026-10-22";

const formatMoney = (amount) => `${new Intl.NumberFormat("pt-AO").format(amount)},00 Kz`;

const STYLES = `
  .payment-page { --payment-blue: #1769aa; --payment-ink: #243447; --payment-muted: #718096; --payment-border: #e3eaf1; color: var(--payment-ink); }
  .payment-page * { box-sizing: border-box; }
  .payment-page .payment-intro { display:flex; justify-content:space-between; align-items:center; gap:16px; margin:0 0 18px; }
  .payment-page .payment-intro h3 { margin:0 0 5px; color:#26384a; font-size:20px; font-weight:700; }
  .payment-page .payment-intro p { margin:0; color:var(--payment-muted); font-size:13px; }
  .payment-page .payment-date { color:#526579; font-size:12px; white-space:nowrap; }
  .payment-page .payment-grid { display:grid; grid-template-columns:minmax(0, 1.6fr) minmax(340px, .9fr); gap:20px; align-items:start; }
  .payment-page .payment-main, .payment-page .payment-aside { min-width:0; }
  .payment-page .payment-panel { background:#fff; border:1px solid var(--payment-border); border-radius:10px; margin-bottom:16px; box-shadow:0 3px 12px rgba(31,55,78,.045); overflow:hidden; }
  .payment-page .payment-panel-head { padding:15px 18px; border-bottom:1px solid #edf1f5; display:flex; justify-content:space-between; align-items:center; gap:12px; }
  .payment-page .payment-panel-head h4 { margin:0; font-size:14px; font-weight:700; color:#26384a; }
  .payment-page .payment-panel-head p { margin:4px 0 0; color:var(--payment-muted); font-size:12px; }
  .payment-page .payment-panel-body { padding:16px 18px; }
  .payment-page .payment-label { display:block; margin-bottom:6px; color:#46586b; font-size:12px; font-weight:700; }
  .payment-page .payment-control { height:40px !important; padding:8px 11px !important; border:1px solid #d6e0e9 !important; border-radius:6px !important; box-shadow:none !important; font-size:13px !important; }
  .payment-page .payment-control:focus { border-color:#4b9bd4 !important; box-shadow:0 0 0 3px rgba(23,105,170,.12) !important; }
  .payment-page .student-search { position:relative; margin-bottom:12px; }
  .payment-page .student-search .payment-control { padding-left:36px !important; }
  .payment-page .search-icon { position:absolute; left:12px; top:11px; color:#8293a5; font-size:15px; z-index:2; }
  .payment-page .student-list { display:grid; gap:8px; max-height:250px; overflow:auto; }
  .payment-page .student-option { display:flex; align-items:center; gap:11px; width:100%; padding:10px 12px; border:1px solid #e5ebf1; border-radius:7px; background:#fff; color:inherit; text-align:left; transition:border-color .15s, background .15s, box-shadow .15s; }
  .payment-page .student-option:hover { border-color:#91bad8; background:#f8fbfe; }
  .payment-page .student-option:focus-visible, .payment-page .concept-button:focus-visible, .payment-page .payment-action:focus-visible { outline:3px solid rgba(23,105,170,.25); outline-offset:2px; }
  .payment-page .student-option.selected { border-color:#3987bd; background:#f0f7fc; box-shadow:inset 3px 0 #3987bd; }
  .payment-page .student-avatar { flex:0 0 36px; height:36px; display:grid; place-items:center; border-radius:50%; background:#eaf2f9; color:#276c9f; font-size:12px; font-weight:700; }
  .payment-page .student-copy { min-width:0; flex:1; }
  .payment-page .student-copy strong { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:13px; }
  .payment-page .student-copy small { display:block; margin-top:3px; color:var(--payment-muted); font-size:11px; }
  .payment-page .student-check { color:#1769aa; font-size:16px; }
  .payment-page .selected-student { display:flex; align-items:center; gap:12px; padding:12px; background:#f5f9fc; border:1px solid #e5edf4; border-radius:8px; margin-bottom:14px; }
  .payment-page .selected-student strong { display:block; font-size:13px; }
  .payment-page .selected-student small { display:block; margin-top:3px; color:var(--payment-muted); font-size:11px; }
  .payment-page .concept-tabs { display:flex; gap:7px; overflow-x:auto; padding:0 18px; border-bottom:1px solid #edf1f5; }
  .payment-page .concept-tab { flex:0 0 auto; padding:12px 10px; border:0; border-bottom:2px solid transparent; background:transparent; color:#708195; font-size:12px; font-weight:600; }
  .payment-page .concept-tab.active { border-bottom-color:#287eb7; color:#1769aa; }
  .payment-page .concept-list { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:9px; }
  .payment-page .concept-button { display:flex; justify-content:space-between; align-items:center; gap:8px; min-height:48px; width:100%; padding:10px 12px; border:1px solid #e2eaf1; border-radius:7px; background:#fff; color:#33485d; text-align:left; transition:border-color .15s, background .15s, transform .15s; }
  .payment-page .concept-button:hover { transform:translateY(-1px); border-color:#79a9cc; background:#f8fbfe; }
  .payment-page .concept-name { font-size:12px; font-weight:600; }
  .payment-page .concept-price { color:#1769aa; font-size:11px; white-space:nowrap; }
  .payment-page .quantity-row { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px; background:#f8fafc; border:1px solid #e8edf2; border-radius:7px; margin-top:12px; }
  .payment-page .quantity-row label { margin:0; color:#526579; font-size:12px; font-weight:600; }
  .payment-page .quantity-control { display:flex; align-items:center; gap:5px; }
  .payment-page .quantity-control input { width:64px; height:34px; border:1px solid #d6e0e9; border-radius:5px; text-align:center; }
  .payment-page .empty-state { padding:26px 12px; text-align:center; color:#77889a; font-size:12px; }
  .payment-page .empty-state .fa { display:block; margin-bottom:8px; color:#a5b5c4; font-size:22px; }
  .payment-page .order-list { max-height:340px; overflow:auto; }
  .payment-page .order-item { display:grid; grid-template-columns:minmax(0, 1fr) auto; gap:10px; padding:13px 18px; border-bottom:1px solid #edf1f5; }
  .payment-page .order-item strong { display:block; color:#34495e; font-size:12px; }
  .payment-page .order-item small { display:block; margin-top:4px; color:var(--payment-muted); font-size:11px; }
  .payment-page .order-item-actions { display:flex; align-items:center; gap:7px; }
  .payment-page .order-quantity { width:40px; height:30px; border:1px solid #d6e0e9; border-radius:5px; text-align:center; font-size:12px; }
  .payment-page .remove-item { border:0; background:transparent; color:#b24a4a; padding:5px; }
  .payment-page .order-total { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:16px 18px; background:#f2f8fc; border-top:1px solid #e1ecf4; }
  .payment-page .order-total span { color:#526579; font-size:13px; font-weight:600; }
  .payment-page .order-total strong { color:#1769aa; font-size:20px; }
  .payment-page .payment-methods { display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:7px; }
  .payment-page .method-option { position:relative; }
  .payment-page .method-option input { position:absolute; opacity:0; }
  .payment-page .method-option span { display:flex; align-items:center; justify-content:center; gap:6px; min-height:38px; padding:7px; border:1px solid #dfe7ee; border-radius:6px; color:#637589; font-size:11px; cursor:pointer; }
  .payment-page .method-option input:checked + span { border-color:#3987bd; background:#f0f7fc; color:#1769aa; font-weight:700; }
  .payment-page .method-option input:focus-visible + span { outline:3px solid rgba(23,105,170,.2); }
  .payment-page .payment-fields { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:14px; }
  .payment-page .payment-field-full { grid-column:1 / -1; }
  .payment-page .payment-help { margin:5px 0 0; color:#8392a1; font-size:11px; }
  .payment-page .receipt-choice { display:flex; align-items:center; gap:14px; margin:15px 0 0; padding-top:13px; border-top:1px solid #edf1f5; }
  .payment-page .receipt-choice span { color:#526579; font-size:12px; font-weight:600; }
  .payment-page .receipt-choice label { display:flex; align-items:center; gap:5px; margin:0; color:#637589; font-size:12px; font-weight:400; cursor:pointer; }
  .payment-page .payment-actions { display:grid; gap:8px; padding:15px 18px 18px; }
  .payment-page .payment-action { min-height:42px; border-radius:6px; font-size:13px; font-weight:700; }
  .payment-page .payment-action-primary { border:1px solid #1769aa; background:#1769aa; color:#fff; }
  .payment-page .payment-action-primary:hover:not(:disabled) { background:#12578e; }
  .payment-page .payment-action-primary:disabled { border-color:#b9c7d3; background:#b9c7d3; color:#fff; cursor:not-allowed; }
  .payment-page .payment-action-secondary { border:1px solid #dbe4ec; background:#fff; color:#526579; }
  .payment-page .payment-feedback { margin:0 18px 14px; padding:10px 12px; border-radius:6px; font-size:12px; }
  .payment-page .payment-feedback.error { border:1px solid #f1c5c5; background:#fff5f5; color:#9b3939; }
  .payment-page .payment-feedback.success { border:1px solid #bfe4d6; background:#f1fbf6; color:#267653; }
  .payment-page .payment-footnote { margin:0 0 5px; color:#8996a3; font-size:11px; }
  @media (max-width: 991px) { .payment-page .payment-grid { grid-template-columns:minmax(0, 1fr); } .payment-page .payment-aside { display:grid; grid-template-columns:1fr 1fr; gap:14px; align-items:start; } .payment-page .payment-aside .payment-panel { margin-bottom:0; } }
  @media (max-width: 640px) { .payment-page .payment-intro { align-items:flex-start; flex-direction:column; } .payment-page .payment-aside { display:block; } .payment-page .payment-aside .payment-panel { margin-bottom:14px; } .payment-page .payment-panel-head, .payment-page .payment-panel-body { padding-left:13px; padding-right:13px; } .payment-page .concept-list { grid-template-columns:1fr; } .payment-page .payment-fields { grid-template-columns:1fr; } .payment-page .payment-field-full { grid-column:auto; } }
`;

export default function Payment() {
  const [alunoSel, setAlunoSel] = useState(ALUNOS[1]);
  const [search, setSearch] = useState("");
  const [anoLectivo, setAnoLectivo] = useState("2026/2027");
  const [categoria, setCategoria] = useState("Mensalidades");
  const [quantidadeFato, setQuantidadeFato] = useState(1);
  const [pedidos, setPedidos] = useState([]);
  const [formaPag, setFormaPag] = useState("Banco");
  const [banco, setBanco] = useState(ACTIVE_BANKS[0]?.banco ?? "");
  const [operacao, setOperacao] = useState("Depósito");
  const [nDeposito, setNDeposito] = useState("");
  const [dataPagamento, setDataPagamento] = useState(INITIAL_PAYMENT_DATE);
  const [tipoPapel, setTipoPapel] = useState("A4");
  const [feedback, setFeedback] = useState(null);

  const total = pedidos.reduce((sum, pedido) => sum + pedido.preco * pedido.qtd, 0);
  const filtrados = useMemo(() => ALUNOS.filter((aluno) =>
    `${aluno.nome} ${aluno.id}`.toLowerCase().includes(search.trim().toLowerCase())
  ), [search]);

  const adicionarPedido = (pedido) => {
    setPedidos((atuais) => {
      const existente = atuais.find((item) => item.natureza === pedido.natureza && item.referente === pedido.referente);
      if (existente) {
        return atuais.map((item) => item === existente ? { ...item, qtd: item.qtd + (pedido.qtd || 1) } : item);
      }
      return [...atuais, { ...pedido, qtd: pedido.qtd || 1 }];
    });
    setFeedback(null);
  };

  const adicionarQuantidade = (pedido, quantidade) => {
    setPedidos((atuais) => atuais.map((item) => item === pedido ? { ...item, qtd: Math.max(1, quantidade || 1) } : item));
  };

  const removerPedido = (pedido) => setPedidos((atuais) => atuais.filter((item) => item !== pedido));

  const concepts = categoria === "Mensalidades"
    ? MENSALIDADES.map((name) => ({ name, nature: "Mensalidade", price: PRECO_MENSALIDADE }))
    : categoria === "Outros pagamentos"
      ? OUTROS.map((name, index) => ({ name, nature: name, price: PRECOS_OUTROS[index] }))
      : SERVICOS.map((name, index) => ({ name, nature: name, price: PRECOS_SERVICOS[index] }));

  const concluirPagamento = (event) => {
    event.preventDefault();
    if (!alunoSel || pedidos.length === 0) {
      setFeedback({ type: "error", text: "Selecione um aluno e adicione pelo menos uma cobrança ao pedido." });
      return;
    }
    if (formaPag !== "Dinheiro" && !nDeposito.trim()) {
      setFeedback({ type: "error", text: "Informe o número do depósito ou da operação para continuar." });
      return;
    }
    if (formaPag !== "Dinheiro" && !banco) {
      setFeedback({ type: "error", text: "Não há um banco ativo selecionado. Cadastre ou ative uma conta bancária." });
      return;
    }
    setFeedback({ type: "success", text: `Pagamento demonstrativo de ${formatMoney(total)} confirmado para ${alunoSel.nome}.` });
    setPedidos([]);
    setNDeposito("");
  };

  return (
    <PageBase title="Pagamentos">
      <style>{STYLES}</style>
      <div className="payment-page">
        <div className="payment-intro">
          <div>
            <h3>Registar pagamento</h3>
            <p>Selecione o aluno, adicione os itens e confirme o pagamento.</p>
          </div>
          <div className="payment-date"><i className="fa fa-calendar" aria-hidden="true" /> &nbsp; Documento de demonstração</div>
        </div>

        <form onSubmit={concluirPagamento}>
          <div className="payment-grid">
            <main className="payment-main">
              <section className="payment-panel" aria-labelledby="student-section-title">
                <div className="payment-panel-head">
                  <div>
                    <h4 id="student-section-title">1. Selecionar aluno</h4>
                    <p>Pesquise por nome ou número de matrícula.</p>
                  </div>
                  <span className="label label-primary">DADOS DEMONSTRATIVOS</span>
                </div>
                <div className="payment-panel-body">
                  {alunoSel && (
                    <div className="selected-student">
                      <span className="student-avatar" aria-hidden="true">{alunoSel.nome.split(" ").slice(0, 2).map((name) => name[0]).join("")}</span>
                      <div>
                        <strong>{alunoSel.nome}</strong>
                        <small>Matrícula #{alunoSel.id} &nbsp;·&nbsp; {alunoSel.turma} &nbsp;·&nbsp; Ano lectivo {anoLectivo}</small>
                      </div>
                    </div>
                  )}
                  <label htmlFor="payment-student-search" className="payment-label">Encontrar outro aluno</label>
                  <div className="student-search">
                    <i className="fa fa-search search-icon" aria-hidden="true" />
                    <input id="payment-student-search" className="form-control payment-control" type="search" placeholder="Nome ou número do aluno..." value={search} onChange={(event) => setSearch(event.target.value)} />
                  </div>
                  {search && (
                    <div className="student-list" role="listbox" aria-label="Resultados da pesquisa de alunos">
                      {filtrados.map((aluno) => (
                        <button type="button" role="option" aria-selected={alunoSel?.id === aluno.id} key={aluno.id} className={`student-option ${alunoSel?.id === aluno.id ? "selected" : ""}`} onClick={() => { setAlunoSel(aluno); setSearch(""); setFeedback(null); }}>
                          <span className="student-avatar" aria-hidden="true">{aluno.nome.split(" ").slice(0, 2).map((name) => name[0]).join("")}</span>
                          <span className="student-copy"><strong>{aluno.nome}</strong><small>#{aluno.id} · {aluno.turma} · {aluno.contacto}</small></span>
                          {alunoSel?.id === aluno.id && <i className="fa fa-check student-check" aria-label="Aluno selecionado" />}
                        </button>
                      ))}
                      {!filtrados.length && <div className="empty-state">Nenhum aluno encontrado com esses dados.</div>}
                    </div>
                  )}
                </div>
              </section>

              <section className="payment-panel" aria-labelledby="items-section-title">
                <div className="payment-panel-head">
                  <div>
                    <h4 id="items-section-title">2. Adicionar cobranças</h4>
                    <p>Escolha uma categoria e adicione os itens ao pedido.</p>
                  </div>
                  <span className="text-muted">{pedidos.reduce((sum, item) => sum + item.qtd, 0)} item(ns)</span>
                </div>
                <div className="concept-tabs" role="tablist" aria-label="Categorias de cobrança">
                  {["Mensalidades", "Outros pagamentos", "Serviços"].map((tab) => (
                    <button type="button" role="tab" aria-selected={categoria === tab} key={tab} className={`concept-tab ${categoria === tab ? "active" : ""}`} onClick={() => setCategoria(tab)}>{tab}</button>
                  ))}
                </div>
                <div className="payment-panel-body">
                  <div className="concept-list">
                    {concepts.map((concept) => (
                      <button type="button" key={concept.name} className="concept-button" onClick={() => adicionarPedido({ natureza: concept.nature, referente: categoria === "Mensalidades" ? `${concept.name} · ${anoLectivo}` : concept.name, preco: concept.price })}>
                        <span className="concept-name">{concept.name}</span>
                        <span className="concept-price">{formatMoney(concept.price)} <i className="fa fa-plus-circle" aria-hidden="true" /></span>
                      </button>
                    ))}
                  </div>
                  {categoria === "Serviços" && (
                    <div className="quantity-row">
                      <label htmlFor="uniform-quantity">Quantidade de fatos completos</label>
                      <div className="quantity-control">
                        <input id="uniform-quantity" type="number" min="1" value={quantidadeFato} onChange={(event) => setQuantidadeFato(Math.max(1, Number(event.target.value)))} />
                        <button type="button" className="btn btn-default btn-sm" onClick={() => adicionarPedido({ natureza: "Fato completo", referente: "Uniforme/Fato", preco: PRECOS_SERVICOS[3], qtd: quantidadeFato })}><i className="fa fa-plus" aria-hidden="true" /> Adicionar uniforme</button>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </main>

            <aside className="payment-aside">
              <section className="payment-panel" aria-labelledby="order-section-title">
                <div className="payment-panel-head">
                  <div>
                    <h4 id="order-section-title">3. Resumo do pedido</h4>
                    <p>Confira os itens antes de finalizar.</p>
                  </div>
                  {pedidos.length > 0 && <button type="button" className="btn btn-link btn-xs" onClick={() => { setPedidos([]); setFeedback(null); }}>Limpar</button>}
                </div>
                {pedidos.length ? (
                  <div className="order-list">
                    {pedidos.map((pedido, index) => (
                      <div className="order-item" key={`${pedido.natureza}-${pedido.referente}-${index}`}>
                        <div>
                          <strong>{pedido.natureza}</strong>
                          <small>{pedido.referente} · {formatMoney(pedido.preco)} cada</small>
                          <small><b>{formatMoney(pedido.preco * pedido.qtd)}</b></small>
                        </div>
                        <div className="order-item-actions">
                          <label className="sr-only" htmlFor={`order-quantity-${index}`}>Quantidade de {pedido.natureza}</label>
                          <input id={`order-quantity-${index}`} className="order-quantity" type="number" min="1" value={pedido.qtd} onChange={(event) => adicionarQuantidade(pedido, Number(event.target.value))} />
                          <button type="button" className="remove-item" aria-label={`Remover ${pedido.natureza}`} onClick={() => removerPedido(pedido)}><i className="fa fa-trash" aria-hidden="true" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state"><i className="fa fa-shopping-basket" aria-hidden="true" />O pedido está vazio.<br />Adicione mensalidades, serviços ou outras cobranças.</div>
                )}
                <div className="order-total"><span>Total a pagar</span><strong>{formatMoney(total)}</strong></div>
              </section>

              <section className="payment-panel" aria-labelledby="payment-details-title">
                <div className="payment-panel-head">
                  <div>
                    <h4 id="payment-details-title">4. Dados do pagamento</h4>
                    <p>Informe como o valor foi recebido.</p>
                  </div>
                </div>
                <div className="payment-panel-body">
                  <label className="payment-label">Forma de pagamento</label>
                  <div className="payment-methods">
                    {METHODS.map((method) => (
                      <label className="method-option" key={method}>
                        <input type="radio" name="payment-method" value={method} checked={formaPag === method} onChange={() => { setFormaPag(method); setFeedback(null); }} />
                        <span><i className={`fa ${method === "Dinheiro" ? "fa-money" : method === "Transferência" ? "fa-exchange" : "fa-bank"}`} aria-hidden="true" /> {method}</span>
                      </label>
                    ))}
                  </div>

                  <div className="payment-fields">
                    <div>
                      <label className="payment-label" htmlFor="payment-date">Data</label>
                      <input id="payment-date" type="date" className="form-control payment-control" value={dataPagamento} onChange={(event) => setDataPagamento(event.target.value)} required />
                    </div>
                    <div>
                      <label className="payment-label" htmlFor="payment-school-year">Ano lectivo</label>
                      <select id="payment-school-year" className="form-control payment-control" value={anoLectivo} onChange={(event) => setAnoLectivo(event.target.value)}>
                        <option>2026/2027</option>
                        <option>2025/2026</option>
                        <option>2024/2025</option>
                      </select>
                    </div>
                    {formaPag !== "Dinheiro" && (
                      <>
                        <div>
                          <label className="payment-label" htmlFor="payment-bank">Conta bancária</label>
                          <select id="payment-bank" className="form-control payment-control" value={banco} onChange={(event) => setBanco(event.target.value)} required>
                            {!ACTIVE_BANKS.length && <option value="">Nenhuma conta ativa</option>}
                            {ACTIVE_BANKS.map((item) => <option key={item.id} value={item.banco}>{item.banco}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="payment-label" htmlFor="payment-operation">Tipo de operação</label>
                          <select id="payment-operation" className="form-control payment-control" value={operacao} onChange={(event) => setOperacao(event.target.value)}>
                            {["Depósito", "Transferência", "Cheque"].map((operation) => <option key={operation}>{operation}</option>)}
                          </select>
                        </div>
                        <div className="payment-field-full">
                          <label className="payment-label" htmlFor="payment-reference">N.º do depósito / referência</label>
                          <input id="payment-reference" className="form-control payment-control" value={nDeposito} onChange={(event) => setNDeposito(event.target.value)} placeholder="Introduza o número indicado no comprovativo" required />
                          <p className="payment-help">Use a referência que aparece no comprovativo bancário.</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="receipt-choice">
                    <span>Formato do recibo</span>
                    {["A4", "Personalizado"].map((format) => (
                      <label key={format}><input type="radio" name="paper-type" value={format} checked={tipoPapel === format} onChange={() => setTipoPapel(format)} /> {format}</label>
                    ))}
                  </div>
                </div>
                {feedback && <div className={`payment-feedback ${feedback.type}`} role={feedback.type === "error" ? "alert" : "status"}>{feedback.text}</div>}
                <div className="payment-actions">
                  <button type="submit" className="payment-action payment-action-primary" disabled={!pedidos.length}>
                    <i className="fa fa-check" aria-hidden="true" /> &nbsp; Confirmar pagamento · {formatMoney(total)}
                  </button>
                  <button type="button" className="payment-action payment-action-secondary" onClick={() => window.print()}><i className="fa fa-print" aria-hidden="true" /> &nbsp; Imprimir recibo</button>
                </div>
              </section>
              <p className="payment-footnote">Os registos e valores apresentados são demonstrativos.</p>
            </aside>
          </div>
        </form>
      </div>
    </PageBase>
  );
}
