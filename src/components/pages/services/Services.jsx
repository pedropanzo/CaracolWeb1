import { useState } from "react";
import ServiceForm from "./ServiceForm";
import { mockServices, mockReferences } from "./mockServices";
import ServiceTable from "./ServiceTable";
import ReferenceForm from "./ReferenceForm";
import ReferenceTable from "./ReferenceTable";
import PageBase from "@/layout/PageBase/PageBase";

export default function Services() {
    const [services, setServices] = useState(mockServices);
    const [references, setReferences] = useState(mockReferences);
    const [editingService, setEditingService] = useState(null);
    const [editingReference, setEditingReference] = useState(null);

    const addService = (service) => {
        setServices([...services, { id: Date.now(), ...service }]);
    };
    const editService = (service) => {
        setEditingService(service);
    }
    const deleteService = (id) => {
        setServices(services.filter(service => service.id !== id));
    };

    const addReference = (reference) => {
        setReferences([...references, { id: Date.now(), ...reference }]);
    };
    const editReference = (reference) => {
        setEditingReference(reference);
    }
    const deleteReference = (id) => {
        setReferences(references.filter(reference => reference.id !== id));
    };

    return (
        <PageBase title="Serviços">
            <div className="container mt-4">
                <div className="row">
                    {/* Serviços */}
                    <div className="col-md-6">
                        <h5>Serviços</h5>
                        <ServiceForm onAdd={addService} />
                        <ServiceTable services={services} onDelete={deleteService} onEdit={editService} />
                    </div>
                    {/* Referências */}
                    <div className="col-md-6">
                        <h5 >Referências</h5>
                        <ReferenceForm onAdd={addReference} />
                        <ReferenceTable references={references} onDelete={deleteReference} onEdit={editReference} />
                    </div>
                </div>
            </div>
        </PageBase>
    )
}