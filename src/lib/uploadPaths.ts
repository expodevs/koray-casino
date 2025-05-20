
export function attachmentPath(id:number, entity: string) {
    return `uploads/attachment/${entity}/${id}`;
}

export function attachmentToUrl({entity_id, entity, group}: {entity_id: number, entity: string, group?: string}) {
    const apiAttachUrl = '/api/admin/attachment'
    if (group) {
        return `${apiAttachUrl}/${entity}/${entity_id}/${group}`;
    }
    return `${apiAttachUrl}/${entity}/${entity_id}`;
}

export function settingParams(id: number) {
    return {
        entity_id: id,
        entity: 'setting',
        group: 'default',
    }
}

export function settingPath(id:number) {
    return `uploads/setting/${id}`;
}

export function iconCardImagePath(id:number) {
    return `uploads/icon-card-image/${id}`;
}

export function optionPath(id:number) {
    return `uploads/option/${id}`;
}

export function casinoPath(id:number) {
    return `uploads/casino/${id}`;
}

export function cardImagePath(id:number) {
    return `uploads/card-image/${id}`;
}
