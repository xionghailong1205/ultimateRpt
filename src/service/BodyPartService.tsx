import { LeftBodyPartMap, RightBodyPartMap } from "@/map/BodyPartMap"

export interface BodyPartBoxProp {
    keyValue: string,
    label: string
}

export namespace BodyPartService {
    export const getLeftBodyPartList = (): Array<BodyPartBoxProp> => {
        const bodyPartList: Array<BodyPartBoxProp> = []

        for (const [key, value] of LeftBodyPartMap) {
            bodyPartList.push({
                keyValue: key,
                label: value.labelName
            })
        }

        return bodyPartList
    }

    export const getRightBodyPartList = (): Array<BodyPartBoxProp> => {
        const bodyPartList: Array<BodyPartBoxProp> = []

        for (const [key, value] of RightBodyPartMap) {
            bodyPartList.push({
                keyValue: key,
                label: value.labelName
            })
        }

        return bodyPartList
    }
}