export default function SearchBar({search,setSearch}){

return(

<div className="input-group my-3" style={{ padding: "10px 0", width: "100%" }}>
    <input
        type="search"
        className="form-control"
        placeholder="Buscar por nome ou número do aluno..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Buscar aluno nos valores acumulados"
    />
</div>

)

}