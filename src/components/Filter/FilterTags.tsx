import { ITag } from 'interface';
import React from 'react';
import { useSelector } from 'react-redux';
import { clst } from 'utils'
import style from './style.module.css'

interface FilterTagsProps {
    onChange?: (e: string) => void, value?: string,
    title?: string
}

export function FilterTags(props: FilterTagsProps) {
    const { onChange, value, title } = props;
    const tagsArr = value?.split('|').filter(Boolean) ?? []
    const { tags } = useSelector((state: any) => state.HOME)
    const onChangeTag = (tag_name: string) => {
        if (tagsArr.includes(tag_name)) {
            const newArr = tagsArr.filter((i: string) => i !== tag_name)
            if (onChange) onChange(newArr.join('|'))
        } else {
            const newArr = [...tagsArr, tag_name]
            if (onChange) onChange(newArr.join('|'))
        }
    }

    return (
        <div className={style.container}>
            <span className={style.filter_title}>
                {title ?? 'Danh mục'}
            </span>
            <ul className={style.tags_list}>
                {
                    tags?.map((item: ITag, index: number) => {
                        const actItem = tagsArr.includes(item.name)
                        return (
                            <li
                                onClick={() => onChangeTag(item.name)}
                                key={index}
                                className={
                                    actItem ?
                                        clst([style.tag_item_cnt, style.tag_item_cnt_act])
                                        :
                                        style.tag_item_cnt
                                }
                            >
                                <div className={style.tag_check}>
                                    {actItem && <span></span>}
                                </div>
                                <span className={
                                    actItem ?
                                        clst([style.tag_name, style.tag_name_act])
                                        :
                                        style.tag_name
                                }>{item.name}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}