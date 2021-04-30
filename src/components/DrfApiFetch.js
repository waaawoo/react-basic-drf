import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DrfApiFetch = () => {

  const [tasks, setTasks] = useState([])
  // １つの情報を取得する
  const [selectedTask, setSelectedTask] = useState([])
  // 編集用のタスク管理ステート オブジェクト形式で管理する
  const[editedTask, setEditedTask] = useState({id:'', title: ''})
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

  // 検索用関数
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

  // 削除用関数
  const deleteTask = (id) => {
    // APIのエンドポイントURLを記載 末尾にIDを指定する
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`,{
      // トークンを使用する必要がある
      headers: {
        'Authorization': 'Token f55babbc7a340c945a1412001f284586e4454ad1'
      }})
      // ログを出力
      // 削除処理後に再描画させる ; setSelectedTaskの初期化
      .then(res => {setTasks(tasks.filter(task => task.id !== id)); setSelectedTask([])})
  }

  const newTask = (task) => {

    // post送信で渡すためのdataの形式を作成
    const data = {
      title: task.title,
    }
    // DATAを受け取るために第二引数へdataを宣言
    axios.post(`http://127.0.0.1:8000/api/tasks/`, data,{
      // トークンを使用する必要がある
      headers: {
        // DBへ値を渡す場合は以下を記述
        'Content-Type': 'application/json',
        'Authorization': 'Token f55babbc7a340c945a1412001f284586e4454ad1'
      }})
      // 追加した後に画面の表示に反映させるため、配列を分解して追加する
      .then(res => setTasks([...tasks, res.data])
    )
  }

  const handleInputChange = () => evt => {
    const value= evt.target.value;
    const name = evt.target.name;
    setEditedTask({...editedTask, [name]:value})
  }


  return (
    <div>
      <ul>
        {
          tasks.map(task =>
          // リスト表示
          <li key={task.id}>{task.title}  {task.id}
            {/* 削除用ボタン */}
            <button onClick={()=>deleteTask(task.id)}>
              {/* ゴミ箱アイコン */}
              <i className="fas fa-trash-alt"/>
            </button>
          </li>)
        }
      </ul>

      {/* 検索用フォーム */}
      <input type="text" value={id} onChange={evt => {setId(evt.target.value)}} />
      <br/>
      <button type="button" onClick={()=>getTask()}>Get task</button>
      <h3>{selectedTask.id}: {selectedTask.title}</h3>

      {/* 新規作成フォーム */}
      <input type="text" name="title"
        value={editedTask.title}
        onChange={handleInputChange()}
        placeholder="New Task?"
        required
      />
      <button onClick={()=>newTask(editedTask)}>作成</button>
    </div>
  )
}

export default DrfApiFetch
