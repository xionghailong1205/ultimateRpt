import { useEffect, useState } from 'react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import TriangleRight from '@/Icon/triangleRight'
import TriangleDown from '@/Icon/triangleDown'
import { ExaminationInfo } from '@/api/ExaminationManagement'
import { DiseaseInfo, DiseaseManagement } from '@/api/DiseaseManagement'
import { useModuleManagementService } from '@/service/ModuleManagementService'
import clsx from 'clsx'
import { cn } from '@/lib/utils'
import { handleAuthenticationFailure } from '@/api/utils/handleAuthenticationFailure'
import { DivProp } from '@/View/type'

// 这个组件不能进行复用
const CollapsibleExaminationItem = (examinationInfo: ExaminationInfo) => {
    const {
        itemName,
        id: itemId,
        itemCode
    } = examinationInfo

    const [isOpen, setIsOpen] = useState(false)

    const [diseaseList, setDiseaseList] = useState<Array<DiseaseInfo>>([])

    // 获取体检项目下疾病的列表
    useEffect(() => {
        const fetchDiseaseList = async () => {
            const requestRst = await DiseaseManagement.getDiseaseListOfExamination(itemCode)

            const responseCode = requestRst.code

            handleAuthenticationFailure(responseCode)

            if (responseCode === 200) {
                setDiseaseList(requestRst.data)
                return
            }

            alert(`${responseCode} : 请排查问题!`)
        }

        fetchDiseaseList()
    }, [])

    const {
        viewExaminationItemInfo,
        viewDiseaseInfo
    } = useModuleManagementService()

    // 判断是否被选中
    const { selectedItemId } = useModuleManagementService()
    const isItemSelected = selectedItemId === itemId

    const itemSelectedStyle = clsx({
        'text-[--theme-fore-color]': isItemSelected,
    })

    // 判断体检项目下是否有疾病
    const hasRelatedDiseases = diseaseList.length > 0
    const visibility = clsx({
        'hidden': !hasRelatedDiseases
    })

    return (
        <Collapsible
            open={isOpen}
            className="w-[full]"
        >
            <div>
                <CollapsibleTrigger asChild>
                    <div
                        className={cn("py-2 px-1 text-[12px] cursor-pointer flex items-center gap-1", itemSelectedStyle)}
                    >
                        <div
                            className='w-4 h-4'
                            onClick={() => {
                                setIsOpen((open) => !open)
                            }}
                        >
                            <div
                                className={visibility}
                            >
                                {
                                    isOpen ? (
                                        <TriangleDown />
                                    ) : (
                                        <TriangleRight />
                                    )
                                }
                            </div>
                        </div>
                        <div
                            className={'select-none'}
                            onClick={() => {
                                viewExaminationItemInfo(itemId)
                            }}
                        >
                            {itemName}
                        </div>
                    </div>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
                {
                    diseaseList.map(diseaseInfo => {
                        const {
                            selectedDiseaseCode
                        } = useModuleManagementService()

                        const isItemSelected = selectedDiseaseCode === diseaseInfo.diseaseCode

                        const diseaseSelectedStyle = clsx({
                            'text-[--theme-fore-color]': isItemSelected,
                        })

                        return (
                            <DiseaseBox
                                DiseaseName={diseaseInfo.name}
                                onClick={() => {
                                    viewDiseaseInfo(diseaseInfo.diseaseCode)
                                }}
                                className={diseaseSelectedStyle}
                            />
                        )
                    })
                }
            </CollapsibleContent>
        </Collapsible>
    )
}



interface DiseaseBoxProp extends DivProp {
    DiseaseName: string
}

const DiseaseBox = ({
    DiseaseName,
    ...prop
}: DiseaseBoxProp) => {
    return (
        <div
            {...prop}
            className={cn('px-6 select-none cursor-pointer', prop.className)}
        >
            {DiseaseName}
        </div>
    )
}

export default CollapsibleExaminationItem