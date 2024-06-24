import { FC, useEffect, useRef, useState, useMemo } from "react"
import { Tag } from "../../shared/interfaces/Tag"
import "./Tags.css"

export const Tags:FC<{tags: Tag[]}> = ({tags}) => {
    console.log('render')
    const [visible, setVisible] = useState(false)
    const [flag, setFlag] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const [rect,setRect] = useState<DOMRect | null>(null)

    let selectedTags = useMemo(() => tags.map(el => el.id), [])
    console.log(selectedTags)

    const toggleTagSelection = (id: number) => {
        console.log('toggle ', selectedTags.includes(id))
        if (!selectedTags.includes(id)) {
            console.log("INCLUDES")
            selectedTags.push(id)
        }
        else {
            console.log("NOT")
            selectedTags.splice(selectedTags.indexOf(id), 1)
        }
        console.log("flag ", selectedTags)
        setFlag(!flag)
    }

    useEffect(() => {
        console.log("Effect")
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
                        {tags.map((el) => (
                            <li className="tags-list__item" key={el.id}>
                                <button onClick={(event) => {
                                    toggleTagSelection(el.id)
                                }} className={`tags-list__item__button tag ${selectedTags.includes(el.id) ? 'tag_selected' : ''}`}>
                                    {
                                        el.title
                                    }
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="tags-container__buttons">
                        <button type="submit">Save</button>
                        <button onClick={(event) => setVisible(false)}>Close</button>
                    </div>
                </div>}
            <div className="tags-list">
                {tags.map(el => <p className="tag tag_selected">{el.title}</p>)}
                <button onClick={() => setVisible(!visible)} className="tag">more</button>
            </div>
        </div>
    )
}