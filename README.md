# 作成したAPIを読み込み使用するアプリ

## axiosを使用する

## クイエイト機能

## 更新機能
更新用の関数を作成し
axios.putを使用する
URLにIDを指定する
第二引数にデータを渡す
更新後に情報を書き換える必要がある
.then(res => {setTasks(tasks.map(task => (task.id === editedTask.id ? res.data  : task)));
setEditedTask({id:'',title:''})
})
処理は上記で完了
後フォームを追加して完了
