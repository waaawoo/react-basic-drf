import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DrfApiFetch = () => {

  const [tasks, setTasks] = useState([])
  // １つの情報を取得する
  const [selectedTask, setSelectedTask] = useState([])
  // IDを格納する
  const [id, setId] = useState(1)
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

  // クリック時に動く関数を作成する
  const getTask = () => {
    // APIのエンドポイントURLを記載 末尾にIDを指定する
    axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`,{
      // トークンを使用する必要がある
      headers: {
        'Authorization': 'Token f55babbc7a340c945a1412001f284586e4454ad1'
      }})
      .then(res => {setSelectedTask(res.data)
    })
  }


  return (
    <div>
      <ul>
        {
          tasks.map(task => <li key={task.id}>{task.title}  {task.id}</li>)
        }
      </ul>

      {/* 検索用フォーム */}
      <input type="text" value={id} onChange={evt => {setId(evt.target.value)}} />
      <br/>
      <button type="button" onClick={()=>getTask()}>Get task</button>
      <h3>{selectedTask.id}: {selectedTask.title}</h3>
    </div>
  )
}

export default DrfApiFetch
