import { LeftBodyPartMap, RightBodyPartMap } from "@/map/BodyPartMap"

export interface BodyPartBoxProp {
    value: string,
    label: string
}

export interface BodyPartImg {
    key: string
    src: string
}

export namespace BodyPartService {
    export const getLeftBodyPartList = (): Array<BodyPartBoxProp> => {
        const bodyPartList: Array<BodyPartBoxProp> = []

        for (const [key, value] of LeftBodyPartMap) {
            bodyPartList.push({
                value: key,
                label: value.labelName
            })
        }

        return bodyPartList
    }

    export const getRightBodyPartList = (): Array<BodyPartBoxProp> => {
        const bodyPartList: Array<BodyPartBoxProp> = []

        for (const [key, value] of RightBodyPartMap) {
            bodyPartList.push({
                value: key,
                label: value.labelName
            })
        }

        return bodyPartList
    }

    export const getBodyPartOptionList = (): Array<BodyPartBoxProp> => {
        return ([
            ...getLeftBodyPartList(),
            ...getRightBodyPartList()
        ])
    }

    export const getBodyPartInfoOfSelectInputValue = (valueOfSelectInput: string) => {
        let result = LeftBodyPartMap.get(valueOfSelectInput)
        if (result) {
            return result
        }
        result = RightBodyPartMap.get(valueOfSelectInput)
        if (result) {
            return result
        }

        return undefined
    }

    export const getBodyImgList = (): Array<BodyPartImg> => {
        const bodyPartImgList: Array<BodyPartImg> = []

        for (const [key, value] of RightBodyPartMap) {
            bodyPartImgList.push({
                key: key,
                src: value.imgName
            })
        }

        for (const [key, value] of LeftBodyPartMap) {
            bodyPartImgList.push({
                key: key,
                src: value.imgName
            })
        }

        return bodyPartImgList
    }
}