import { FC, useEffect, useRef, useState, useMemo } from "react"
import { Tag } from "../../shared/interfaces/Tag"
import "./Tags.css"
import { taskService } from "../../api/services/taskService"
import { Task } from "../../shared/interfaces/Task"
import { baseActions } from "../../store/baseSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { AsyncThunkAction } from "@reduxjs/toolkit"
import { tasksActions } from "../../store/tasksReducer"


export const Tags:FC<{task: Task}> = ({task}) => {
    const [visible, setVisible] = useState(false)
    const [flag, setFlag] = useState(false)
    const allTags = useSelector((state: RootState) => state.base.tags)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!allTags.length)
            dispatch<any>(baseActions.fetchTags())
    })

    const ref = useRef<HTMLDivElement>(null)

    const [rect, setRect] = useState<DOMRect | null>(null)

    let selectedTags = useMemo(() => task.tags ? [...task.tags] : [], [task])

    const toggleTagSelection = (tag: Tag) => {
        console.log(0)
        if (!selectedTags.filter(el => el.id === tag.id).length) {
            console.log(1)
            selectedTags.push(tag)
            setFlag(!flag)
        }
        else {  
                const index = selectedTags.findIndex(el => el.id === tag.id)
                if (index !== -1) {
                    console.log(3)
                    selectedTags.splice(index, 1)
                    setFlag(!flag)
                }
            }
    }

    useEffect(() => {
        let rect: any
        if (ref.current) {
            rect = ref.current.getBoundingClientRect()
            setRect(rect)
        }
    }, [])

    return (
        <div ref={ref} className="tags-container">
            {visible && 
                <div style={{position: "absolute", top:'50px', left: `${rect ? rect.left: 650}px`}} className="tags-list__container">
                    <ul className="tags-list">
                        {allTags && task.tags.map((el) => (
                            <li className="tags-list__item" key={el.id}>
                                <button onClick={(event) => {
                                    toggleTagSelection(el)
                                }} className={`tags-list__item__button tag ${selectedTags.length && selectedTags.filter(item => item.id === el.id).length ? 'tag_selected' : ''}`}>
                                    {
                                        el.title
                                    }
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="tags-container__buttons">
                        <button onClick={() => dispatch<any>(tasksActions.updateTask({id: task.id, updates: {tags: selectedTags}}))}>Save</button>
                        <button onClick={(event) => setVisible(false)}>Close</button>
                    </div>
                </div>}
            <div className="tags-list">
                {task.tags && task.tags.map(el => <p className="tag tag_selected">{el.title}</p>)}
                <button onClick={() => setVisible(!visible)} className="tag">more</button>
            </div>
        </div>
    )
}