import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoInput from './TodoInput'

import './scss/TodoTemplate.scss';

const TodoTemplate = () => {


  // 서버에 할일 목록(json)을 요청해서 받아와야 함
  const API_BASE_URL = "http://localhost:8181/api/todos";

  // todos 배열을 상태관리
  const [todos, setTodos] = useState([]);

  // id값 시퀀스 생성 함수
  // 데이터가 하나라도 있다는 가정 하에 사용 가능 (lnegth 때문)하기 때문에 if 필수
  const makeNewId = () => {
    if (todos.length)
    return todos[todos.length - 1].id + 1;
  }

  // 하위  컴포넌트 todoInput 에게 todoText 를 받아오는 콜백 함수
  const addTodo = todoText => {
    // console.log('할일 정보: ', todoText);

    const newTodo = {
      title: todoText
    };

    // todos.push(newTodo);

    // 리액트의 상태변수는 무조건 setter 를 통해서만
    // 상태값을 변경해야 렌더링에 적용된다.
    // 다만 상태변수가 불변성(immutable)을 가지기 때문에
    // 기존의 상태에서 변경이 불가능하고, 새로운 상태를 만들어서 변경해야 한다. (새로운 배열로 교체하는 개념)
    // why? newTodo 가 객체이기 때문에 [] 안에 넣어서 배열로 만들어준뒤, todos 와 합친다.

    fetch(API_BASE_URL, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(json => {
      setTodos(json.todos);
    });

  };

  // 할 일 삭제 처리 함수 (TodoItem 에게 내려주기)
  const removeTodo = id => {
    // console.log(`삭제대상 id: ${id}`);
    // 삭제 대상 id와 id가 동일한 index를 제외한 todo 배열로 set
    setTodos(todos.filter(todo => todo.id !== id));

    fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(json => {
      setTodos(json.todos);
    });
  };

  // 할 일 체크 처리 함수 (TodoItem 에게 내려주기)
  // TodoItem 에서 체크를 하는 순간 실행됨
  const checkTodo = (id, done) => {
    // console.log(`체크한 Todo id: ${id}`);
    // const copyTodos = [...todos];
    // for (const cTodo of copyTodos) {
    //   if (cTodo.id === id) {
    //     cTodo.done = !cTodo.done;
    //   }
    // }
    // setTodos(copyTodos);

    fetch(API_BASE_URL, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        done: !done,
        id: id
      })
    })
    .then(res => res.json())
    .then(json => {
      setTodos(json.todos);
    });

    setTodos(todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo));
  };

  // 남은 할 일 개수 변경 함수
  // 체크가 안 된 할 일의 개수 카운트하기
  const countRestTodo = () => todos.filter(todo => !todo.done).length;

  // 화면이 랜더링 된 다음 자동 실행
  // todos 상태 변수에 상태 변화가 감지될 때 {} 실행
  useEffect(() => {
    fetch(API_BASE_URL)
      .then(res => res.json())
      .then(json => {
        console.log(json.todos);

        setTodos(json.todos);
      });
  }, []);

  return (
    <div className='TodoTemplate'>
      <TodoHeader count={countRestTodo} />
      <TodoMain todoList={todos} remove={removeTodo} check={checkTodo}/>
      <TodoInput addTodo={addTodo} />
    </div>
  )
}

export default TodoTemplate