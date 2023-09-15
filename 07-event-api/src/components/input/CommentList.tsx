import { commentModel } from '@/model'
import classes from './CommentList.module.css'

interface commentListprops {
  items: commentModel[]
}

const CommentList = ({ items }: commentListprops) => {
  return (
    <ul className={classes.comments}>
      {items.map(
        (item) =>
          item._id && (
            <li key={item._id.toString()}>
              <p>{item.text}</p>
              <div>
                By <address>{item.name}</address>
              </div>
            </li>
          )
      )}
    </ul>
  )
}

export default CommentList
