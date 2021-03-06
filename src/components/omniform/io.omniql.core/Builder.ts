import { AdminService } from '../../../api/api';
import { action, observable, computed, ObservableMap } from 'mobx';
import { observer } from 'mobx-react';
import String from "./String";
import Boolean from "./Boolean";
import Integer from "./Integer";
import Enum from "./Enum";
import StringVector from "./StringVector";
import {
    CoreTypes,
    FieldInline,
    FormField,
    HashMap,
    Inline,
    IRenderer,
    IRendererProps,
    ITableProps,
    IUnionProps,
    OmniDescription,
    OmniField,
    OmniSchema,
    OmniSchemaID,
    OmniSchemaMeta,
    OmniSchemaSpec,
    SchemaKey,
    SchemaValue,
    View,
    ViewTypes,
    OmniFormID,
    OmniFormTypes
} from '../base';
import widgetStore from "../stores/widget-store"
import schemaStore from "../stores/omni-schemas"

/*
 Builder, creates a omiform from a omnischema
 */



export class TableView implements View {
    id: OmniFormID
    name: string
    @observable opened: boolean
    @computed get valid(): boolean {
        return true
    }

    renderer: React.StatelessComponent<ITableProps>;
    props: ITableProps


    constructor(id: OmniFormID) {
        this.id = id
        this.opened = true
    }
}

export class UnionView implements View {
    renderer: React.StatelessComponent<IUnionProps>;
    props: IUnionProps
    name: string
    id: OmniFormID
    field?: FormField<OmniFormID>
    nField?:  FormField<number>
    @observable opened: boolean
    @computed get valid(): boolean {
        return true
    }
    @computed get selectedTable(): OmniFormID {
        return
    }
    constructor(id: OmniFormID) {
        this.id = id
        this.opened = true

    }
}

function toHuman(cc: string): string {
    return cc.replace(/([a-z](?=[A-Z]))/g, '$1 ')
}

export class OmniForm {
    id: OmniFormID
    @observable currentView: OmniFormID

    @action setView(id: OmniFormID) {
        this.currentView = id
    }

    //reset all the field to the initial value
    clear() {

    }

    getValue(path: string[], input: AdminService): any {
        let obj: any = input
        path.forEach((p: string, index: number) => {
            if (p.startsWith("Union/")) {
                return
            }
            obj = obj[p]
        })
        return obj
    }
    setValue(path: string[], input: AdminService) {
        let obj: any = input
        path.forEach((p: string, index: number) => {
            //console.log(p.startsWith("Union/"), "&&&&&&&32323&")
            if (p.startsWith("Union/")) {
                return
            }
            if (index = path.length - 1) {
                obj[p]
            }
        })
    }

    //put the values returned by the backend in 0the service
    load(input: AdminService, store: OmniFormStore) {
        let values = Array.from(store.objects.values())

        for (let obj of values) {
            if (obj.id.isField()) {
                let fieldLine = obj as FieldInline
                //console.log(obj.id.fieldPath(), fieldLine.props)
                let newValue = this.getValue(obj.id.fieldPath(), input)
                if (newValue) {
                    fieldLine.props.field.value = newValue

                }

            }
            continue
        }
        //const schema = schemaStore.get(OmniSchemaID.fromString("io.menshend.v1alpha/Resource/AdminService"))


    }

    //build adminservice objects
    build() {

    }



    constructor(id: OmniFormID) {
        this.id = id
    }

}
export class OmniFormStore {
    objects: HashMap<OmniFormID, { id: OmniFormID }>
    counter: number;
    constructor() {
        this.objects = new HashMap<OmniFormID, { id: OmniFormID }>()
        this.counter = 0
    }
    omn3id() {
        this.counter += 1
        return this.counter
    }

