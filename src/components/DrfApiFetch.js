import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DrfApiFetch = () => {

  const [tasks, setTasks] = useState([])
  useEffect(() => {
    // APIのエンドポイントURLを記載
    axios.get('http://127.0.0.1:8000/api/tasks/',{
      // トークンを使用する必要がある
      headers: {
        'Authorization': 'Token f55babbc7a340c945a1412001f284586e4454ad1'
      }
    })
    // 取得したデータをsetTasksでtasksへ格納
    .then(res => {setTasks(res.data)})
    // 立ち上がった時のみに実行するため[]で一回のみの指定
  },[])

  return (
    <div>
      <ul>
        {
          tasks.map(task => <li key={task.id}>{task.title}  {task.id}</li>)
        }
      </ul>
    </div>
  )
}

export default DrfApiFetch
