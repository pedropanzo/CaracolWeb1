export default function ReportHeader() {
    return (
        <div className="mb-3" style={{ padding: '10px 0' }}>
            <button type="button" className="btn btn-primary" onClick={() => window.print()}>Imprimir relatório</button>{' '}
            <button type="button" className="btn btn-default" onClick={() => window.print()}>Imprimir 2ª via</button>
        </div>
    )
}