export default function StudentSearch({ search, setSearch }) {
    return (
        
            <input
                type="text"
                className="form-control form-control-lg mb-3"
                placeholder="Buscar Aluno..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />        

    )
}