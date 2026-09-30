import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function RulesTable() {
    const [products, setProducts] = useState([]);
    return (
        <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
            <Column field="code" header="Nombre"></Column>
            <Column field="name" header="Estado"></Column>
        </DataTable>
    )
}

export default RulesTable;