    renderTableFields(fields: OmniField[], parent: OmniSchema, fieldName: string, parentFormId: OmniFormID) {
        //create fields
        //create remain fields
        for (let field of fields) {
            if (field.schema.isContainer()) {
                this.build(schemaStore.get(field.schema), parent, field.name, parentFormId)
            } else {
                //inline
                let fk = new SchemaKey({ realm: 'Inline', schema: field.schema, items: field.items, scope: parent.id, fieldName: field.name })
                let fv = widgetStore.get(fk)
                let fId = new OmniFormID([OmniFormTypes.Field, this.omn3id()], parentFormId)
                fId.name = field.name
                //create field
                let formField = new FormField<any>(fId, fv.initial)
                formField.required = field.required
                formField.help = field.description
                formField.label = toHuman(field.name).toLowerCase()
                formField.name = field.name
                let props = Object.assign(fv.props || {}, { field: formField }) as { required?: boolean }
                //console.log(props, field.name, parent.id.hash())

                if (props.required) {
                    formField.required = props.required
                }
                //create inline 
                let fi: FieldInline = { id: fId, renderer: observer(fv.renderer), props: props, name: field.name, parentSchema: parent }
                this.objects.set(fi.id, fi)
            }
        }
    }


    //TODO: end builder
    //TODO: Create decorator
    build(os: OmniSchema, parent?: OmniSchema, fieldName?: string, parentFormId?: OmniFormID): OmniForm | void {
        if (!os) {
            throw new Error("OmniSchema should not be null");
        }

        if (!os.id.isContainer()) {
            throw new Error("Only Tables, Unions and Resources can be use as schema for create omniforms");
        }
        if (parent) {
            if (!parent.id.isContainer()) {
                throw new Error("Only Tables, Unions and Resources can be use as parent");
            }
        }

        let kv: SchemaKey;
        let sv: SchemaValue;
        switch (os.id.coreType) {
            case CoreTypes.Table:
            case CoreTypes.Resource:
                let omniForm: OmniForm
                let tvId: OmniFormID
                if (!parent) {
                    let oId = new OmniFormID([OmniFormTypes.Form, this.omn3id()])
                    //create form
                    omniForm = new OmniForm(oId)
                    tvId = new OmniFormID([OmniFormTypes.Table, this.omn3id()], oId)
                    omniForm.setView(tvId)
                }
                else {
                    tvId = new OmniFormID([OmniFormTypes.Table, this.omn3id()], parentFormId)
                    tvId.name = fieldName
                }

                kv = new SchemaKey({ realm: "View", schema: os.id, scope: parent ? parent.id : null, fieldName: fieldName })
                sv = widgetStore.get(kv)
                //create table view
                let tv = new TableView(tvId)
                tv.name = fieldName ? toHuman(fieldName) : toHuman(os.spec.meta.name)
                this.objects.set(tv.id, tv)
                tv.renderer = observer(sv.renderer)
                tv.props = Object.assign(tv.props || {}, sv.props || {})
                this.renderTableFields(os.spec.fields, os, fieldName, tvId)
                return omniForm
            case CoreTypes.Union:
                let uId = new OmniFormID([OmniFormTypes.Union, this.omn3id()], parentFormId)
                uId.name = fieldName
                let uv = new UnionView(uId)
                let formField = new FormField<number>(uId, 0)
                uv.props = { ...uv.props, selector: { renderer: observer(Enum), props: { field: formField } } }

                uv.name = toHuman(fieldName)

                this.objects.set(uv.id, uv)

                kv = new SchemaKey({ realm: "View", schema: os.id, scope: parent ? parent.id : null, fieldName: fieldName })
                sv = widgetStore.get(kv)
                uv.renderer = observer(sv.renderer)
                uv.props = Object.assign(uv.props || {}, sv.props || {})
                uv.field = new FormField<any>(uId)
                uv.nField = new FormField<number>(uId,0)
   

                let counter = 0
                for (let tableSchemaID of os.spec.schemas) {

                    let tableSchema = schemaStore.get(tableSchemaID)
                    kv = new SchemaKey({ realm: "View", schema: tableSchema.id, scope: parent ? parent.id : null, fieldName: fieldName })
                    sv = widgetStore.get(kv)
                    let tId = new OmniFormID([OmniFormTypes.Table, this.omn3id()], uId)
                    if (counter==0){
                        uv.field.value = tId
                    }

                    tId.name = "Union/" + fieldName + "/" + counter
                    let tv = new TableView(tId)
                    tv.name = toHuman(tableSchema.spec.meta.name)

                    this.objects.set(tv.id, tv)

                    tv.renderer = sv.renderer
                    tv.props = Object.assign(tv.props || {}, sv.props || {})
                    this.renderTableFields(tableSchema.spec.fields, tableSchema, fieldName, tId)
                    counter += 1

                }
        }
    }

}

export default new OmniFormStore()