import axios from 'axios'
// 객체가 export 된다
export default {
  // POST http://localhost:8080/todos
  // BODY {name, userId...}
  // HEADER content-type:application-json
  post: (todo) => axios.post(`${process.env.VUE_APP_API_BASE}/todos`, todo), 

  // GET http://localhost:8080/todos
  list: () => axios.get(`${process.env.VUE_APP_BOARD_API_BASE}/helloDate`), 

  // PATCH http://localhost:8080/todos/{id}/done
  doneList: (id) => axios.patch(`${process.env.VUE_APP_API_BASE}/todos/${id}/done`),

  // DELETE http://localhost:8080/feeds/{id}
  del: (id) => axios.delete(`${process.env.VUE_APP_API_BASE}/todos/${id}`)
}



/*
export default {  
  post: (todo) => 
  // POST http://localhost:8080/feeds
  // BODY {name, userId...}
  // HEADER content-type:application-json  
    axios.post(`${process.env.VUE_APP_API_BASE}/todos`, todo),
  // import 될때 { } 안의 내용이 import 됨


  // 파일 업로드 api
 // uploadFile: (feedId, form) => 
          // POST http://localhost:8080/feeds/{id}/feed-files
          // BODY multipart-data ---- ssasdds----
          // HEADER multipart/form-data
 //   axios.post(`${process.env.VUE_APP_API_BASE}/feeds/${feedId}/feed-files`, 
 //               form, 
 //               {headers: {'content-type':'multipart/form-data'}}),

  // GET 목록조회 http://localhost:8080/todos
  list: () => axios.get(`${process.env.VUE_APP_API_BASE}/todos`),

  // DELETE http://localhost:8080/feeds/{id}
 // del: (id) => axios.delete(`${process.env.VUE_APP_API_BASE}/feeds/${id}`),

 


 // POST 추가 (memo = "내용", isDone = false)
  //  PATCH 수정 (isDone = true)
  //  DELETE 삭제 (hard-delete)
}
*/