import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";
import { ConfirmDialog } from 'primereact/confirmdialog';

interface TypeDisparador {
    id: number;
    name: string;
}
function NewRule() {
    const [disparadorId, setDisparadorId] = useState<number | null>(null);
    const [steps, setSteps] = useState<number>(1)
    const [valuePais, setValuePais] = useState<string>('')
    const [valuePlan, setValuePlan] = useState<string>('')
    const [valueMonto, setValueMonto] = useState<string>('')
    const [valueMoneda, setValueMoneda] = useState<string>('')
    const [valueHoras, setValueHoras] = useState<string>('')
    const [valuePrioridad, setValuePrioridad] = useState<string>('')

    const [valueDestinario, setValueDestinario] = useState<string>('')
    const [valueAsunto, setValueAsunto] = useState<string>('')
    const [valueCuerpo, setValueCuerpo] = useState<string>('')

    const [valuePhone, setValuePhone] = useState<string>('')
    const [valueMensaje, setValueMensaje] = useState<string>('')

    const [valueUrl, setValueUrl] = useState<string>('')

    const [visible, setVisible] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectTypeMethod, setSelectedTypeMethod] = useState(null);

    const disparadores: TypeDisparador[] = [
        { id: 1, name: 'Cliente creado' },
        { id: 2, name: 'Pago recibido' },
        { id: 3, name: 'Ticket sin respuesta' }
    ]
    const typeText = [
        { name: 'es igual a', code: 'igual' },
        { name: 'contiene', code: 'contiene' },
    ];

    const typeMethod = [
        { name: 'POST', code: 'post' },
        { name: 'PUT', code: 'put' },
    ]
    const [opcionesDisparador, setOpcionesDisparador] = useState<string[]>([]);

    const onOpcionesDisparador = (e) => {
        let _opciones = [...opcionesDisparador];

        if (e.checked)
            _opciones.push(e.value);
        else
            _opciones.splice(_opciones.indexOf(e.value), 1);

        setOpcionesDisparador(_opciones);
    }

    const [opcionesAcciones, setOpcionesAcciones] = useState<string[]>([]);

    const onOpcionesAcciones = (e) => {
        let _opciones = [...opcionesAcciones];

        if (e.checked)
            _opciones.push(e.value);
        else
            _opciones.splice(_opciones.indexOf(e.value), 1);

        setOpcionesAcciones(_opciones);
    }

    function save() {
        const body = {
            disparadorId,
            condiciones: [],
            acciones: []
        }
        if (opcionesDisparador.includes('pais')) body.condiciones.push({ 'label': 'pais', 'value': valuePais, 'operador': selectedOption1?.code })
        if (opcionesDisparador.includes('plan')) body.condiciones.push({ 'label': 'plan', 'value': valuePlan, 'operador': selectedOption2?.code })
        if (opcionesDisparador.includes('monto')) body.condiciones.push({ 'label': 'monto', 'value': valueMonto, 'operador': selectedOption1?.code })
        if (opcionesDisparador.includes('moneda')) body.condiciones.push({ 'label': 'moneda', 'value': valueMoneda, 'operador': selectedOption2?.code })
        if (opcionesDisparador.includes('horas_sin_respuesta')) body.condiciones.push({ 'label': 'horas_sin_respuesta', 'value': valueHoras, 'operador': selectedOption1?.code })
        if (opcionesDisparador.includes('prioridad')) body.condiciones.push({ 'label': 'prioridad', 'value': valuePrioridad, 'operador': selectedOption2?.code })

        if (opcionesAcciones.includes('email')) {
            body.acciones.push({
                'email': [
                    { 'label': 'destinario', 'value': valueDestinario },
                    { 'label': 'asunto', 'value': valueAsunto },
                    { 'label': 'cuerpo', 'value': valueCuerpo },
                ]
            })
        }
        if (opcionesAcciones.includes('sms')) {
            body.acciones.push({
                'sms': [
                    { 'label': 'phone', 'value': valuePhone },
                    { 'label': 'mensaje', 'value': valueMensaje },
                ]
            })
        }
        if (opcionesAcciones.includes('webhook')) {
            body.acciones.push({
                'webhook': [
                    { 'label': 'url', 'value': valueUrl },
                    { 'label': 'metodo', 'value': selectTypeMethod?.code },
                ]
            })
        }
        console.log(body)
    }

    const accept = () => {
        console.log('regresamos')
    }

    const reject = () => {
        console.log('nos mantenemos')
    }

    function goBack() {
        if (disparadorId) {
            setVisible(true)
        }
    }
    return (
        <div className='flex flex-column align-items-center pt-6'>
            <ConfirmDialog group="declarative" visible={visible} onHide={() => setVisible(false)} message="Quieres salir sin guardar?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            <div className='flex justify-content-between w-full'>
                <Button label="Regresar" onClick={goBack} />
                <div className='flex justify-content-end w-full gap-3'>

                    <Button label="Atras" onClick={() => setSteps(steps - 1)} disabled={steps <= 1} />
                    <Button label="Siguiente" onClick={() => setSteps(steps + 1)} disabled={steps >= 3} />
                    <Button label="Guardar" onClick={save} disabled={steps !== 3} />

                </div>
            </div>
            <span>Paso {steps}</span>
            {
                steps === 1 && (
                    <div className="flex w-full flex-column w-full">
                        <span>Selecciona un disparador</span>
                        <div className="flex w-full gap-3">
                            {
                                disparadores.map((d) => (
                                    <div className="flex w-full cursor-pointer" style={{ background: '#207cf4' }} onClick={() => { setDisparadorId(d.id); setOpcionesDisparador([]) }} >{d.name}</div>
                                ))
                            }
                        </div>
                    </div>
                )
            }

            {
                steps === 2 && (
                    <>
                        <div className="flex w-full flex-column w-full">
                            <span>Selecciona una o varias condiciones para {disparadorId ? disparadores.find(d => d.id === disparadorId).name : ''}</span>
                            {
                                disparadorId === 1 && (
                                    <>
                                        <div className="flex w-full gap-3">
                                            <div className="flex align-items-center gap-3">
                                                <Checkbox inputId="condicion1" name="condicion1" value="pais" onChange={onOpcionesDisparador} checked={opcionesDisparador.includes('pais')} />
                                                <label htmlFor="condicion1" className="ml-2">Pais</label>
                                                <Dropdown value={selectedOption1} onChange={(e) => setSelectedOption1(e.value)} options={typeText} optionLabel="name"
                                                    placeholder="Selecciona operador" className="w-full md:w-14rem" />
                                                <div className="flex flex-column gap-2">
                                                    <InputText value={valuePais} id="condicionpais" aria-describedby="condicionpais-help" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValuePais(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-3">
                                            <div className="flex align-items-center gap-3">
                                                <Checkbox inputId="condicion2" name="condicion2" value="plan" onChange={onOpcionesDisparador} checked={opcionesDisparador.includes('plan')} />
                                                <label htmlFor="condicion2" className="ml-2">Plan</label>
                                                <Dropdown value={selectedOption2} onChange={(e) => setSelectedOption2(e.value)} options={typeText} optionLabel="name"
                                                    placeholder="Selecciona operador" className="w-full md:w-14rem" />
                                                <div className="flex flex-column gap-2">
                                                    <InputText value={valuePlan} id="condicionplan" aria-describedby="condicionplan-help" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValuePlan(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            {
                                disparadorId === 2 && (
                                    <>
                                        <div className="flex w-full gap-3">
                                            <div className="flex align-items-center gap-3">
                                                <Checkbox inputId="condicion1" name="condicion1" value="monto" onChange={onOpcionesDisparador} checked={opcionesDisparador.includes('monto')} />
                                                <label htmlFor="condicion1" className="ml-2">Monto</label>
                                                <Dropdown value={selectedOption1} onChange={(e) => setSelectedOption1(e.value)} options={typeText} optionLabel="name"
                                                    placeholder="Selecciona operador" className="w-full md:w-14rem" />
                                                <div className="flex flex-column gap-2">
                                                    <InputText value={valueMonto} id="condicionpais" aria-describedby="condicionpais-help" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValueMonto(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-3">
                                            <div className="flex align-items-center gap-3">
                                                <Checkbox inputId="condicion2" name="condicion2" value="moneda" onChange={onOpcionesDisparador} checked={opcionesDisparador.includes('moneda')} />
                                                <label htmlFor="condicion2" className="ml-2">Moneda</label>
                                                <Dropdown value={selectedOption2} onChange={(e) => setSelectedOption2(e.value)} options={typeText} optionLabel="name"
                                                    placeholder="Selecciona operador" className="w-full md:w-14rem" />
                                                <div className="flex flex-column gap-2">
                                                    <InputText value={valueMoneda} id="condicionplan" aria-describedby="condicionplan-help" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValueMoneda(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            {
                                disparadorId === 3 && (
                                    <>
                                        <div className="flex w-full gap-3">
                                            <div className="flex align-items-center gap-3">
                                                <Checkbox inputId="condicion1" name="condicion1" value="horas_sin_respuesta" onChange={onOpcionesDisparador} checked={opcionesDisparador.includes('horas_sin_respuesta')} />
                                                <label htmlFor="condicion1" className="ml-2">Horas sin respuesta</label>
                                                <Dropdown value={selectedOption1} onChange={(e) => setSelectedOption1(e.value)} options={typeText} optionLabel="name"
                                                    placeholder="Selecciona operador" className="w-full md:w-14rem" />
                                                <div className="flex flex-column gap-2">
                                                    <InputText value={valueHoras} id="condicionpais" aria-describedby="condicionpais-help" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValueHoras(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-3">
                                            <div className="flex align-items-center gap-3">
                                                <Checkbox inputId="condicion2" name="condicion2" value="prioridad" onChange={onOpcionesDisparador} checked={opcionesDisparador.includes('prioridad')} />
                                                <label htmlFor="condicion2" className="ml-2">Prioridad</label>
                                                <Dropdown value={selectedOption2} onChange={(e) => setSelectedOption2(e.value)} options={typeText} optionLabel="name"
                                                    placeholder="Selecciona operador" className="w-full md:w-14rem" />
                                                <div className="flex flex-column gap-2">
                                                    <InputText value={valuePrioridad} id="condicionplan" aria-describedby="condicionplan-help" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValuePrioridad(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    </>
                )
            }
            {
                steps === 3 && (
                    <>
                        <div className="flex w-full flex-column w-full">
                            <span>Acciones</span>
                            <div className="flex w-full gap-3 flex-column">
                                <div className="flex w-full gap-3 flex-column">
                                    <div className="flex gap-3">
                                        <Checkbox inputId="condicion1" name="condicion1" value="email" onChange={onOpcionesAcciones} checked={opcionesAcciones.includes('email')} />
                                        <label htmlFor="condicion1" className="ml-2">Email</label>
                                    </div>
                                    <div className="flex align-items-center gap-3">


                                        <label htmlFor="condicion2" className="ml-2">destinario</label>
                                        <div className="flex flex-column gap-2">
                                            <InputText value={valueDestinario} id="condicionplan" aria-describedby="condicionplan-help" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValueDestinario(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="flex align-items-center gap-3">
                                        <label htmlFor="condicion2" className="ml-2">asunto</label>
                                        <div className="flex flex-column gap-2">
                                            <InputText value={valueAsunto} id="condicionplan" aria-describedby="condicionplan-help" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValueAsunto(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="flex align-items-center gap-3">
                                        <label htmlFor="condicion2" className="ml-2">cuerpo</label>
                                        <div className="flex flex-column gap-2">
                                            <InputText value={valueCuerpo} id="condicionplan" aria-describedby="condicionplan-help" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValueCuerpo(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full gap-3 flex-column">
                                    <div className="flex gap-3">

                                        <Checkbox inputId="condicion1" name="condicion1" value="sms" onChange={onOpcionesAcciones} checked={opcionesAcciones.includes('sms')} />
                                        <label htmlFor="condicion1" className="ml-2">SMS</label>
                                    </div>
                                    <div className="flex align-items-center gap-3">
                                        <label htmlFor="phone" className="font-bold block mb-2">Número telefónico</label>
                                        <InputMask value={valuePhone} id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" onChange={(e) => setValuePhone(e.target.value)}></InputMask>
                                    </div>
                                    <div className="flex align-items-center gap-3">
                                        <label htmlFor="condicion2" className="ml-2">Mensaje</label>
                                        <div className="flex flex-column gap-2">
                                            <InputTextarea value={valueMensaje} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValueMensaje(e.target.value)} rows={5} cols={30} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full gap-3 flex-column">
                                    <div className="flex gap-3">
                                        <Checkbox inputId="condicion1" name="condicion1" value="webhook" onChange={onOpcionesAcciones} checked={opcionesAcciones.includes('webhook')} />
                                        <label htmlFor="condicion1" className="ml-2">Webhook</label>
                                    </div>
                                    <div className="flex align-items-center gap-3">
                                        <label htmlFor="condicion2" className="ml-2">URL</label>
                                        <div className="flex flex-column gap-2">
                                            <InputText value={valueUrl} id="condicionplan" aria-describedby="condicionplan-help" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValueUrl(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="flex align-items-center gap-3">
                                        <label htmlFor="condicion2" className="ml-2">método</label>
                                        <div className="flex flex-column gap-2">
                                            <Dropdown value={selectTypeMethod} onChange={(e) => setSelectedTypeMethod(e.value)} options={typeMethod} optionLabel="name"
                                                placeholder="Selecciona una accion" className="w-full md:w-14rem" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default NewRule;
